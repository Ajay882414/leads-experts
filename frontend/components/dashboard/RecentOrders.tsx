"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, Download, CheckCircle2 } from "lucide-react";
import { UserOrder } from "@/types/order";
import { downloadOrderCSVDirect } from "@/services/orderApi";

interface RecentOrdersProps {
  orders: UserOrder[];
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  const handleDownload = async (e: React.MouseEvent, order: UserOrder) => {
    e.preventDefault();
    try {
      await downloadOrderCSVDirect(order._id, order.platform?.name || "leads");
    } catch {
      alert("Failed to export leads.");
    }
  };

  if (!orders.length) {
    return (
      <div className="rounded-[28px] border border-slate-100 bg-white p-8 sm:p-12 text-center shadow-sm">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
          <ShoppingBag size={26} />
        </div>
        <p className="text-sm sm:text-base font-bold text-slate-800">
          No recent orders
        </p>
        <p className="mt-1 text-xs text-slate-400 max-w-xs mx-auto">
          Purchased leads will appear here. Start exploring our lead pools.
        </p>
        <Link
          href="/browse-leads"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0c4731] hover:bg-[#093625] px-5 py-2.5 text-xs font-bold text-white transition-all active:scale-95 shadow-sm"
        >
          Browse Leads <ArrowRight size={14} className="text-[#a3e635]" />
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-sm">
      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 sm:px-7 py-5">
        <div>
          <h3 className="text-base sm:text-lg font-medium font-black tracking-tight text-slate-900">
            Recent Purchases
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Your latest order transactions
          </p>
        </div>
        <Link
          href="/orders"
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0c4731] hover:text-slate-900 transition-colors"
        >
          <span>View All</span>
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5 text-[#0c4731]"
          />
        </Link>
      </div>

      {/* Orders List */}
      <div className="divide-y divide-slate-100">
        {orders.slice(0, 5).map((order) => {
          const formattedDate = new Date(order.createdAt).toLocaleDateString(
            "en-IN",
            { day: "numeric", month: "short" }
          );

          return (
            <div
              key={order._id}
              className="flex items-center justify-between p-4 sm:p-5 px-5 sm:px-7 hover:bg-slate-50/70 transition-colors"
            >
              {/* Left Item Details */}
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Platform Pill Badge (Soft Gray-Green instead of Blue) */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eef7ee] font-black text-[#0c4731] text-xs shadow-inner border border-[#d6ecd6]">
                  {order.platform?.name?.slice(0, 2).toUpperCase() || "LE"}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                      {order.platform?.name} Leads
                    </h4>
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">
                    {order.quantity} leads • {formattedDate}
                  </p>
                </div>
              </div>

              {/* Right: Amount & Download CTA */}
              <div className="flex items-center gap-3 sm:gap-4 shrink-0 pl-2">
                <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
                  ₹{order.totalAmount.toLocaleString("en-IN")}
                </span>

                <button
                  type="button"
                  onClick={(e) => handleDownload(e, order)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 hover:bg-[#0c4731] text-slate-600 hover:text-white border border-slate-200/80 transition-all duration-150 active:scale-90"
                  title="Download CSV"
                >
                  <Download size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}