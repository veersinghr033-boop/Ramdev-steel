import crypto from "node:crypto";
import { readFile, readdir, unlink } from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import { ensureUploadsDirectory, uploadsDirectory } from "../config/uploads.js";

const bucketName = "siteImages";
const extensionsByType = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};
const typesByExtension = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

function getImageBucket() {
  if (!mongoose.connection.db) {
    throw new Error("MongoDB is not connected");
  }
  return new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName,
  });
}

async function storeImageBuffer({
  buffer,
  filename,
  contentType,
  originalName,
}) {
  const bucket = getImageBucket();
  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(filename, {
      contentType,
      metadata: { contentType, originalName },
    });
    uploadStream.once("error", reject);
    uploadStream.once("finish", () =>
      resolve({ filename, id: uploadStream.id }),
    );
    uploadStream.end(buffer);
  });
}

export async function saveUploadedImage(file) {
  if (
    cloudinary &&
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  ) {
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "ramdev-steel",
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      stream.end(file.buffer);
    });

    return {
      filename: uploadResult.public_id,
      url: uploadResult.secure_url,
      name: file.originalname,
      size: file.size,
    };
  }

  const extension = extensionsByType[file.mimetype];
  if (!extension) throw new Error("Unsupported image type");
  const filename = `${crypto.randomUUID()}${extension}`;
  const stored = await storeImageBuffer({
    buffer: file.buffer,
    filename,
    contentType: file.mimetype,
    originalName: file.originalname,
  });
  return {
    ...stored,
    url: `/uploads/${encodeURIComponent(filename)}`,
  };
}

export async function findUploadedImage(filename) {
  return getImageBucket()
    .find({ filename })
    .sort({ uploadDate: -1 })
    .limit(1)
    .next();
}

export function openImageDownloadStream(fileId) {
  return getImageBucket().openDownloadStream(fileId);
}

export async function listUploadedImages() {
  const images = [];

  if (
    cloudinary &&
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  ) {
    try {
      const result = await cloudinary.api.resources({
        type: "upload",
        prefix: "ramdev-steel",
        max_results: 100,
      });
      for (const resource of result.resources || []) {
        images.push({
          name: resource.public_id.split("/").pop() || resource.public_id,
          filename: resource.public_id,
          url: resource.secure_url,
          size: resource.bytes,
          updatedAt: resource.created_at,
        });
      }
    } catch (err) {
      console.warn("Could not list images from Cloudinary:", err.message);
    }
  }

  if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
    try {
      const files = await getImageBucket()
        .find({})
        .sort({ uploadDate: -1 })
        .toArray();
      for (const file of files) {
        images.push({
          name: file.metadata?.originalName || file.filename,
          filename: file.filename,
          url: `/uploads/${encodeURIComponent(file.filename)}`,
          size: file.length,
          updatedAt: file.uploadDate,
        });
      }
    } catch {
      // Fallback
    }
  }

  return images;
}

export async function migrateLocalUploadsToMongo() {
  await ensureUploadsDirectory();
  const bucket = getImageBucket();
  const entries = await readdir(uploadsDirectory, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const localPath = path.join(uploadsDirectory, entry.name);
    const existing = await bucket
      .find({ filename: entry.name })
      .limit(1)
      .next();

    if (!existing) {
      const extension = path.extname(entry.name).toLowerCase();
      const buffer = await readFile(localPath);
      await storeImageBuffer({
        buffer,
        filename: entry.name,
        contentType: typesByExtension[extension] || "application/octet-stream",
        originalName: entry.name,
      });
    }

    await unlink(localPath);
    console.log(`Migrated legacy upload to MongoDB: ${entry.name}`);
  }
}
