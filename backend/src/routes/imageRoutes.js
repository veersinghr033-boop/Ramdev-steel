import { Router } from "express";
import {
  deleteImage,
  getImages,
  uploadImage,
} from "../controllers/imageController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import {
  uploadImageFile,
  validateImageSignature,
} from "../middleware/uploadImage.js";

const router = Router();
router.get("/", requireAdmin, getImages);
router.delete("/", requireAdmin, deleteImage);
router.post(
  "/",
  requireAdmin,
  uploadImageFile.single("image"),
  validateImageSignature,
  uploadImage,
);

export default router;
