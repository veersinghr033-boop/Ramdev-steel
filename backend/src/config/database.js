import mongoose from "mongoose";

export async function connectDatabase(uri) {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
}

export function getDatabaseStatus() {
  return mongoose.connection.readyState === 1 ? "connected" : "disconnected";
}
