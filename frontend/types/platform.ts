export type PlatformStatus = "ACTIVE" | "INACTIVE";

export interface Platform {
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

  createdAt: string;

  updatedAt: string;
}

export interface PlatformFormData {
  name: string;

  slug: string;

  description: string;

  icon: string;

  banner: string;

  color: string;

  pricePerLead: number;

  minimumPurchase: number;

  status: PlatformStatus;
}

export interface PlatformPriceResponse {
  name: string;

  pricePerLead: number;

  minimumPurchase: number;

  availableLeads: number;

  status: PlatformStatus;
}