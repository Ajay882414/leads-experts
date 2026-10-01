"use client";

import { useEffect, useState, useCallback } from "react";
import {
  LifeBuoy,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  X,
  Send,
  RefreshCw,
} from "lucide-react";
import {
  getAdminTickets,
  replyAdminTicket,
  AdminTicket,
  TicketCounts,
} from "@/services/adminSupportApi";

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<AdminTicket[]>([]);
  const [counts, setCounts] = useState<TicketCounts>({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Reply Modal States
  const [activeTicket, setActiveTicket] = useState<AdminTicket | null>(null);
  const [replyText, setReplyText] = useState("");
  const [newStatus, setNewStatus] = useState("RESOLVED");
  const [submitting, setSubmitting] = useState(false);

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAdminTickets(selectedStatus, search);
      setTickets(res.tickets || []);
      if (res.counts) setCounts(res.counts);
    } catch (err) {
      console.error("Tickets load error:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedStatus, search]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleOpenReplyModal = (t: AdminTicket) => {
    setActiveTicket(t);
    setReplyText(t.adminReply || "");
    setNewStatus(t.status === "OPEN" ? "RESOLVED" : t.status);
  };

  const handleSendReply = async () => {
    if (!activeTicket) return;
    try {
      setSubmitting(true);
      await replyAdminTicket(activeTicket._id, {
        adminReply: replyText,
        status: newStatus,
      });
      setActiveTicket(null);
      fetchTickets();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Reply send karne me samasya aayi");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "OPEN":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-xs font-semibold text-rose-700">
            <AlertCircle size={12} /> Open
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
            <Clock size={12} /> In Progress
          </span>
        );
      case "RESOLVED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
            <CheckCircle2 size={12} /> Resolved
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <LifeBuoy className="text-[#0c4731]" size={26} />
            <span>Support Tickets</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Users ke grievances, payment issues aur inquiries ka direct resolution panel.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchTickets}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs cursor-pointer"
        >
          <RefreshCw size={14} />
          <span>Refresh</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <p className="text-xs text-slate-500 font-semibold">Total Tickets</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{counts.total}</p>
        </div>
        <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-4 shadow-xs">
          <p className="text-xs text-rose-700 font-semibold">Pending / Open</p>
          <p className="text-2xl font-black text-rose-800 mt-1">{counts.open}</p>
        </div>
        <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-4 shadow-xs">
          <p className="text-xs text-amber-700 font-semibold">In Progress</p>
          <p className="text-2xl font-black text-amber-800 mt-1">{counts.inProgress}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 shadow-xs">
          <p className="text-xs text-emerald-700 font-semibold">Resolved</p>
          <p className="text-2xl font-black text-emerald-800 mt-1">{counts.resolved}</p>
        </div>
      </div>

      {/* Search & Status Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Ticket ID, Subject or Order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#0c4731]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {["ALL", "OPEN", "IN_PROGRESS", "RESOLVED"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedStatus === status
                  ? "bg-[#0c4731] text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase">
              <tr>
                <th className="py-3.5 px-4">Ticket</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Category & Order</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Loading tickets...
                  </td>
                </tr>
              ) : tickets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No tickets found.
                  </td>
                </tr>
              ) : (
                tickets.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {t.ticketId || `#${t._id.slice(-6).toUpperCase()}`}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-900">{t.user?.fullName || "User"}</p>
                      <p className="text-[11px] text-slate-400">{t.user?.email}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                        {t.category}
                      </span>
                      {t.orderId && (
                        <p className="font-mono text-[10px] text-slate-500 mt-1">
                          Order: {t.orderId}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate">
                      <p className="font-semibold text-slate-800 truncate">{t.subject}</p>
                      <p className="text-[11px] text-slate-400 truncate">{t.message}</p>
                    </td>
                    <td className="py-3.5 px-4">{getStatusBadge(t.status)}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">
                      {new Date(t.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenReplyModal(t)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#0c4731] hover:bg-[#083021] text-white px-3 py-1.5 text-xs font-bold transition cursor-pointer"
                      >
                        <MessageSquare size={13} className="text-[#a3e635]" />
                        <span>Reply</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Reply & Resolve Modal */}
      {activeTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-slate-100 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Ticket #{activeTicket.ticketId || activeTicket._id.slice(-6).toUpperCase()}
                </h3>
                <p className="text-xs text-slate-500">
                  From: {activeTicket.user?.fullName} ({activeTicket.user?.email})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTicket(null)}
                className="h-8 w-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Issue Details Box */}
            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-3.5 text-xs space-y-1">
              <p className="font-bold text-slate-800">{activeTicket.subject}</p>
              <p className="text-slate-600 whitespace-pre-wrap">{activeTicket.message}</p>
            </div>

            {/* Reply Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Admin Response</label>
              <textarea
                rows={4}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply to resolve the user's issue..."
                className="w-full rounded-2xl border border-slate-200 p-3 text-xs text-slate-800 outline-none focus:border-[#0c4731]"
              />
            </div>

            {/* Status Select */}
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Update Status:</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none"
              >
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveTicket(null)}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleSendReply}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0c4731] hover:bg-[#083021] py-2.5 text-xs font-bold text-white transition disabled:opacity-50 cursor-pointer"
              >
                <Send size={13} className="text-[#a3e635]" />
                <span>{submitting ? "Saving..." : "Send Response"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}