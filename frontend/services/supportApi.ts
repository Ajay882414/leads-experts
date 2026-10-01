import api from "@/lib/axios";

export interface CreateTicketPayload {
  category: "LEADS_ISSUE" | "PAYMENT_ISSUE" | "ACCOUNT_ISSUE" | "GENERAL_QUERY";
  orderId?: string;
  subject: string;
  message: string;
}

export interface UserTicket {
  _id: string;
  ticketId: string;
  category: string;
  orderId?: string;
  subject: string;
  message: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  adminReply?: string;
  createdAt: string;
}

// 1. Create a new support ticket
export const createSupportTicket = async (data: CreateTicketPayload) => {
  const res = await api.post("/support", data);
  return res.data;
};

// 2. Fetch logged-in user tickets
export const getMySupportTickets = async () => {
  const res = await api.get("/support/my-tickets");
  return res.data;
};