import api from "@/lib/axios";

// Dashboard Report
export const getDashboardReport =
  async () => {
    const response =
      await api.get(
        "/reports/dashboard"
      );

    return response.data;
  };

// Sales Report
export const getSalesReport =
  async () => {
    const response =
      await api.get(
        "/reports/sales"
      );

    return response.data;
  };

// Platform Report
export const getPlatformReport =
  async () => {
    const response =
      await api.get(
        "/reports/platforms"
      );

    return response.data;
  };

// User Report
export const getUserReport =
  async () => {
    const response =
      await api.get(
        "/reports/users"
      );

    return response.data;
  };

// Order Report
export const getOrderReport =
  async () => {
    const response =
      await api.get(
        "/reports/orders"
      );

    return response.data;
  };

// Download Report
export const getDownloadReport =
  async () => {
    const response =
      await api.get(
        "/reports/downloads"
      );

    return response.data;
  };