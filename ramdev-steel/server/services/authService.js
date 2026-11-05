import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";

const DEFAULT_JWT_SECRET = "ramdev_steel_secure_jwt_secret_token_key_2026_super_secret";

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function ensureDefaultAdmin() {
  try {
    const existing = await Admin.findOne({ username: "admin" });
    if (!existing) {
      await Admin.create({
        username: "admin",
        password: hashPassword("123"),
      });
      console.log("Created default admin user in MongoDB (username: admin, pass: 123)");
    }
  } catch (err) {
    console.warn("Could not seed default admin in MongoDB:", err.message);
  }
}

export async function authenticateAdmin(username, password) {
  if (typeof username !== "string" || typeof password !== "string") {
    return false;
  }

  // 1. Check MongoDB admin collection
  try {
    const user = await Admin.findOne({ username }).lean();
    if (user) {
      const hashed = hashPassword(password);
      if (user.password === hashed || user.password === password) {
        return true;
      }
    }
  } catch (err) {
    console.warn("Database auth check fallback:", err.message);
  }

  // 2. Allow default credentials (admin / 123) or environment credentials
  const expectedUser = process.env.ADMIN_USERNAME || "admin";
  const expectedPass = process.env.ADMIN_PASSWORD || "123";

  if (username === expectedUser && (password === expectedPass || password === "123")) {
    return true;
  }

  return false;
}

export function createAdminToken(username = "admin") {
  const secret = process.env.JWT_SECRET || DEFAULT_JWT_SECRET;
  return jwt.sign(
    { sub: username, role: "admin" },
    secret,
    { expiresIn: "8h", issuer: "ramdev-steel" }
  );
}

export function verifyAdminToken(token) {
  const secret = process.env.JWT_SECRET || DEFAULT_JWT_SECRET;
  return jwt.verify(token, secret, { issuer: "ramdev-steel" });
}
