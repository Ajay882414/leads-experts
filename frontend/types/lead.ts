export interface Lead {
  _id: string;

  platform: {
    _id: string;
    name: string;
  };

  fullName: string;

  email: string;

  phone: string;

  country: string;

  state: string;

  city: string;

  business: string;

  category: string;

  price: number;

  status: "AVAILABLE" | "RESERVED" | "SOLD";

  createdAt: string;

  updatedAt: string;
}

export interface LeadFormData {
  platform: string;

  fullName: string;

  email: string;

  phone: string;

  country: string;

  state: string;

  city: string;

  business: string;

  category: string;

  price: number;

  status: "AVAILABLE" | "RESERVED" | "SOLD";
}