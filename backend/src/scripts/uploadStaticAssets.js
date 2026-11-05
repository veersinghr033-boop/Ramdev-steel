import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(scriptDirectory, "../../.env");
dotenv.config({ path: envPath });
const { default: cloudinary } = await import("../config/cloudinary.js");

const requiredVariables = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];
const missingVariables = requiredVariables.filter((name) => !process.env[name]);

if (missingVariables.length) {
  throw new Error(
    `Missing Cloudinary configuration: ${missingVariables.join(", ")}`,
  );
}
if (!cloudinary) throw new Error("Cloudinary SDK is unavailable");

const assetsDirectory = path.resolve(
  scriptDirectory,
  "../../../ramdev-steel/src/assets",
);
const supportedExtensions = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".webp",
]);

async function collectImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectImages(fullPath)));
    } else if (
      entry.isFile() &&
      supportedExtensions.has(path.extname(entry.name).toLowerCase())
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

function toPublicId(filePath) {
  const source = path.relative(assetsDirectory, filePath).replace(/\\/g, "/");
  const normalized = source
    .replace(/\.[^.]+$/, "")
    .split("/")
    .map((segment) =>
      segment
        .replace(/[^a-z\d_-]+/gi, "-")
        .replace(/^-+|-+$/g, "")
        .toLowerCase(),
    )
    .join("/");

  // Keep the two root logo files distinct even though their basenames match.
  return source === "logo.jpg" ? "logo-jpg" : normalized;
}

const onlySource = process.argv
  .find((argument) => argument.startsWith("--only="))
  ?.slice("--only=".length);
const remoteOnly = process.argv.includes("--remote-only");
const files = remoteOnly
  ? []
  : (await collectImages(assetsDirectory))
      .filter(
        (filePath) =>
          !onlySource ||
          path.relative(assetsDirectory, filePath).replace(/\\/g, "/") ===
            onlySource,
      )
      .sort();

if (!remoteOnly && !files.length) {
  throw new Error(
    onlySource
      ? `No image asset found matching ${onlySource}`
      : `No image assets found in ${assetsDirectory}`,
  );
}

const uploaded = [];
const failed = [];

for (const filePath of files) {
  const source = path.relative(assetsDirectory, filePath).replace(/\\/g, "/");
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "ramdev-steel/site-assets",
      public_id: toPublicId(filePath),
      overwrite: true,
      resource_type: "image",
    });
    uploaded.push({
      source,
      publicId: result.public_id,
      url: result.secure_url,
    });
    console.log(`Uploaded ${source}`);
  } catch (error) {
    failed.push({ source, error: error.message });
    console.error(`Failed ${source}: ${error.message}`);
  }
}

if (remoteOnly) {
  const remoteImages = [
    {
      source: "remote/hero",
      url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2200&q=85",
    },
    {
      source: "remote/about",
      url: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85",
    },
  ];

  for (const image of remoteImages) {
    try {
      const result = await cloudinary.uploader.upload(image.url, {
        folder: "ramdev-steel/site-assets",
        public_id: image.source,
        overwrite: true,
        resource_type: "image",
      });
      uploaded.push({
        source: image.source,
        publicId: result.public_id,
        url: result.secure_url,
      });
      console.log(`Uploaded ${image.source}`);
    } catch (error) {
      failed.push({ source: image.source, error: error.message });
      console.error(`Failed ${image.source}: ${error.message}`);
    }
  }
}

console.log(JSON.stringify({ uploaded, failed }, null, 2));
if (failed.length) process.exitCode = 1;
