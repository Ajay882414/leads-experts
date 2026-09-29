import api from "@/lib/axios";
import { Package, PackageFormData } from "@/types/package";

// Get packages by platform ID
export const getPackagesByPlatform = async (platformId: string) => {
  const res = await api.get(`/packages/platform/${platformId}`);
  return res.data;
};

// Get all packages (Admin)
export const getAllPackages = async (platformId?: string) => {
  const url = platformId ? `/packages?platform=${platformId}` : "/packages";
  const res = await api.get(url);
  return res.data;
};

// Create new package card (Admin)
export const createPackage = async (data: PackageFormData) => {
  const res = await api.post("/packages", data);
  return res.data;
};

// Update package card (Admin)
export const updatePackage = async (
  id: string,
  data: Partial<PackageFormData>
) => {
  const res = await api.put(`/packages/${id}`, data);
  return res.data;
};

// Delete package card (Admin)
export const deletePackage = async (id: string) => {
  const res = await api.delete(`/packages/${id}`);
  return res.data;
};