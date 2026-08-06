import api from "@/lib/axios";

import { LeadFormData } from "@/types/lead";

// Get All Leads
export const getLeads = async (
  params?: {
    search?: string;
    platform?: string;
    status?: string;
  }
) => {
  const response = await api.get(
    "/leads",
    {
      params,
    }
  );

  return response.data;
};

// Get Single Lead
export const getLead = async (
  id: string
) => {
  const response = await api.get(
    `/leads/${id}`
  );

  return response.data;
};

// Create Lead
export const createLead = async (
  data: LeadFormData
) => {
  const response = await api.post(
    "/leads",
    data
  );

  return response.data;
};

// Update Lead
export const updateLead = async (
  id: string,
  data: LeadFormData
) => {
  const response = await api.put(
    `/leads/${id}`,
    data
  );

  return response.data;
};

// Delete Lead
export const deleteLead = async (
  id: string
) => {
  const response = await api.delete(
    `/leads/${id}`
  );

  return response.data;
};


// Lead Statistics

export const getLeadStats = async () => {
  const response = await api.get(
    "/leads/stats"
  );

  return response.data;
};





// Upload Leads CSV / Excel

export const uploadLeads = async (
  formData: FormData
) => {
  const response = await api.post(
    "/leads/upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};