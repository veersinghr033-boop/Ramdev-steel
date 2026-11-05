import { getSiteContent, saveSiteContent } from "../services/contentService.js";

export async function getContent(_req, res, next) {
  try {
    return res.json(await getSiteContent());
  } catch (error) {
    return next(error);
  }
}

export async function putContent(req, res, next) {
  const { content } = req.body ?? {};
  if (!content || typeof content !== "object" || Array.isArray(content)) {
    return res.status(400).json({ message: "Content must be a JSON object" });
  }
  try {
    return res.json(await saveSiteContent(content));
  } catch (error) {
    return next(error);
  }
}
