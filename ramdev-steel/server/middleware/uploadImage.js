import multer from "multer";

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export const uploadImageFile = multer({
  storage: multer.memoryStorage(),
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

const signaturesByType = {
  "image/jpeg": (bytes) =>
    bytes.length >= 3 &&
    bytes[0] === 0xff &&
    bytes[1] === 0xd8 &&
    bytes[2] === 0xff,
  "image/png": (bytes) =>
    bytes
      .subarray(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
  "image/webp": (bytes) =>
    bytes.toString("ascii", 0, 4) === "RIFF" &&
    bytes.toString("ascii", 8, 12) === "WEBP",
  "image/gif": (bytes) =>
    ["GIF87a", "GIF89a"].includes(bytes.toString("ascii", 0, 6)),
};

export function validateImageSignature(req, res, next) {
  if (!req.file) return next();
  const bytes = req.file.buffer;
  if (signaturesByType[req.file.mimetype]?.(bytes)) return next();

  return res.status(400).json({
    message: "Image file contents do not match the declared image type",
  });
}
