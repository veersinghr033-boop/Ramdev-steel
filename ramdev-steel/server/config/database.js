import mongoose from "mongoose";

export async function connectDatabase(uri) {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  console.log("Connected to MongoDB");
}

export function getDatabaseStatus() {
  return mongoose.connection.readyState === 1 ? "connected" : "disconnected";
}
