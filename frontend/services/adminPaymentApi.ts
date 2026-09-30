import api from "@/lib/axios";

export interface PaymentItem {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  platform: {
    _id: string;
    name: string;
  };
  package: {
    _id: string;
    name: string;
    category: string;
  };
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  amount: number;
  quantity: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  createdAt: string;
}

export interface AdminPaymentsResponse {
  success: boolean;
  count: number;
  payments: PaymentItem[];
}

export const getAllPaymentsAdmin = async (): Promise<AdminPaymentsResponse> => {
  const response = await api.get<AdminPaymentsResponse>("/payments/all");
  return response.data;
};