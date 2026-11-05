import dns from "node:dns";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import { connectDatabase } from "./config/database.js";
import { getHealth } from "./controllers/healthController.js";
import { getUploadedImage } from "./controllers/imageController.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import { seedDefaultContentIfEmpty } from "./services/contentService.js";

// Ensure public DNS resolution for MongoDB Atlas SRV records
try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch {
  // Ignore
}

dotenv.config();

let dbPromise = null;
async function ensureDb() {
  if (mongoose.connection.readyState === 1) return;
  const uri = process.env.MONGODB_URI;
  if (!uri) return;

  if (!dbPromise) {
    dbPromise = (async () => {
      try {
        await connectDatabase(uri);
        await seedDefaultContentIfEmpty().catch(() => {});
      } catch (err) {
        console.error("Vercel Database connection failed:", err.message);
        dbPromise = null;
      }
    })();
  }
  await dbPromise;
}

export function createApp(options = {}) {
  const clientOrigin = options.clientOrigin || process.env.CLIENT_ORIGIN;
  const app = express();
  app.disable("x-powered-by");
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

  // CORS middleware supporting local dev and Vercel deployments
  app.use((req, res, next) => {
    const origin = req.get("origin");
    const isAllowed =
      !origin ||
      !clientOrigin ||
      clientOrigin === "*" ||
      origin === clientOrigin ||
      origin.endsWith(".vercel.app") ||
      origin.includes("localhost") ||
      origin.includes("127.0.0.1");

    if (!isAllowed) {
      return res.status(403).json({ message: "Origin is not allowed" });
    }

    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Vary", "Origin");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    }
    if (req.method === "OPTIONS") return res.sendStatus(204);
    return next();
  });

  // Ensure DB connection on serverless requests
  app.use(async (_req, _res, next) => {
    try {
      await ensureDb();
    } catch {
      // Proceed; handlers will report health/status
    }
    next();
  });

  app.use(express.json({ limit: "5mb" }));
  app.use(cookieParser());

  app.get("/uploads/:filename", getUploadedImage);
  app.get("/api/health", getHealth);
  app.use("/api/admin", authRoutes);
  app.use("/api/content", contentRoutes);
  app.use("/api/admin/images", imageRoutes);

  // Root endpoint for quick verification
  app.get("/", (_req, res) => {
    res.json({
      status: "ok",
      name: "Ramdev Steel API",
      database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    });
  });

  app.use((req, res) =>
    res
      .status(404)
      .json({ message: `Route not found: ${req.method} ${req.path}` }),
  );
  app.use(errorHandler);

  return app;
}

// Default export required by Vercel Serverless Functions
const defaultApp = createApp();
export default defaultApp;
