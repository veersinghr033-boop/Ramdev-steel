import apiClient from "./client";

export const loginAdmin = async (credentials) =>
  (await apiClient.post("/admin/login", credentials)).data;
export const getAdminSession = async () =>
  (await apiClient.get("/admin/session")).data;
export const logoutAdmin = () => apiClient.post("/admin/logout");
export const getUploadedImages = async () =>
  (await apiClient.get("/admin/images")).data;
export const deleteAdminImage = async (filename) =>
  (await apiClient.delete("/admin/images", { params: { filename } })).data;
export const uploadAdminImage = async (file, onProgress) => {
  const formData = new FormData();
  formData.append("image", file);
  return (
    await apiClient.post("/admin/images", formData, {
      onUploadProgress: (event) => {
        if (event.total)
          onProgress?.(Math.round((event.loaded / event.total) * 100));
      },
    })
  ).data;
};
export const getApiErrorMessage = (error) =>
  error.response?.data?.message || error.message || "Request failed";
