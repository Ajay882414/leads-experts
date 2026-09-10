"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Inbox,
} from "lucide-react";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "orders" | "system">("all");
  const [subscribed, setSubscribed] = useState(false);

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
          Live stream of lead orders, newly unlocked inventory, and account security updates.
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
            All Activity
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
            Pool Alerts
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

      {/* ================= MAIN INTERACTIVE FEED CARD ================= */}
      <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-8 sm:p-14 text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        {/* Subtle upper ambient gradient */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-slate-50/70 to-transparent" />

        <div className="relative z-10 max-w-md mx-auto space-y-4">
          {/* Animated Glowing Notification Bell Wrapper */}
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#eef7ee] text-[#0c4731] border border-[#d6ecd6] shadow-inner">
            <Bell size={32} className="stroke-[1.6]" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#a3e635] text-[10px] text-slate-950 font-normal shadow-sm">
              0
            </span>
          </div>

          <div className="space-y-1.5 pt-1">
            <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
              You are all caught up!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
              No pending unread alerts. Real-time updates for downloaded CSV batches and replenished platform leads will stream right here.
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

      {/* Activity Preview Stream / Mock Feed (Makes it feel active, not an under-construction dead-end) */}
      <div className="rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-normal uppercase tracking-wider text-slate-500">
            System Event Protocols
          </span>
          <span className="text-[11px] font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
            Automated
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 border border-slate-100 text-xs font-normal">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-8 w-8 rounded-xl bg-[#eef7ee] text-[#0c4731] flex items-center justify-center shrink-0">
                <ShoppingBag size={15} />
              </div>
              <div className="min-w-0">
                <p className="text-slate-800 truncate">Lead Delivery Webhook</p>
                <p className="text-[11px] text-slate-400">Triggers immediate CSV packaging upon payment</p>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 shrink-0 pl-2">Active</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 border border-slate-100 text-xs font-normal">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-8 w-8 rounded-xl bg-[#eef7ee] text-[#0c4731] flex items-center justify-center shrink-0">
                <ShieldCheck size={15} />
              </div>
              <div className="min-w-0">
                <p className="text-slate-800 truncate">Account Verification Guard</p>
                <p className="text-[11px] text-slate-400">Monitors suspicious login attempts and access tokens</p>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 shrink-0 pl-2">Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
}