import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
export const uploadsDirectory = path.resolve(currentDirectory, "../../uploads");

export async function ensureUploadsDirectory() {
  await fs.mkdir(uploadsDirectory, { recursive: true });
}
