import multer from "multer";

export function errorHandler(error, _req, res, next) {
  if (res.headersSent) return next(error);
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      message:
        error.code === "LIMIT_FILE_SIZE"
          ? "Images must be 5 MB or smaller"
          : error.message,
    });
  }
  if (error.message?.startsWith("Only JPG")) {
    return res.status(400).json({ message: error.message });
  }
  console.error(error);
  return res.status(500).json({ message: "Server error" });
}
