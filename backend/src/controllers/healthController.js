import { getDatabaseStatus } from "../config/database.js";

export function getHealth(_req, res) {
  const database = getDatabaseStatus();
  return res.json({ status: database === "connected" ? "ok" : "degraded", database });
}
