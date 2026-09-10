import api from "@/lib/axios";

import type {
  GetOrderResponse,
  GetOrdersResponse,
  GetOrderStatsResponse,
  UpdateOrderStatusResponse,
  DeleteOrderResponse,
  OrderStatus,
} from "@/types/order";

// ========================================
// GET ALL ORDERS - ADMIN
// ========================================

export const getOrders =
  async (): Promise<GetOrdersResponse> => {
    const response = await api.get("/orders");

    return response.data;
  };

// ========================================
// GET SINGLE ORDER - ADMIN
// ========================================

export const getOrder =
  async (
    id: string
  ): Promise<GetOrderResponse> => {
    const response = await api.get(
      `/orders/${id}`
    );

    return response.data;
  };

// ========================================
// GET ORDER STATISTICS - ADMIN
// ========================================

export const getOrderStats =
  async (): Promise<GetOrderStatsResponse> => {
    const response = await api.get(
      "/orders/stats"
    );

    return response.data;
  };

// ========================================
// UPDATE ORDER STATUS - ADMIN
// ========================================

export const updateOrderStatus =
  async (
    id: string,
    status: OrderStatus
  ): Promise<UpdateOrderStatusResponse> => {
    const response = await api.put(
      `/orders/${id}`,
      {
        status,
      }
    );

    return response.data;
  };

// ========================================
// DELETE ORDER - ADMIN
// ========================================

export const deleteOrder =
  async (
    id: string
  ): Promise<DeleteOrderResponse> => {
    const response = await api.delete(
      `/orders/${id}`
    );

    return response.data;
  };


// users


import { MyOrdersResponse, DownloadLeadsResponse } from "@/types/order";

/* =====================================================
   USER — GET MY ORDERS
===================================================== */
export const getMyOrders = async (): Promise<MyOrdersResponse> => {
  const response = await api.get<MyOrdersResponse>("/orders/my-orders");
  return response.data;
};

/* =====================================================
   USER — FETCH ORDER LEADS
===================================================== */
export const fetchOrderLeads = async (orderId: string): Promise<DownloadLeadsResponse> => {
  const response = await api.get<DownloadLeadsResponse>(`/orders/download/${orderId}`);
  return response.data;
};

/* =====================================================
   USER — DIRECT CSV DOWNLOAD
===================================================== */
export const downloadOrderCSVDirect = async (
  orderId: string,
  platformName: string
): Promise<void> => {
  const response = await fetchOrderLeads(orderId);
  const leads = response.leads || [];

  if (!leads.length) {
    throw new Error("No leads found in this order");
  }

  const headers = ["Full Name", "Phone", "Age", "Gender", "Profession", "Source"];
  const rows = leads.map((lead) => [
    `"${lead.fullName || ""}"`,
    `"${lead.phone || ""}"`,
    `"${lead.age ?? ""}"`,
    `"${lead.gender || ""}"`,
    `"${lead.profession || ""}"`,
    `"${lead.source || ""}"`,
  ]);

  const csvContent = [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `${platformName.toLowerCase().replace(/\s+/g, "_")}_leads_${orderId.slice(-6)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};



