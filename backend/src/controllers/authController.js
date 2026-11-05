import {
  authenticateAdmin,
  createAdminToken,
} from "../services/authService.js";
import process from "node:process";

const cookieName = "ramdev_admin";

function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 8 * 60 * 60 * 1000,
    path: "/",
  };
}

export function login(req, res) {
  const { username, password } = req.body ?? {};
  if (!authenticateAdmin(username, password)) {
    return res.status(401).json({ message: "Incorrect username or password" });
  }
  res.cookie(cookieName, createAdminToken(), getCookieOptions());
  return res.json({ username: process.env.ADMIN_USERNAME });
}

export function getSession(req, res) {
  return res.json({ username: req.admin.sub });
}

export function logout(_req, res) {
  return res.clearCookie(cookieName, getCookieOptions()).sendStatus(204);
}
