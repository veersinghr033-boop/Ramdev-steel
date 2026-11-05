import { Router } from "express";
import rateLimit from "express-rate-limit";
import { getSession, login, logout } from "../controllers/authController.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = Router();
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many sign-in attempts. Try again in 15 minutes." },
});

router.post("/login", loginLimiter, login);
router.get("/session", requireAdmin, getSession);
router.post("/logout", logout);

export default router;
