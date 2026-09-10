"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { AlertCircle, ShoppingBag, ArrowRight, RefreshCw, Sparkles } from "lucide-react";

import OrderHeader from "@/components/user/orders/OrderHeader";
import OrderTable from "@/components/user/orders/OrderTable";
import OrderDetailsModal from "@/components/user/orders/OrderDetailsModal";
import { getMyOrders } from "@/services/orderApi";
import { UserOrder } from "@/types/order";

export default function OrdersPage() {
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<UserOrder | null>(null);

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getMyOrders();
      setOrders(response.orders || []);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Failed to load orders. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const filteredOrders = orders.filter((order) => {
    const platformName = order.platform?.name?.toLowerCase() || "";
    const orderId = order._id.toLowerCase();
    const matchesSearch =
      platformName.includes(search.trim().toLowerCase()) ||
      orderId.includes(search.trim().toLowerCase());

    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="relative w-full max-w-7xl mx-auto space-y-6 pt-2 sm:pt-4 pb-14">
      {/* Background Soft Glow Ambient Accents */}
      <div className="pointer-events-none absolute -top-12 right-0 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="pointer-events-none absolute top-48 left-6 h-72 w-72 rounded-full bg-[#a3e635]/5 blur-3xl" />

      {/* Header with Search & Filter */}
      <OrderHeader
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Error Notice */}
      {error && (
        <div className="flex items-start gap-3 rounded-[22px] border border-red-200/80 bg-red-50/90 p-4 text-xs sm:text-sm text-red-800 shadow-sm backdrop-blur-sm">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
          <div className="flex-1 leading-relaxed">
            <p className="font-normal text-red-900">Something went wrong</p>
            <p className="mt-0.5 text-red-700 font-normal">{error}</p>
          </div>
          <button
            type="button"
            onClick={loadOrders}
            className="inline-flex items-center gap-1.5 font-normal text-red-900 underline hover:no-underline cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Loading Skeletons */}
      {loading && (
        <div className="space-y-3.5 pt-2">
          <div className="h-14 w-full animate-pulse rounded-[22px] bg-slate-200/60 border border-slate-100" />
          <div className="h-20 w-full animate-pulse rounded-[24px] bg-slate-200/50 border border-slate-100" />
          <div className="h-20 w-full animate-pulse rounded-[24px] bg-slate-200/50 border border-slate-100" />
          <div className="h-20 w-full animate-pulse rounded-[24px] bg-slate-200/50 border border-slate-100" />
        </div>
      )}

      {/* Orders Table Container */}
      {!loading && filteredOrders.length > 0 && (
        <OrderTable
          orders={filteredOrders}
          onViewOrder={(order) => setSelectedOrder(order)}
        />
      )}

      {/* Empty State Card */}
      {!loading && filteredOrders.length === 0 && !error && (
        <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white px-6 py-16 text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          {/* Subtle Ambient background in empty card */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-50/80 to-transparent" />
          
          <div className="relative z-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eef7ee] text-[#0c4731] border border-[#d6ecd6] shadow-inner">
              <ShoppingBag size={26} className="stroke-[1.8]" />
            </div>

            <h2 className="mt-4 text-lg sm:text-xl font-normal text-slate-900 tracking-tight">
              {search || statusFilter ? "No Matching Orders Found" : "No Orders Placed Yet"}
            </h2>

            <p className="mx-auto mt-1.5 max-w-sm text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
              {search || statusFilter
                ? "Try checking your spelling or clear the active filter to view your transactions."
                : "You have not placed any lead orders yet. Explore our verified platforms to get started."}
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              {(search || statusFilter) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("");
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-normal text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
                >
                  Clear Filters
                </button>
              )}

              <Link
                href="/browse-leads"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0c4731] hover:bg-[#083021] active:scale-95 px-5 py-2.5 text-xs sm:text-sm font-normal text-white transition-all shadow-sm shadow-emerald-950/10 cursor-pointer"
              >
                <span>Browse Leads</span>
                <ArrowRight size={15} className="text-[#a3e635]" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Leads Inspection Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}