import fs from "node:fs/promises";
import path from "node:path";
import { uploadsDirectory } from "../config/uploads.js";

export async function listUploadedImages() {
  const files = await fs.readdir(uploadsDirectory, { withFileTypes: true });
  const images = await Promise.all(
    files
      .filter((file) => file.isFile())
      .map(async (file) => {
        const details = await fs.stat(path.join(uploadsDirectory, file.name));
        return {
          name: file.name,
          url: `/uploads/${file.name}`,
          size: details.size,
          updatedAt: details.mtime,
        };
      }),
  );
  return images.sort((left, right) => right.updatedAt - left.updatedAt);
}
