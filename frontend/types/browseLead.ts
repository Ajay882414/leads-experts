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
  categories?: string[]; // <-- Yeh line TypeScript error khatam kar degi
  totalLeads: number;
  availableLeads: number;
  soldLeads: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface LeadPackageItem {
  id: string;
  category: string;
  title: string;
  platformId: string;
  platformName: string;
  pricePerLead: number;
  minimumPurchase: number;
  availableLeads: number;
  deliveryTime?: string;
  badges?: string[];
}

export interface PlatformPackagesResponse {
  success: boolean;
  platform: {
    _id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
    pricePerLead: number;
    categories: string[];
  };
  packages: LeadPackageItem[];
}

export interface CreateOrderPayload {
  platform?: string;
  packageId?: string;
  quantity: number;
  category?: string;
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
  category?: string;
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