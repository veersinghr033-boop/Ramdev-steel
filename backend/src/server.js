import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { createApp } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { ensureUploadsDirectory } from "./config/uploads.js";

const backendDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
dotenv.config({ path: path.join(backendDirectory, ".env") });

const { MONGODB_URI, JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
if (
  !MONGODB_URI ||
  !ADMIN_USERNAME ||
  !ADMIN_PASSWORD ||
  !JWT_SECRET ||
  JWT_SECRET.length < 32
) {
  throw new Error(
    "Set MONGODB_URI, ADMIN_USERNAME, ADMIN_PASSWORD, and a JWT_SECRET of at least 32 characters in backend/.env",
  );
}

await ensureUploadsDirectory();
await connectDatabase(MONGODB_URI);
const app = createApp({
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
});
const port = Number(process.env.PORT || 3001);
app.listen(port, () =>
  console.log(`Ramdev Steel API listening on http://localhost:${port}`),
);
