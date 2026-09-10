import api from "@/lib/axios";
import { MyDownloadsResponse } from "@/types/download";

/* =====================================================
   GET ALL DOWNLOADS - ADMIN
===================================================== */

export const getDownloads = async () => {
  const response = await api.get("/downloads");

  return response.data;
};

/* =====================================================
   GET SINGLE DOWNLOAD - ADMIN
===================================================== */

export const getDownload = async (
  id: string
) => {
  const response = await api.get(
    `/downloads/${id}`
  );

  return response.data;
};

/* =====================================================
   GET DOWNLOAD STATS - ADMIN
===================================================== */

export const getDownloadStats = async () => {
  const response = await api.get(
    "/downloads/stats"
  );

  return response.data;
};

/* =====================================================
   DELETE DOWNLOAD - ADMIN
===================================================== */

export const deleteDownload = async (
  id: string
) => {
  const response = await api.delete(
    `/downloads/${id}`
  );

  return response.data;
};

/* =====================================================
   GET LEADS FOR ORDER
===================================================== */

export const downloadLeadFile = async (
  orderId: string
) => {
  const response = await api.get(
    `/downloads/download/${orderId}`
  );

  return response.data;
};





/* =====================================================
   GET MY DOWNLOADS - USER
===================================================== */
export const getMyDownloads = async (): Promise<MyDownloadsResponse> => {
  const response = await api.get<MyDownloadsResponse>("/downloads/my-downloads");
  return response.data;
};

/* =====================================================
   DOWNLOAD CSV FILE DIRECTLY
===================================================== */
export const triggerCsvDownload = async (
  orderId: string,
  platformName: string = "leads"
): Promise<void> => {
  const response = await api.get(`/downloads/download/${orderId}`, {
    responseType: "blob",
  });

  const blob = new Blob([response.data], { type: "text/csv;charset=utf-8;" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `${platformName.toLowerCase().replace(/\s+/g, "_")}_leads_${orderId.slice(-6)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};