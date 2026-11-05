import crypto from "node:crypto";
import { Buffer } from "node:buffer";
import process from "node:process";
import jwt from "jsonwebtoken";

function safeEqual(left, right) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function authenticateAdmin(username, password) {
  const expectedUsername = process.env.ADMIN_USERNAME || "";
  const expectedPassword = process.env.ADMIN_PASSWORD || "";
  return (
    typeof username === "string" &&
    typeof password === "string" &&
    safeEqual(username, expectedUsername) &&
    safeEqual(password, expectedPassword)
  );
}

export function createAdminToken() {
  return jwt.sign(
    { sub: process.env.ADMIN_USERNAME, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "8h", issuer: "ramdev-steel" },
  );
}

export function verifyAdminToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, { issuer: "ramdev-steel" });
}
