import api from "@/lib/axios";

export const getOrders = async () => {
  const response = await api.get("/orders");

  return response.data;
};

export const getOrder = async (
  id: string
) => {
  const response = await api.get(
    `/orders/${id}`
  );

  return response.data;
};

export const getOrderStats =
  async () => {
    const response =
      await api.get(
        "/orders/stats"
      );

    return response.data;
  };

export const updateOrderStatus =
  async (
    id: string,
    status: string
  ) => {
    const response =
      await api.put(
        `/orders/${id}`,
        {
          status,
        }
      );

    return response.data;
  };

export const deleteOrder =
  async (id: string) => {
    const response =
      await api.delete(
        `/orders/${id}`
      );

    return response.data;
  };