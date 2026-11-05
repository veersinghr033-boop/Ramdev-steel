import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
export const uploadsDirectory = process.env.VERCEL
  ? path.resolve("/tmp/uploads")
  : path.resolve(currentDirectory, "../../uploads");

export async function ensureUploadsDirectory() {
  try {
    await fs.mkdir(uploadsDirectory, { recursive: true });
  } catch {
    // Ignore
  }
}
