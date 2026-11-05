import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
const baseURL = apiUrl ? `${apiUrl}/api` : "/api";

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: { Accept: "application/json" },
});

export default apiClient;
