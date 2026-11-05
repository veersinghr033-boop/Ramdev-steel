import apiClient from "./client";

export const getApiHealth = async () => (await apiClient.get("/health")).data;
