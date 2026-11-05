import apiClient from "./client";

export const getSiteContent = async () =>
  (await apiClient.get("/content")).data;
export const saveSiteContent = async (content) =>
  (await apiClient.put("/content", { content })).data;
