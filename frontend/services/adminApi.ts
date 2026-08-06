import api from "@/lib/axios";

// Dashboard Statistics
export const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard");

  return response.data;
};


// Recent Users
export const getRecentUsers = async () => {
  const response = await api.get(
    "/admin/recent-users"
  );

  return response.data;
};

// Recent Leads
export const getRecentLeads = async () => {
  const response = await api.get(
    "/admin/recent-leads"
  );

  return response.data;
};


export const getLeadChart =
  async () => {
    const response =
      await api.get(
        "/admin/lead-chart"
      );

    return response.data;
  };

export const getPlatformChart =
  async () => {
    const response =
      await api.get(
        "/admin/platform-chart"
      );

    return response.data;
  };


  export const getRevenue =
  async () => {
    const response =
      await api.get(
        "/admin/revenue"
      );

    return response.data;
  };