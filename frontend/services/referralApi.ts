import api from "../lib/axios";

export const getReferralClients = async () => {
  const response = await api.get("/admin/referral-clients");
  return response.data;
};

export const getReferralReport = async (clientId: string) => {
  const response = await api.get(`/admin/referral-report/${clientId}`);
  return response.data;
};