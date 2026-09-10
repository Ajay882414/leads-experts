"use client";

import { useState, useEffect } from "react";
import { X, Download, User, Sparkles, CheckCircle2, Phone, Briefcase } from "lucide-react";
import { UserOrder, PurchasedLeadItem } from "@/types/order";
import { fetchOrderLeads, downloadOrderCSVDirect } from "@/services/orderApi";

interface OrderDetailsModalProps {
  order: UserOrder | null;
  onClose: () => void;
}

export default function OrderDetailsModal({
  order,
  onClose,
}: OrderDetailsModalProps) {
  const [leads, setLeads] = useState<PurchasedLeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4 transition-all duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl overflow-hidden rounded-t-[32px] sm:rounded-[28px] bg-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 sm:px-7 py-4 sm:py-5 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0c4731] text-[#a3e635] font-normal text-xs shadow-inner">
              {order.platform?.name?.slice(0, 2).toUpperCase() || "LE"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-normal text-slate-900 tracking-tight leading-none">
                  Order #{order._id.slice(-8).toUpperCase()}
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#eef7ee] text-[#0c4731] border border-[#d6ecd6] text-[10px] font-normal px-2 py-0.5 uppercase tracking-wider">
                  <Sparkles size={10} /> Verified Leads
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500 font-normal">
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
            <h3 className="font-normal text-xs sm:text-sm text-slate-800">
              Allocated Client Records ({leads.length})
            </h3>
            <button
              type="button"
              disabled={downloading || leads.length === 0}
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0c4731] hover:bg-[#083021] active:scale-95 px-3.5 py-1.5 text-xs font-normal text-white disabled:bg-slate-200 disabled:text-slate-400 transition-all cursor-pointer shadow-sm"
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
              {/* Desktop Modal Table */}
              <div className="hidden sm:block overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
                <table className="w-full min-w-[550px] text-left text-xs">
                  <thead className="bg-[#f8fafc] text-slate-500 uppercase font-normal text-[10px] tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="px-4 py-3">Client Name</th>
                      <th className="px-4 py-3">Contact Phone</th>
                      <th className="px-4 py-3">Demographics</th>
                      <th className="px-4 py-3">Profession</th>
                      <th className="px-4 py-3">Acquisition Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {leads.map((lead) => (
                      <tr key={lead._id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-4 py-3 font-normal text-slate-900 flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-[#eef7ee] text-[#0c4731] flex items-center justify-center shrink-0">
                            <User size={12} />
                          </div>
                          <span>{lead.fullName}</span>
                        </td>
                        <td className="px-4 py-3 font-mono font-normal text-[#0c4731]">
                          {lead.phone}
                        </td>
                        <td className="px-4 py-3 font-normal">
                          {lead.gender || "-"} {lead.age ? `(${lead.age})` : ""}
                        </td>
                        <td className="px-4 py-3 font-normal">{lead.profession || "-"}</td>
                        <td className="px-4 py-3 font-normal">{lead.source || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Lead Cards */}
              <div className="block sm:hidden space-y-2.5">
                {leads.map((lead) => (
                  <div
                    key={lead._id}
                    className="rounded-xl border border-slate-100 bg-[#fbfdfb] p-3 space-y-1.5 text-xs font-normal"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-normal text-slate-900 flex items-center gap-1.5">
                        <User size={13} className="text-[#0c4731]" />
                        {lead.fullName}
                      </span>
                      <span className="font-mono text-[#0c4731] text-[11px] font-normal">
                        {lead.phone}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                      <span>{lead.profession || "General Inquiry"}</span>
                      <span>{lead.source || "Organic"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}