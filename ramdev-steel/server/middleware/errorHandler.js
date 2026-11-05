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
  if (error.type === "entity.parse.failed") {
    return res
      .status(400)
      .json({ message: "Request body must contain valid JSON" });
  }
  if (error.type === "entity.too.large") {
    return res.status(413).json({ message: "Request body is too large" });
  }
  if (
    Number.isInteger(error.status) &&
    error.status >= 400 &&
    error.status < 500
  ) {
    return res
      .status(error.status)
      .json({ message: error.message || "Invalid request" });
  }
  console.error(error);
  return res.status(500).json({ message: "Server error" });
}
