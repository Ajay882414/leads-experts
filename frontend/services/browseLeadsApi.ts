import api from "@/lib/axios";
import {
  BrowsePlatform,
  CreateOrderPayload,
  OrderResponse,
  PlatformResponse,
  PlatformsResponse,
} from "@/types/browseLead";

export const getBrowsePlatforms = async (): Promise<BrowsePlatform[]> => {
  const response = await api.get<PlatformsResponse>("/platforms");
  return response.data.platforms || [];
};

export const getBrowsePlatform = async (platformId: string): Promise<BrowsePlatform> => {
  const response = await api.get<PlatformResponse>(`/platforms/${platformId}`);
  return response.data.platform;
};

export const purchaseLeads = async (payload: CreateOrderPayload): Promise<OrderResponse> => {
  const response = await api.post<OrderResponse>("/orders", payload);
  return response.data;
};