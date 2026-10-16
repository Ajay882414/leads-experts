"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import {
  Bell,
  Sparkles,
  ArrowRight,
  Zap,
  ShoppingBag,
  Layers,
  Package,
  Calendar,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface NotificationItem {
  _id: string;
  title: string;
  message: string;
  type: "User" | "Lead" | "Platform" | "Package" | "Order" | "System";
  target: "admin" | "user" | "all";
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "orders" | "system">("all");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [subscribed, setSubscribed] = useState<boolean>(false);

  // Fetch real notifications from backend
  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const rawBase = (process.env.NEXT_PUBLIC_API_URL || "").trim();
      const baseUrl = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;
      const cleanEndpoint = baseUrl.endsWith("/api")
        ? `${baseUrl}/notifications`
        : `${baseUrl}/api/notifications`;

      const res = await axios.get(cleanEndpoint, {
        withCredentials: true,
      });

      if (res.data?.success) {
        setNotifications(res.data.notifications || []);
        setUnreadCount(res.data.unreadCount || 0);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Tab Filtering Logic
  const filteredNotifications = notifications.filter((item) => {
    if (activeTab === "orders") {
      return item.type === "Order";
    }
    if (activeTab === "system") {
      return item.type === "Platform" || item.type === "Package" || item.type === "Lead";
    }
    return true; // 'all'
  });

  // Type helper for badge styling & icons
  const getTypeMeta = (type: NotificationItem["type"]) => {
    switch (type) {
      case "Platform":
        return {
          icon: <Layers size={16} className="text-blue-600" />,
          bgColor: "bg-blue-50 text-blue-700 border-blue-100",
          tag: "Platform Launch",
        };
      case "Package":
        return {
          icon: <Package size={16} className="text-emerald-600" />,
          bgColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
          tag: "New Leads Card",
        };
      case "Lead":
        return {
          icon: <Sparkles size={16} className="text-amber-600" />,
          bgColor: "bg-amber-50 text-amber-700 border-amber-100",
          tag: "Stock Restock",
        };
      case "Order":
        return {
          icon: <ShoppingBag size={16} className="text-purple-600" />,
          bgColor: "bg-purple-50 text-purple-700 border-purple-100",
          tag: "Order Update",
        };
      default:
        return {
          icon: <Bell size={16} className="text-slate-600" />,
          bgColor: "bg-slate-50 text-slate-700 border-slate-200",
          tag: "System Alert",
        };
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto space-y-6 pt-2 sm:pt-4 pb-14">
      {/* Background Soft Glow Ambience */}
      <div className="pointer-events-none absolute -top-12 right-0 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="pointer-events-none absolute top-48 left-6 h-72 w-72 rounded-full bg-[#a3e635]/5 blur-3xl" />

      {/* Page Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#0c4731]" />
          <span className="text-[11px] sm:text-xs font-normal uppercase tracking-wider">
            Real-Time Feed
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-slate-900 tracking-tight leading-tight">
          Notifications & Activity
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-normal max-w-xl">
          Live stream of new platforms, replenished inventory, and lead order updates.
        </p>
      </div>

      {/* Control Tabs & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/70 pb-4">
        {/* Segmented Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`rounded-xl px-4 py-2 text-xs font-normal transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-[#0c4731] text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            All Activity ({notifications.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`rounded-xl px-4 py-2 text-xs font-normal transition-all cursor-pointer ${
              activeTab === "orders"
                ? "bg-[#0c4731] text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            Order Updates
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("system")}
            className={`rounded-xl px-4 py-2 text-xs font-normal transition-all cursor-pointer ${
              activeTab === "system"
                ? "bg-[#0c4731] text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            Pool & Platform Alerts
          </button>
        </div>

        {/* Live Feed Status Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[11px] text-slate-500 font-normal">
            Feed Connected & Syncing
          </span>
        </div>
      </div>

      {/* ================= DYNAMIC NOTIFICATION LIST OR EMPTY STATE ================= */}
      {loading ? (
        <div className="rounded-[28px] border border-slate-200/80 bg-white p-12 text-center text-slate-400 font-normal">
          Loading notifications...
        </div>
      ) : filteredNotifications.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifications.map((item) => {
            const meta = getTypeMeta(item.type);
            const formattedDate = new Date(item.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={item._id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    {/* Icon wrapper */}
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 shadow-2xs">
                      {meta.icon}
                    </div>

                    {/* Content */}
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">
                          {item.title}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${meta.bgColor}`}
                        >
                          {meta.tag}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {item.message}
                      </p>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0 whitespace-nowrap">
                    <Clock size={12} />
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-8 sm:p-14 text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-slate-50/70 to-transparent" />

          <div className="relative z-10 max-w-md mx-auto space-y-4">
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#eef7ee] text-[#0c4731] border border-[#d6ecd6] shadow-inner">
              <Bell size={32} className="stroke-[1.6]" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#a3e635] text-[10px] text-slate-900 font-bold shadow-sm">
                {unreadCount}
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                You are all caught up!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                No alerts right now. Whenever a new platform is introduced or inventory cards are added, they will appear here instantly.
              </p>
            </div>

            {/* Quick Enable Toggle Box */}
            <div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4 text-left flex items-center justify-between gap-4 mt-4">
              <div className="space-y-0.5 min-w-0">
                <span className="text-xs font-normal text-slate-900 flex items-center gap-1.5">
                  <Zap size={14} className="text-[#0c4731]" /> Instant Browser Alerts
                </span>
                <p className="text-[11px] text-slate-400 font-normal truncate">
                  Notify instantly when fresh leads match your criteria
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSubscribed(!subscribed)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-normal transition-all cursor-pointer shrink-0 ${
                  subscribed
                    ? "bg-[#eef7ee] text-[#0c4731] border border-[#d6ecd6]"
                    : "bg-[#0c4731] text-white hover:bg-[#083021]"
                }`}
              >
                {subscribed ? "Enabled" : "Enable"}
              </button>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/browse-leads"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0c4731] hover:bg-[#083021] active:scale-95 px-5 py-2.5 text-xs sm:text-sm font-normal text-white transition-all shadow-sm"
              >
                <span>Explore Leads Market</span>
                <ArrowRight size={14} className="text-[#a3e635]" />
              </Link>

              <Link
                href="/settings"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-normal text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
              >
                Configure Alerts
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}