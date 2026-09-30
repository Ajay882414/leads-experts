"use client";

import { useEffect, useState } from "react";
import {
  CreditCard,
  Search,
  RefreshCw,
  CheckCircle2,
  Clock,
  XCircle,
  IndianRupee,
} from "lucide-react";
import { getAllPaymentsAdmin, PaymentItem } from "@/services/adminPaymentApi";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await getAllPaymentsAdmin();
      setPayments(res.payments || []);
    } catch (error) {
      console.error("Failed to fetch admin payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Filter logic: Search by user name, email, order ID ya payment ID
  const filteredPayments = payments.filter((item) => {
    const matchesSearch =
      item.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      item.razorpayOrderId?.toLowerCase().includes(search.toLowerCase()) ||
      item.razorpayPaymentId?.toLowerCase().includes(search.toLowerCase()) ||
      item.package?.name?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalRevenue = payments
    .filter((p) => p.status === "SUCCESS")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const successfulTxns = payments.filter((p) => p.status === "SUCCESS").length;

  return (
    <div className="space-y-6 p-6">
      {/* Page Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <CreditCard className="text-emerald-700" size={26} />
            Payment Transactions
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-time Razorpay payments received for lead packages.
          </p>
        </div>

        <button
          onClick={fetchPayments}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Analytics Mini-Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Total Revenue
          </p>
          <p className="text-2xl font-black text-slate-900 mt-1 flex items-center">
            <IndianRupee size={20} className="mr-0.5" />
            {totalRevenue.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Successful Orders
          </p>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {successfulTxns}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Total Transactions
          </p>
          <p className="text-2xl font-black text-slate-700 mt-1">
            {payments.length}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search by user, email, payment ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {["ALL", "SUCCESS", "PENDING", "FAILED"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                statusFilter === status
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="p-4">User</th>
                <th className="p-4">Package</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Razorpay Payment ID</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    Loading payments data...
                  </td>
                </tr>
              ) : filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No payment transactions found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/60 transition">
                    <td className="p-4 font-semibold text-slate-800">
                      <div>{item.user?.name || "Unknown"}</div>
                      <div className="text-[11px] text-slate-400 font-normal">
                        {item.user?.email}
                      </div>
                    </td>
                    <td className="p-4 text-slate-700">
                      <span className="font-semibold">{item.package?.name}</span>
                      <span className="block text-[10px] text-slate-400">
                        {item.platform?.name}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-700">
                      {item.quantity} leads
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="p-4 font-mono text-[11px] text-slate-600">
                      {item.razorpayPaymentId || "—"}
                    </td>
                    <td className="p-4">
                      {item.status === "SUCCESS" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                          <CheckCircle2 size={12} /> Success
                        </span>
                      )}
                      {item.status === "PENDING" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700 border border-amber-200">
                          <Clock size={12} /> Pending
                        </span>
                      )}
                      {item.status === "FAILED" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-700 border border-red-200">
                          <XCircle size={12} /> Failed
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}