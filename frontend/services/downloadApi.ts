import api from "@/lib/axios";

// Get All Downloads
export const getDownloads = async () => {
  const response = await api.get("/downloads");
  return response.data;
};

// Get Single Download
export const getDownload = async (
  id: string
) => {
  const response = await api.get(
    `/downloads/${id}`
  );

  return response.data;
};

// Download Stats
export const getDownloadStats =
  async () => {
    const response =
      await api.get(
        "/downloads/stats"
      );

    return response.data;
  };

// Delete Download
export const deleteDownload =
  async (id: string) => {
    const response =
      await api.delete(
        `/downloads/${id}`
      );

    return response.data;
  };

// Download Leads
export const downloadLeadFile =
  async (orderId: string) => {
    const response =
      await api.get(
        `/downloads/download/${orderId}`
      );

    return response.data;
  };