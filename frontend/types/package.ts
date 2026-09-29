export interface Package {
  _id: string;
  platform:
    | string
    | {
        _id: string;
        name: string;
        slug: string;
        color?: string;
      };
  name: string;
  category: string;
  pricePerLead: number;
  deliveryTime?: string;
  badges?: string[];
  minimumPurchase: number;
  status: "ACTIVE" | "INACTIVE";
  totalLeads: number;
  availableLeads: number;
  soldLeads: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PackageFormData {
  platform: string;
  name: string;
  category: string;
  pricePerLead: number;
  deliveryTime?: string;
  badges?: string[];
  minimumPurchase?: number;
  status?: "ACTIVE" | "INACTIVE";
}