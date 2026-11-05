import dns from "node:dns";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { migrateLegacyImageReferences } from "../../../ramdev-steel/src/data/cloudinaryAssets.js";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const backendDirectory = path.resolve(scriptDirectory, "../..");
dotenv.config({ path: path.join(backendDirectory, ".env") });
try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch {
  // Keep the system resolver if custom DNS servers cannot be set.
}

const [{ default: cloudinary }, { SiteContent }, { connectDatabase }] =
  await Promise.all([
    import("../config/cloudinary.js"),
    import("../models/SiteContent.js"),
    import("../config/database.js"),
  ]);

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not configured");
if (
  !cloudinary ||
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Cloudinary is not configured");
}

const counts = {
  convertedReferences: 0,
  uploadedGridFsImages: 0,
  unresolvedGridFsImages: [],
  unresolvedAssetPaths: [],
};
const gridFsBucketName = "siteImages";
const uploadedUrlByFilename = new Map();

async function uploadGridFsImage(bucket, filename) {
  if (uploadedUrlByFilename.has(filename)) {
    return uploadedUrlByFilename.get(filename);
  }

  const file = await bucket
    .find({ filename })
    .sort({ uploadDate: -1 })
    .limit(1)
    .next();
  if (!file) {
    counts.unresolvedGridFsImages.push(filename);
    return null;
  }

  const chunks = [];
  for await (const chunk of bucket.openDownloadStream(file._id)) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  const stableId = filename
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z\d_-]/gi, "-");
  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "ramdev-steel/migrated",
        public_id: `legacy-${stableId}`,
        overwrite: true,
        resource_type: "image",
      },
      (error, uploadResult) => {
        if (error) return reject(error);
        resolve(uploadResult);
      },
    );
    stream.end(buffer);
  });

  counts.uploadedGridFsImages += 1;
  uploadedUrlByFilename.set(filename, result.secure_url);
  return result.secure_url;
}

async function migrateValue(value, bucket) {
  if (typeof value === "string") {
    const mappedUrl = migrateLegacyImageReferences(value);
    if (mappedUrl !== value) {
      counts.convertedReferences += 1;
      return mappedUrl;
    }

    if (value.startsWith("/src/assets/")) {
      counts.unresolvedAssetPaths.push(value);
      return value;
    }

    if (value.startsWith("/uploads/")) {
      let filename;
      try {
        filename = decodeURIComponent(value.slice("/uploads/".length));
      } catch {
        counts.unresolvedGridFsImages.push(value);
        return value;
      }
      if (path.basename(filename) !== filename) {
        counts.unresolvedGridFsImages.push(value);
        return value;
      }
      const cloudinaryUrl = await uploadGridFsImage(bucket, filename);
      if (!cloudinaryUrl) return value;
      counts.convertedReferences += 1;
      return cloudinaryUrl;
    }

    return value;
  }

  if (Array.isArray(value)) {
    return Promise.all(value.map((item) => migrateValue(item, bucket)));
  }

  if (value && typeof value === "object") {
    const entries = await Promise.all(
      Object.entries(value).map(async ([key, child]) => [
        key,
        await migrateValue(child, bucket),
      ]),
    );
    return Object.fromEntries(entries);
  }

  return value;
}

function summarizeImageReferences(
  value,
  key = "",
  summary = { cloudinary: 0, uploads: 0, legacyPaths: 0, other: 0 },
) {
  if (
    typeof value === "string" &&
    (key === "image" || key === "heroImage" || key === "aboutImage")
  ) {
    if (value.startsWith("https://res.cloudinary.com/"))
      summary.cloudinary += 1;
    else if (value.startsWith("/uploads/")) summary.uploads += 1;
    else if (value.startsWith("/src/assets/")) summary.legacyPaths += 1;
    else summary.other += 1;
    return summary;
  }

  if (Array.isArray(value)) {
    for (const item of value) summarizeImageReferences(item, "", summary);
  } else if (value && typeof value === "object") {
    for (const [childKey, childValue] of Object.entries(value)) {
      summarizeImageReferences(childValue, childKey, summary);
    }
  }

  return summary;
}

try {
  await connectDatabase(process.env.MONGODB_URI);
  const requestedId = process.argv
    .find((argument) => argument.startsWith("--id="))
    ?.slice("--id=".length);
  const record = await SiteContent.findOne(
    requestedId ? { _id: requestedId } : { key: "site" },
  );
  if (!record) {
    console.log("No site content record found; nothing to migrate.");
  } else {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: gridFsBucketName,
    });
    const originalData = record.data;
    const migratedData = await migrateValue(originalData, bucket);

    if (JSON.stringify(originalData) !== JSON.stringify(migratedData)) {
      record.data = migratedData;
      record.markModified("data");
      await record.save();
    }

    console.log(JSON.stringify(counts, null, 2));
    console.log(
      JSON.stringify({
        updated: JSON.stringify(originalData) !== JSON.stringify(migratedData),
        recordKey: record.key,
        recordId: record._id.toString(),
        imageReferences: summarizeImageReferences(migratedData),
      }),
    );
  }
} finally {
  await mongoose.disconnect();
}
