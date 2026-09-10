import api from "@/lib/axios";

import {
  LeadFilters,
} from "@/types/lead";

// ========================================
// GET ALL LEADS
// ========================================

export const getLeads = async (
  params?: LeadFilters
) => {
  const response = await api.get(
    "/leads",
    {
      params,
    }
  );

  return response.data;
};

// ========================================
// GET SINGLE LEAD
// ========================================

export const getLead = async (
  id: string
) => {
  const response = await api.get(
    `/leads/${id}`
  );

  return response.data;
};

// ========================================
// UPDATE LEAD
// ========================================

export const updateLead = async (
  id: string,
  data: any
) => {
  const response = await api.put(
    `/leads/${id}`,
    data
  );

  return response.data;
};

// ========================================
// DELETE LEAD
// ========================================

export const deleteLead = async (
  id: string
) => {
  const response = await api.delete(
    `/leads/${id}`
  );

  return response.data;
};

// ========================================
// LEAD STATISTICS
// ========================================

export const getLeadStats = async () => {
  const response = await api.get(
    "/leads/stats"
  );

  return response.data;
};

// ========================================
// BULK CSV / EXCEL UPLOAD
// ========================================

export const uploadLeads = async (
  formData: FormData
) => {
  const response = await api.post(
    "/leads/upload",
    formData
  );

  return response.data;
};