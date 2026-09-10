"use client";

import { useState } from "react";
import { Download, Eye, Calendar, Layers, CheckCircle2, Clock, XCircle } from "lucide-react";
import { UserOrder } from "@/types/order";
import { downloadOrderCSVDirect } from "@/services/orderApi";

interface OrderTableProps {
  orders: UserOrder[];
  onViewOrder: (order: UserOrder) => void;
}

export default function OrderTable({
  orders,
  onViewOrder,
}: OrderTableProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (order: UserOrder) => {
    try {
      setDownloadingId(order._id);
      await downloadOrderCSVDirect(order._id, order.platform?.name || "leads");
    } catch (err) {
      alert("Failed to download CSV");
    } finally {
      setDownloadingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "Completed") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-normal bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 size={12} className="text-emerald-600" />
          Completed
        </span>
      );
    }
    if (status === "Pending") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-normal bg-amber-50 text-amber-700 border border-amber-200">
          <Clock size={12} className="text-amber-600" />
          Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-normal bg-red-50 text-red-700 border border-red-200">
        <XCircle size={12} className="text-red-600" />
        {status}
      </span>
    );
  };

  return (
    <>
      {/* ================= DESKTOP TABLE VIEW ================= */}
      <div className="hidden md:block overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-[#f8fafc] text-[11px] font-normal uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Platform</th>
                <th className="px-6 py-4">Volume</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {orders.map((order) => {
                const formattedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <tr key={order._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 font-mono font-normal text-slate-900">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 font-normal text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#eef7ee] text-[#0c4731] font-normal text-xs border border-[#d6ecd6]">
                          {order.platform?.name?.slice(0, 1) || "L"}
                        </div>
                        <span className="font-normal text-slate-800">{order.platform?.name || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-normal text-slate-600">
                      {order.quantity.toLocaleString("en-IN")} Leads
                    </td>
                    <td className="px-6 py-4 font-normal text-slate-900">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400 font-normal">
                      {formattedDate}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onViewOrder(order)}
                          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                          title="View Leads"
                        >
                          <Eye size={17} />
                        </button>

                        {order.status === "Completed" && (
                          <button
                            type="button"
                            disabled={downloadingId === order._id}
                            onClick={() => handleDownload(order)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-[#0c4731] hover:bg-[#083021] px-3.5 py-1.5 text-xs font-normal text-white transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                          >
                            <Download size={13} className="text-[#a3e635]" />
                            <span>{downloadingId === order._id ? "..." : "CSV"}</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MOBILE CARD LIST VIEW ================= */}
      <div className="block md:hidden space-y-3.5">
        {orders.map((order) => {
          const formattedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          return (
            <div
              key={order._id}
              className="rounded-[22px] border border-slate-200/80 bg-white p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] space-y-3.5"
            >
              {/* Top Row: Platform & Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef7ee] text-[#0c4731] font-normal text-xs border border-[#d6ecd6]">
                    {order.platform?.name?.slice(0, 1) || "L"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-normal text-slate-900 truncate">
                      {order.platform?.name || "Platform"}
                    </p>
                    <p className="font-mono text-[11px] text-slate-400 font-normal">
                      #{order._id.slice(-6).toUpperCase()}
                    </p>
                  </div>
                </div>

                <div>
                  {getStatusBadge(order.status)}
                </div>
              </div>

              {/* Middle Row: Quantity & Total Amount */}
              <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-50/80 p-2.5 border border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-normal block uppercase">Total Leads</span>
                  <span className="font-normal text-slate-800">{order.quantity} Leads</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-normal block uppercase">Price Paid</span>
                  <span className="font-normal text-slate-900">₹{order.totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <span className="text-[11px] text-slate-400 font-normal flex items-center gap-1">
                  <Calendar size={12} /> {formattedDate}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onViewOrder(order)}
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-normal text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Eye size={13} />
                    <span>View</span>
                  </button>

                  {order.status === "Completed" && (
                    <button
                      type="button"
                      disabled={downloadingId === order._id}
                      onClick={() => handleDownload(order)}
                      className="inline-flex items-center gap-1 rounded-xl bg-[#0c4731] px-3 py-1.5 text-xs font-normal text-white hover:bg-[#083021] transition-all disabled:opacity-50"
                    >
                      <Download size={13} className="text-[#a3e635]" />
                      <span>{downloadingId === order._id ? "..." : "CSV"}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}