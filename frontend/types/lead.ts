export type LeadStatus =
  | "AVAILABLE"
  | "RESERVED"
  | "SOLD";

export interface LeadPlatform {
  _id: string;
  name: string;
  slug?: string;
  pricePerLead?: number;
}

export interface LeadUser {
  _id: string;
  fullName?: string;
  email?: string;
}

export interface LeadOrder {
  _id: string;
  status?: string;
  totalAmount?: number;
}

export interface Lead {
  _id: string;

  platform:
    | LeadPlatform
    | string;

  fullName: string;

  phone: string;

  age: number;

  gender: string;

  profession: string;

  source: string;

  sourceTimestamp?: string | null;

  status: LeadStatus;

  soldTo?:
    | LeadUser
    | string
    | null;

  soldAt?: string | null;

  order?:
    | LeadOrder
    | string
    | null;

  soldPrice?: number | null;

  createdAt: string;

  updatedAt: string;
}

export interface LeadFormData {
  platform: string;

  fullName: string;

  phone: string;

  age: number;

  gender: string;

  profession: string;

  source: string;

  status?: LeadStatus;
}

export interface LeadFilters {
  search?: string;

  platform?: string;

  status?: LeadStatus;

  profession?: string;

  gender?: string;

  page?: number;

  limit?: number;
}

export interface LeadStatsData {
  totalLeads: number;

  availableLeads: number;

  reservedLeads: number;

  soldLeads: number;
}