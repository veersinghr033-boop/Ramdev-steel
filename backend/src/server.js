import dns from "node:dns";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createApp } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { seedDefaultContentIfEmpty } from "./services/contentService.js";
import { migrateLocalUploadsToMongo } from "./services/imageService.js";

// Use public DNS to resolve MongoDB Atlas SRV records if local router/ISP DNS fails
try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch {
  // Ignore if custom DNS cannot be set
}

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

const app = createApp({
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
});
const port = Number(process.env.PORT || 3001);
const server = app.listen(port, () =>
  console.log(`Ramdev Steel API listening on http://localhost:${port}`),
);

let shuttingDown = false;
async function connectWithRetry() {
  while (!shuttingDown) {
    try {
      await connectDatabase(MONGODB_URI);
      break;
    } catch (error) {
      console.error(
        `MongoDB is unavailable: ${error.message} [Code: ${error.code || "N/A"}]. Retrying in 5 seconds...`,
      );
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
  if (shuttingDown) return;

  try {
    await seedDefaultContentIfEmpty();
  } catch (error) {
    console.error("Could not seed default content:", error.message);
  }

  try {
    await migrateLocalUploadsToMongo();
  } catch (error) {
    console.error("Could not migrate existing image uploads:", error.message);
  }
}

void connectWithRetry();

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.once(signal, () => {
    shuttingDown = true;
    server.close(() => void mongoose.disconnect());
  });
}
