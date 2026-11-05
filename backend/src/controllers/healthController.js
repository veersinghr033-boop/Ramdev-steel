import { getDatabaseStatus } from "../config/database.js";

export function getHealth(_req, res) {
  return res.json({ status: "ok", database: getDatabaseStatus() });
}
