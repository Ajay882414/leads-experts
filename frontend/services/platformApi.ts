import api from "@/lib/axios";

import {
  PlatformFormData,
} from "@/types/platform";

// Get All Platforms

export const getPlatforms = async () => {
  const response = await api.get("/platforms");

  return response.data;
};

// Get Single Platform

export const getPlatform = async (
  id: string
) => {
  const response = await api.get(
    `/platforms/${id}`
  );

  return response.data;
};

// Create Platform

export const createPlatform =
  async (
    data: PlatformFormData
  ) => {
    const response = await api.post(
      "/platforms",
      data
    );

    return response.data;
  };

// Update Platform

export const updatePlatform =
  async (
    id: string,
    data: PlatformFormData
  ) => {
    const response = await api.put(
      `/platforms/${id}`,
      data
    );

    return response.data;
  };

// Delete Platform

export const deletePlatform =
  async (
    id: string
  ) => {
    const response = await api.delete(
      `/platforms/${id}`
    );

    return response.data;
  };