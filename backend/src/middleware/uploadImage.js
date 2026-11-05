import crypto from "node:crypto";
import path from "node:path";
import multer from "multer";
import { uploadsDirectory } from "../config/uploads.js";

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export const uploadImageFile = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, callback) => callback(null, uploadsDirectory),
    filename: (_req, file, callback) =>
      callback(
        null,
        `${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`,
      ),
  }),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => {
    const isAllowed = allowedTypes.has(file.mimetype);
    callback(
      isAllowed
        ? null
        : new Error("Only JPG, PNG, WEBP, and GIF images are allowed"),
      isAllowed,
    );
  },
});
