"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Users,
  ShoppingBag,
  IndianRupee,
  Calendar,
  ChevronDown,
  ChevronUp,
  Mail,
  UserCheck,
} from "lucide-react";

interface SignedUpUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  platform: string;
  createdAt: string;
}

interface PurchasedUser {
  orderId: string;
  userId: string;
  name: string;
  email: string;
  mobile: string;
  platformName: string;
  quantity: number;
  amount: number;
  createdAt: string;
}

interface BreakdownItem {
  date: string;
  signupsCount: number;
  ordersCount: number;
  revenue: number;
  signedUpUsers: SignedUpUser[];
  purchasedUsers: PurchasedUser[];
}

interface DailyReportResponse {
  range: string;
  summary: {
    totalUsers: number;
    totalOrders: number;
    totalRevenue: number;
  };
  dailyBreakdown: BreakdownItem[];
}

const RANGES = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 Days", value: "7days" },
  { label: "Last 15 Days", value: "15days" },
  { label: "Last 1 Month", value: "1month" },
  { label: "Last 2 Months", value: "2months" },
  { label: "Last 3 Months", value: "3months" },
  { label: "Last 4 Months", value: "4months" },
  { label: "Last 5 Months", value: "5months" },
  { label: "Last 6 Months", value: "6months" },
  { label: "Last 7 Months", value: "7months" },
  { label: "Last 8 Months", value: "8months" },
  { label: "Last 9 Months", value: "9months" },
  { label: "Last 10 Months", value: "10months" },
  { label: "Last 11 Months", value: "11months" },
];

export default function AdminDailyReportsPage() {
  const [selectedRange, setSelectedRange] = useState("7days");
  const [data, setData] = useState<DailyReportResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedDates, setExpandedDates] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (date: string) => {
    setExpandedDates((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  const fetchDailyReports = useCallback(async (range: string) => {
    try {
      setLoading(true);
      setError(null);

      const rawBase = (process.env.NEXT_PUBLIC_API_URL || "").trim();
      const baseUrl = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;
      const cleanEndpoint = baseUrl.endsWith("/api")
        ? `${baseUrl}/admin/daily-reports?range=${range}`
        : `${baseUrl}/api/admin/daily-reports?range=${range}`;

      const res = await axios.get(cleanEndpoint, {
        withCredentials: true,
      });

      if (res.data?.success) {
        setData(res.data.data);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to load daily report data");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDailyReports(selectedRange);
  }, [selectedRange, fetchDailyReports]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Daily User & Sales Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            See exactly which users signed up and which users bought leads on any given day.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
            <Calendar className="h-4 w-4 text-slate-500" />
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-800 focus:outline-none cursor-pointer"
            >
              {RANGES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
          {error}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
              Total Signups
            </span>
            <h3 className="text-3xl font-black text-slate-900 mt-2">
              {loading ? "..." : (data?.summary.totalUsers ?? 0).toLocaleString()}
            </h3>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600">
            <Users className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
              Orders Completed
            </span>
            <h3 className="text-3xl font-black text-slate-900 mt-2">
              {loading ? "..." : (data?.summary.totalOrders ?? 0).toLocaleString()}
            </h3>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600">
            <ShoppingBag className="h-6 w-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
              Revenue Received
            </span>
            <h3 className="text-3xl font-black text-slate-900 mt-2">
              ₹{loading ? "..." : (data?.summary.totalRevenue ?? 0).toLocaleString("en-IN")}
            </h3>
          </div>
          <div className="p-3.5 rounded-2xl bg-purple-50 text-purple-600">
            <IndianRupee className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Daily Breakdown Accordion List */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-800">
          Daily Log (Click any date to see User Emails & Purchases)
        </h2>

        {loading ? (
          <div className="bg-white p-12 text-center text-slate-400 rounded-2xl border border-slate-100 font-medium">
            Loading daily intelligence metrics...
          </div>
        ) : !data?.dailyBreakdown || data.dailyBreakdown.length === 0 ? (
          <div className="bg-white p-12 text-center text-slate-400 rounded-2xl border border-slate-100 font-medium">
            No activity found for this timeframe.
          </div>
        ) : (
          data.dailyBreakdown.map((row) => {
            const isExpanded = !!expandedDates[row.date];

            return (
              <div
                key={row.date}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition"
              >
                {/* Accordion Summary Row */}
                <div
                  onClick={() => toggleExpand(row.date)}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                      {row.date}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      ({row.signupsCount} Signups • {row.ordersCount} Orders)
                    </span>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">New Users:</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                        +{row.signupsCount}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">Buyers:</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                        {row.purchasedUsers.length} Users
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">Total:</span>
                      <span className="text-sm font-black text-slate-900">
                        ₹{row.revenue.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="text-slate-400">
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details: Users who Signed Up vs Users who Purchased */}
                {isExpanded && (
                  <div className="border-t border-slate-100 p-5 bg-slate-50/50 space-y-6">
                    {/* 1. Purchased Users (High Priority) */}
                    <div>
                      <h4 className="text-xs font-black uppercase text-emerald-700 tracking-wider flex items-center gap-1.5 mb-3">
                        <ShoppingBag className="h-4 w-4" />
                        Users Who Purchased Leads on {row.date} ({row.purchasedUsers.length})
                      </h4>

                      {row.purchasedUsers.length === 0 ? (
                        <p className="text-xs text-slate-400 italic">No orders were placed on this day.</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {row.purchasedUsers.map((item) => (
                            <div
                              key={item.orderId}
                              className="bg-white p-3.5 rounded-xl border border-emerald-200/70 shadow-2xs space-y-1.5"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                  ₹{item.amount.toLocaleString("en-IN")}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                <Mail className="h-3.5 w-3.5 text-slate-400" />
                                <span className="font-medium select-all">{item.email}</span>
                              </div>
                              <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-50">
                                <span>Platform: {item.platformName}</span>
                                <span className="font-bold text-slate-700">{item.quantity} Leads</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 2. Signed Up Users */}
                    <div>
                      <h4 className="text-xs font-black uppercase text-blue-700 tracking-wider flex items-center gap-1.5 mb-3">
                        <UserCheck className="h-4 w-4" />
                        Users Who Signed Up on {row.date} ({row.signedUpUsers.length})
                      </h4>

                      {row.signedUpUsers.length === 0 ? (
                        <p className="text-xs text-slate-400 italic">No new registrations on this day.</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {row.signedUpUsers.map((u) => (
                            <div
                              key={u.id}
                              className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-1"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-900 text-sm">{u.name}</span>
                                <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                  {u.platform}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                <Mail className="h-3.5 w-3.5 text-slate-400" />
                                <span className="font-medium select-all">{u.email}</span>
                              </div>
                              <div className="text-[11px] text-slate-400 pt-1">
                                Mobile: {u.mobile}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}