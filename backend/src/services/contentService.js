import { SiteContent } from "../models/SiteContent.js";

export async function getSiteContent() {
  const record = await SiteContent.findOne({ key: "site" }).lean();
  return {
    content: record?.data ?? null,
    updatedAt: record?.updatedAt ?? null,
  };
}

export async function saveSiteContent(content) {
  const record = await SiteContent.findOneAndUpdate(
    { key: "site" },
    { $set: { data: content } },
    { upsert: true, new: true, runValidators: true },
  ).lean();
  return { content: record.data, updatedAt: record.updatedAt };
}
