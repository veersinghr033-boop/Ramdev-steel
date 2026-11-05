import { listUploadedImages } from "../services/imageService.js";

export async function getImages(_req, res, next) {
  try {
    return res.json({ images: await listUploadedImages() });
  } catch (error) {
    return next(error);
  }
}

export function uploadImage(req, res) {
  if (!req.file)
    return res.status(400).json({ message: "Choose an image to upload" });
  return res.status(201).json({
    url: `/uploads/${req.file.filename}`,
    name: req.file.originalname,
    size: req.file.size,
  });
}
