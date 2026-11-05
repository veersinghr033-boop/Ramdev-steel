import { Router } from "express";
import { getContent, putContent } from "../controllers/contentController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();
router.get("/", getContent);
router.put("/", requireAdmin, putContent);

export default router;
