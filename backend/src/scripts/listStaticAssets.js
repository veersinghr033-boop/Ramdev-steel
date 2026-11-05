import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(scriptDirectory, "../../.env") });
const { default: cloudinary } = await import("../config/cloudinary.js");

if (!cloudinary) throw new Error("Cloudinary SDK is unavailable");

const resources = [];
let nextCursor;

do {
  const result = await cloudinary.api.resources({
    type: "upload",
    prefix: "ramdev-steel/site-assets",
    max_results: 100,
    ...(nextCursor ? { next_cursor: nextCursor } : {}),
  });
  resources.push(
    ...(result.resources || []).map(({ public_id, secure_url }) => ({
      publicId: public_id,
      url: secure_url,
    })),
  );
  nextCursor = result.next_cursor;
} while (nextCursor);

console.log(JSON.stringify(resources, null, 2));
