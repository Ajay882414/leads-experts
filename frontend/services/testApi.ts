import api from "@/lib/axios";

export const testBackend = async () => {
  const response = await api.get("/test");

  return response.data;
};