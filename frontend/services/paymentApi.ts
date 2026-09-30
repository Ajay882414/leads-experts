import api from "@/lib/axios";

export interface CreateOrderPayload {
  packageId: string;
  quantity: number;
}

export interface CreateOrderResponse {
  success: boolean;
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  package: {
    name: string;
    category: string;
    pricePerLead: number;
  };
}

export interface VerifyPaymentPayload {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  orderId: string;
}

// 1. Create Razorpay order (withCredentials true ensure karega ki token backend tak jaye)
export const createPaymentOrder = async (
  payload: CreateOrderPayload
): Promise<CreateOrderResponse> => {
  const response = await api.post<CreateOrderResponse>(
    "/payments/create-order",
    payload,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// 2. Verify signature & allocate leads
export const verifyPaymentSignature = async (
  payload: VerifyPaymentPayload
): Promise<VerifyPaymentResponse> => {
  const response = await api.post<VerifyPaymentResponse>(
    "/payments/verify-payment",
    payload,
    {
      withCredentials: true,
    }
  );
  return response.data;
};