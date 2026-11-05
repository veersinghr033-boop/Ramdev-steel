import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDatabase } from "../config/database.js";
import { saveSiteContent } from "../services/contentService.js";
import { defaultContent } from "../data/defaultContent.js";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
dotenv.config({ path: path.join(rootDir, ".env") });

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is missing in backend/.env");
  process.exit(1);
}

async function run() {
  try {
    console.log("Connecting to MongoDB...");
    await connectDatabase(MONGODB_URI);
    console.log("Saving full website content to MongoDB (sitecontents)...");
    await saveSiteContent(defaultContent);
    console.log("SUCCESS! All website data (Products, Services, Projects, Gallery, FAQs, Estimator, Testimonials) saved to MongoDB!");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding MongoDB:", error);
    process.exit(1);
  }
}

run();

