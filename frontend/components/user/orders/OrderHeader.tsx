"use client";

import { ShoppingBag, Search, Sparkles, SlidersHorizontal } from "lucide-react";

interface OrderHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

export default function OrderHeader({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}: OrderHeaderProps) {
  return (
    <div className="pt-20 sm:pt-22 space-y-6">
      {/* Title & Tagline */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#0c4731]" />
          <span className="text-[11px] sm:text-xs font-normal uppercase tracking-wider">
            Transaction History
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-normal text-slate-900 tracking-tight leading-tight">
          My Orders
        </h1>

        <p className="text-slate-500 mt-1 max-w-xl text-xs sm:text-sm font-normal leading-relaxed">
          Track verified lead acquisitions, inspect customer contact records, and download active CSV batches.
        </p>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Platform name or Order ID..."
            className="w-full h-11 sm:h-12 rounded-2xl border border-slate-200/80 bg-white pl-10 pr-4 text-xs sm:text-sm font-normal text-slate-900 outline-none transition-all focus:border-[#0c4731] focus:ring-4 focus:ring-emerald-900/5 shadow-sm placeholder-slate-400"
          />
        </div>

        {/* Status Dropdown Filter */}
        <div className="relative shrink-0 w-full sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 sm:h-12 w-full rounded-2xl border border-slate-200/80 bg-white px-4 text-xs sm:text-sm font-normal text-slate-700 outline-none transition-all focus:border-[#0c4731] focus:ring-4 focus:ring-emerald-900/5 shadow-sm cursor-pointer appearance-none pr-9"
          >
            <option value="">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <SlidersHorizontal size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}