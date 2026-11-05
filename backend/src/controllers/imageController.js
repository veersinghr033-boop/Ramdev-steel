import {
  deleteUploadedImage,
  findUploadedImage,
  listUploadedImages,
  openImageDownloadStream,
  saveUploadedImage,
} from "../services/imageService.js";

export async function getImages(_req, res, next) {
  try {
    return res.json({ images: await listUploadedImages() });
  } catch (error) {
    return next(error);
  }
}

export async function deleteImage(req, res, next) {
  const filename = req.query.filename;
  if (typeof filename !== "string" || !filename) {
    return res.status(400).json({ message: "An image storage ID is required" });
  }
  try {
    const deleted = await deleteUploadedImage(filename);
    if (!deleted) return res.status(404).json({ message: "Image not found" });
    return res.json({ message: "Image deleted" });
  } catch (error) {
    return next(error);
  }
}

export async function uploadImage(req, res, next) {
  if (!req.file)
    return res.status(400).json({ message: "Choose an image to upload" });
  try {
    const storedImage = await saveUploadedImage(req.file);
    return res.status(201).json({
      url:
        storedImage.url ||
        `/uploads/${encodeURIComponent(storedImage.filename)}`,
      filename: storedImage.filename,
      name: req.file.originalname,
      size: req.file.size,
    });
  } catch (error) {
    return next(error);
  }
}

export async function getUploadedImage(req, res, next) {
  try {
    const image = await findUploadedImage(req.params.filename);
    if (!image) return res.status(404).json({ message: "Image not found" });

    res.setHeader(
      "Content-Type",
      image.metadata?.contentType || "application/octet-stream",
    );
    res.setHeader("Content-Length", image.length);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.setHeader("X-Content-Type-Options", "nosniff");

    const download = openImageDownloadStream(image._id);
    download.on("error", (error) => {
      if (res.headersSent) res.destroy(error);
      else next(error);
    });
    return download.pipe(res);
  } catch (error) {
    return next(error);
  }
}
