import { verifyAdminToken } from "../services/authService.js";
import process from "node:process";

const cookieName = "ramdev_admin";

export function requireAdmin(req, res, next) {
  const token = req.cookies[cookieName];
  if (!token)
    return res.status(401).json({ message: "Admin sign-in required" });
  try {
    req.admin = verifyAdminToken(token);
    return next();
  } catch {
    res.clearCookie(cookieName, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    return res.status(401).json({ message: "Session expired. Sign in again." });
  }
}
