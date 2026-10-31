"use client";

import { useState, useEffect } from "react";
import { X, Download, User, Sparkles, Phone, ChevronDown } from "lucide-react";
import { UserOrder, PurchasedLeadItem, LeadCallStatus } from "@/types/order";
import {
  fetchOrderLeads,
  downloadOrderCSVDirect,
  updateLeadCallStatus,
} from "@/services/orderApi";

interface OrderDetailsModalProps {
  order: UserOrder | null;
  onClose: () => void;
}

const CALL_STATUS_OPTIONS: { label: string; value: LeadCallStatus; style: string }[] = [
  { label: "New", value: "NEW", style: "bg-blue-50 text-blue-700 border-blue-200" },
  { label: "Contacted", value: "CONTACTED", style: "bg-purple-50 text-purple-700 border-purple-200" },
  { label: "Interested", value: "INTERESTED", style: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  { label: "Follow Up", value: "FOLLOW_UP", style: "bg-amber-50 text-amber-800 border-amber-200" },
  { label: "Not Interested", value: "NOT_INTERESTED", style: "bg-slate-100 text-slate-600 border-slate-200" },
  { label: "Closed", value: "CLOSED", style: "bg-[#0c4731] text-[#a3e635] border-[#0c4731]" },
];

export default function OrderDetailsModal({
  order,
  onClose,
}: OrderDetailsModalProps) {
  const [leads, setLeads] = useState<PurchasedLeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!order) return;

    const loadLeads = async () => {
      try {
        setLoading(true);
        const data = await fetchOrderLeads(order._id);
        setLeads(data.leads || []);
      } catch (err) {
        console.error("Failed to load order leads", err);
      } finally {
        setLoading(false);
      }
    };

    loadLeads();
  }, [order]);

  if (!order) return null;

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await downloadOrderCSVDirect(order._id, order.platform?.name || "leads");
    } catch (err) {
      alert("Failed to download CSV");
    } finally {
      setDownloading(false);
    }
  };

  const getCleanPhone = (phoneStr?: string) => {
    if (!phoneStr) return "";
    return phoneStr.replace(/[^0-9]/g, "");
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadCallStatus) => {
    // Optimistic UI update
    setLeads((prev) =>
      prev.map((item) =>
        item._id === leadId ? { ...item, callStatus: newStatus } : item
      )
    );

    try {
      setUpdatingId(leadId);
      await updateLeadCallStatus(leadId, newStatus);
    } catch (error) {
      console.error("Failed to persist lead status", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadgeStyle = (status?: string) => {
    const found = CALL_STATUS_OPTIONS.find((s) => s.value === status);
    return found ? found.style : "bg-blue-50 text-blue-700 border-blue-200";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4 transition-all duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl overflow-hidden rounded-t-[32px] sm:rounded-[28px] bg-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 sm:px-7 py-4 sm:py-5 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0c4731] text-[#a3e635] font-semibold text-xs shadow-inner">
              {order.platform?.name?.slice(0, 2).toUpperCase() || "LE"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none">
                  Order #{order._id.slice(-8).toUpperCase()}
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#eef7ee] text-[#0c4731] border border-[#d6ecd6] text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                  <Sparkles size={10} /> Fresh Leads
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500 font-medium">
                {order.platform?.name} • {order.quantity} Leads • ₹{order.totalAmount.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xs sm:text-sm text-slate-800">
              Allocated Client Records ({leads.length})
            </h3>
            <button
              type="button"
              disabled={downloading || leads.length === 0}
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0c4731] hover:bg-[#083021] active:scale-95 px-3.5 py-1.5 text-xs font-semibold text-white disabled:bg-slate-200 disabled:text-slate-400 transition-all cursor-pointer shadow-sm"
            >
              <Download size={13} className="text-[#a3e635]" />
              <span>{downloading ? "Exporting..." : "Download CSV"}</span>
            </button>
          </div>

          {loading ? (
            <div className="space-y-2.5 animate-pulse py-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 w-full rounded-2xl bg-slate-100" />
              ))}
            </div>
          ) : leads.length === 0 ? (
            <div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-8 text-center text-xs text-slate-400 font-normal">
              No individual lead records available for this order.
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden sm:block overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
                <table className="w-full min-w-[650px] text-left text-xs">
                  <thead className="bg-[#f8fafc] text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="px-4 py-3">Client Name</th>
                      <th className="px-4 py-3">Contact Phone</th>
                      <th className="px-4 py-3">Demographics</th>
                      <th className="px-4 py-3">Calling Status (CRM)</th>
                      <th className="px-4 py-3 text-right">Quick Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {leads.map((lead) => {
                      const cleanPhone = getCleanPhone(lead.phone);
                      const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
                      const greeting = encodeURIComponent(
                        `Hello ${lead.fullName || ""}, I'm reaching out regarding your inquiry.`
                      );

                      return (
                        <tr key={lead._id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-4 py-3 font-medium text-slate-900 flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-[#eef7ee] text-[#0c4731] flex items-center justify-center shrink-0">
                              <User size={12} />
                            </div>
                            <span className="truncate max-w-[130px]">{lead.fullName}</span>
                          </td>
                          <td className="px-4 py-3 font-mono font-medium text-[#0c4731]">
                            {lead.phone}
                          </td>
                          <td className="px-4 py-3 font-normal">
                            {lead.gender || "-"} {lead.age ? `(${lead.age})` : ""}
                          </td>

                          {/* Mini-CRM Dropdown */}
                          <td className="px-4 py-3">
                            <div className="relative inline-block">
                              <select
                                value={lead.callStatus || "NEW"}
                                disabled={updatingId === lead._id}
                                onChange={(e) =>
                                  handleStatusChange(lead._id, e.target.value as LeadCallStatus)
                                }
                                className={`text-[11px] font-semibold rounded-lg px-2.5 py-1 border outline-none appearance-none cursor-pointer pr-6 shadow-2xs transition-all ${getStatusBadgeStyle(
                                  lead.callStatus
                                )}`}
                              >
                                {CALL_STATUS_OPTIONS.map((opt) => (
                                  <option key={opt.value} value={opt.value} className="bg-white text-slate-800">
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown
                                size={11}
                                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 opacity-60"
                              />
                            </div>
                          </td>

                          {/* Quick Actions */}
                          <td className="px-4 py-3 text-right">
                            <div className="inline-flex items-center justify-end gap-1.5">
                              <a
                                href={`https://wa.me/${waPhone}?text=${greeting}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-semibold border border-emerald-200/80 transition-all active:scale-95 shadow-2xs"
                                title="Chat on WhatsApp"
                              >
                                <svg className="w-3 h-3 fill-current text-emerald-600" viewBox="0 0 24 24">
                                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.983z" />
                                </svg>
                                <span>WhatsApp</span>
                              </a>

                              <a
                                href={`tel:${cleanPhone}`}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold border border-slate-200/80 transition-all active:scale-95 shadow-2xs"
                                title="Direct Phone Call"
                              >
                                <Phone size={11} className="text-slate-600" />
                                <span>Call</span>
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="block sm:hidden space-y-2.5">
                {leads.map((lead) => {
                  const cleanPhone = getCleanPhone(lead.phone);
                  const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
                  const greeting = encodeURIComponent(
                    `Hello ${lead.fullName || ""}, I'm reaching out regarding your inquiry.`
                  );

                  return (
                    <div
                      key={lead._id}
                      className="rounded-2xl border border-slate-100 bg-[#fbfdfb] p-3.5 space-y-2.5 text-xs font-normal shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                          <User size={13} className="text-[#0c4731]" />
                          {lead.fullName}
                        </span>
                        <span className="font-mono text-[#0c4731] text-[12px] font-medium">
                          {lead.phone}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>{lead.profession || "General Inquiry"}</span>
                        <span>{lead.gender || "-"} {lead.age ? `(${lead.age})` : ""}</span>
                      </div>

                      {/* Mobile Status Tracker */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-slate-500 font-medium">Call Status:</span>
                        <div className="relative">
                          <select
                            value={lead.callStatus || "NEW"}
                            disabled={updatingId === lead._id}
                            onChange={(e) =>
                              handleStatusChange(lead._id, e.target.value as LeadCallStatus)
                            }
                            className={`text-[11px] font-semibold rounded-lg px-2.5 py-1 border outline-none appearance-none cursor-pointer pr-6 ${getStatusBadgeStyle(
                              lead.callStatus
                            )}`}
                          >
                            {CALL_STATUS_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value} className="bg-white text-slate-800">
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={11}
                            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 opacity-60"
                          />
                        </div>
                      </div>

                      {/* Action Triggers */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                        <a
                          href={`https://wa.me/${waPhone}?text=${greeting}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 active:scale-95 text-emerald-800 text-xs font-semibold border border-emerald-200/80 transition-all"
                        >
                          <svg className="w-3.5 h-3.5 fill-current text-emerald-600" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.983z" />
                          </svg>
                          <span>WhatsApp</span>
                        </a>

                        <a
                          href={`tel:${cleanPhone}`}
                          className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 text-xs font-semibold border border-slate-200/80 transition-all"
                        >
                          <Phone size={13} className="text-slate-600" />
                          <span>Call</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}