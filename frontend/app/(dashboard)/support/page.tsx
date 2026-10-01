"use client";

import { useEffect, useState, useCallback } from "react";
import {
  LifeBuoy,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
  MessageSquare,
  HelpCircle,
  Mail,
  MessageCircle,
} from "lucide-react";
import {
  createSupportTicket,
  getMySupportTickets,
  UserTicket,
} from "@/services/supportApi";

export default function SupportPage() {
  const [tickets, setTickets] = useState<UserTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Form Fields
  const [category, setCategory] = useState<
    "LEADS_ISSUE" | "PAYMENT_ISSUE" | "ACCOUNT_ISSUE" | "GENERAL_QUERY"
  >("LEADS_ISSUE");
  const [orderId, setOrderId] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const loadTickets = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getMySupportTickets();
      setTickets(res.tickets || []);
    } catch (err: any) {
      console.error("Load tickets error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!subject.trim() || !message.trim()) {
      setErrorMessage("Please fill both subject and message details.");
      return;
    }

    try {
      setSubmitting(true);
      await createSupportTicket({
        category,
        orderId: orderId.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });

      setSuccessMessage("Support ticket successfully raised! Admin will reply shortly.");
      setSubject("");
      setMessage("");
      setOrderId("");
      setFormOpen(false);
      loadTickets();
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.message || "Failed to submit ticket. Please retry."
      );
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
            <Clock size={12} className="animate-spin text-amber-600" /> In Progress
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
    <div className="w-full max-w-7xl mx-auto space-y-8 pt-20 pb-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <LifeBuoy className="text-[#0c4731]" size={28} />
            <span>Help & Support</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Need assistance with your orders or lead delivery? Raise a ticket below.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setFormOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#0c4731] hover:bg-[#083021] text-white px-5 py-2.5 text-xs font-bold transition shadow-sm active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle size={15} className="text-[#a3e635]" />
          <span>{formOpen ? "Close Ticket Form" : "Create New Ticket"}</span>
        </button>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4 text-xs font-semibold text-emerald-800">
          {successMessage}
        </div>
      )}

      {/* Quick Help Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-emerald-50 text-[#0c4731] border border-emerald-100 flex items-center justify-center shrink-0">
            <MessageCircle size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">WhatsApp Help</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Quick chat support 10 AM - 7 PM</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center shrink-0">
            <Mail size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Email Inquiry</p>
            <p className="text-[11px] text-slate-500 mt-0.5">info@leadsvero.com</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center shrink-0">
            <Clock size={20} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Lead Delivery Window</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Assigned within 12 - 24 hours</p>
          </div>
        </div>
      </div>

      {/* Ticket Create Form Card */}
      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <HelpCircle size={18} className="text-[#0c4731]" />
            <h2 className="text-base font-bold text-slate-900">Submit a Support Request</h2>
          </div>

          {errorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 font-medium">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Issue Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-2.5 text-xs font-medium text-slate-800 outline-none focus:border-[#0c4731]"
              >
                <option value="LEADS_ISSUE">Leads Quality / Delivery Issue</option>
                <option value="PAYMENT_ISSUE">Payment / Billing Issue</option>
                <option value="ACCOUNT_ISSUE">Profile & Account Setting</option>
                <option value="GENERAL_QUERY">General Inquiry</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Related Order ID (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. #B22083"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0c4731]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Subject *
            </label>
            <input
              type="text"
              placeholder="Brief summary of your query"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0c4731]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Message Description *
            </label>
            <textarea
              rows={4}
              placeholder="Explain your problem in detail so our team can resolve it quickly..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] p-4 text-xs text-slate-900 outline-none focus:border-[#0c4731]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="rounded-2xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-1.5 rounded-2xl bg-[#0c4731] hover:bg-[#083021] text-white px-6 py-2.5 text-xs font-bold transition disabled:opacity-50 cursor-pointer shadow-sm"
            >
              <Send size={13} className="text-[#a3e635]" />
              <span>{submitting ? "Submitting..." : "Submit Ticket"}</span>
            </button>
          </div>
        </form>
      )}

      {/* Tickets History List */}
      <div className="space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">Your Support Tickets</h2>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-400">
            Loading your support history...
          </div>
        ) : tickets.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <MessageSquare size={32} className="mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-bold text-slate-800">No Support Tickets Yet</p>
            <p className="text-xs text-slate-400 mt-1">
              Have questions? Click "Create New Ticket" to reach out to us.
            </p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {tickets.map((t) => (
              <div
                key={t._id}
                className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3 transition hover:border-slate-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {t.ticketId || `#${t._id.slice(-6).toUpperCase()}`}
                    </span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                      {t.category}
                    </span>
                    {t.orderId && (
                      <span className="text-[11px] text-slate-400 font-mono">
                        Order: {t.orderId}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">
                      {new Date(t.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    {getStatusBadge(t.status)}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800">{t.subject}</h3>
                  <p className="text-xs text-slate-600 mt-1 whitespace-pre-wrap">{t.message}</p>
                </div>

                {/* Admin Reply Section */}
                {t.adminReply ? (
                  <div className="rounded-xl bg-[#eef7ee] border border-[#d6ecd6] p-3 text-xs text-[#0c4731] space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={13} />
                      <span>Admin Response:</span>
                    </p>
                    <p className="whitespace-pre-wrap text-slate-800">{t.adminReply}</p>
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-400 italic">
                    Awaiting admin response...
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}