import api from "@/lib/axios";

// Get Settings
export const getSettings =
  async () => {
    const response =
      await api.get(
        "/settings"
      );

    return response.data;
  };

// Update Settings
export const updateSettings =
  async (data: any) => {
    const response =
      await api.put(
        "/settings",
        data
      );

    return response.data;
  };