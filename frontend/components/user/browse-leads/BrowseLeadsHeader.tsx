"use client";

import { Search, Sparkles } from "lucide-react";

interface BrowseLeadsHeaderProps {
  search?: string;
  setSearch?: (value: string) => void;
}

export default function BrowseLeadsHeader({
  search = "",
  setSearch,
}: BrowseLeadsHeaderProps) {
  return (
    <div className="pt-18 sm:pt-20 pb-2 space-y-6">
      
      {/* Title & Tagline Section */}
      <div>
        {/* Soft Lime-Green Accent Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#0c4731]" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            Verified Lead Marketplace
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-medium text-slate-900 tracking-tight leading-tight">
          Browse Lead Markets
        </h1>
        
        <p className="text-slate-500 mt-1.5 max-w-2xl text-xs sm:text-sm font-medium leading-relaxed">
          Select your target demographic, filter high-intent customer pools, and export active leads directly into CSV format.
        </p>
      </div>

      {/* Search Bar (Matching Input Design System) */}
      {setSearch && (
        <div className="relative max-w-xl">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search platforms (Instagram, Facebook, LinkedIn...)"
            className="w-full h-12 rounded-2xl border border-slate-200/80 bg-white pl-11 pr-4 text-xs sm:text-sm font-medium text-slate-900 outline-none transition-all duration-150 placeholder-slate-400 focus:border-[#0c4731] focus:ring-4 focus:ring-emerald-900/5 shadow-sm"
          />
        </div>
      )}

    </div>
  );
}