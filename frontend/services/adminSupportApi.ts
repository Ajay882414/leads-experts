import api from "@/lib/axios";

export interface AdminTicket {
  _id: string;
  ticketId: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
    mobileNumber?: string;
  };
  category: string;
  orderId?: string;
  subject: string;
  message: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  adminReply?: string;
  createdAt: string;
}

export interface TicketCounts {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
}

// 1. Fetch all tickets with filters
export const getAdminTickets = async (status?: string, search?: string) => {
  const params: any = {};
  if (status && status !== "ALL") params.status = status;
  if (search) params.search = search;

  const res = await api.get("/support/admin/all", { params });
  return res.data;
};

// 2. Reply and update ticket status
export const replyAdminTicket = async (
  ticketId: string,
  data: { adminReply: string; status: string }
) => {
  const res = await api.put(`/support/admin/${ticketId}/reply`, data);
  return res.data;
};