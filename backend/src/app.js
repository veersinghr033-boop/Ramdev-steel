import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import { getHealth } from "./controllers/healthController.js";
import { getUploadedImage } from "./controllers/imageController.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

export function createApp({ clientOrigin }) {
  const app = express();
  app.disable("x-powered-by");
  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.use((req, res, next) => {
    const origin = req.get("origin");
    if (origin && origin !== clientOrigin) {
      return res.status(403).json({ message: "Origin is not allowed" });
    }
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Vary", "Origin");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }
    if (req.method === "OPTIONS") return res.sendStatus(204);
    return next();
  });
  app.use(express.json({ limit: "2mb" }));
  app.use(cookieParser());

  app.get("/uploads/:filename", getUploadedImage);
  app.get("/api/health", getHealth);
  app.use("/api/admin", authRoutes);
  app.use("/api/content", contentRoutes);
  app.use("/api/admin/images", imageRoutes);
  app.use((req, res) =>
    res
      .status(404)
      .json({ message: `Route not found: ${req.method} ${req.path}` }),
  );
  app.use(errorHandler);
  return app;
}
