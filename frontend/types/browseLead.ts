export type PlatformStatus = "ACTIVE" | "INACTIVE";

export interface BrowsePlatform {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  banner: string;
  color: string;
  pricePerLead: number;
  minimumPurchase: number;
  status: PlatformStatus;
  totalLeads: number;
  availableLeads: number;
  soldLeads: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateOrderPayload {
  platform: string;
  quantity: number;
}

export interface PlatformsResponse {
  success: boolean;
  count?: number;
  platforms: BrowsePlatform[];
}

export interface PlatformResponse {
  success: boolean;
  platform: BrowsePlatform;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  order: {
    _id: string;
    user: string;
    platform: string;
    quantity: number;
    pricePerLead: number;
    totalAmount: number;
    status: string;
    purchasedLeads: string[];
    createdAt?: string;
    updatedAt?: string;
  };
}