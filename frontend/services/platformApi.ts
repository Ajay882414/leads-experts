import api from "@/lib/axios";

import {
  PlatformFormData,
} from "@/types/platform";

// ========================================
// GET ALL PLATFORMS
// ========================================

export const getPlatforms = async () => {
  const response = await api.get("/platforms");

  return response.data;
};

// ========================================
// GET SINGLE PLATFORM
// ========================================

export const getPlatform = async (
  id: string
) => {
  const response = await api.get(
    `/platforms/${id}`
  );

  return response.data;
};

// ========================================
// GET PLATFORM PRICE
// ========================================

export const getPlatformPrice = async (
  id: string
) => {
  const response = await api.get(
    `/platforms/${id}/price`
  );

  return response.data;
};

// ========================================
// CREATE PLATFORM - ADMIN
// ========================================

export const createPlatform = async (
  data: PlatformFormData
) => {
  const response = await api.post(
    "/platforms",
    data
  );

  return response.data;
};

// ========================================
// UPDATE PLATFORM - ADMIN
// ========================================

export const updatePlatform = async (
  id: string,
  data: PlatformFormData
) => {
  const response = await api.put(
    `/platforms/${id}`,
    data
  );

  return response.data;
};

// ========================================
// DELETE PLATFORM - ADMIN
// ========================================

export const deletePlatform = async (
  id: string
) => {
  const response = await api.delete(
    `/platforms/${id}`
  );

  return response.data;
};