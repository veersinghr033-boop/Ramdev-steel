import { Router } from "express";
import { getImages, uploadImage } from "../controllers/imageController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { uploadImageFile } from "../middleware/uploadImage.js";

const router = Router();
router.get("/", requireAdmin, getImages);
router.post("/", requireAdmin, uploadImageFile.single("image"), uploadImage);

export default router;
