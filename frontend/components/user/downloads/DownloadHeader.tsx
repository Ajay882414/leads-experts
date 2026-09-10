"use client";

import { DownloadCloud, Search, Sparkles } from "lucide-react";

interface DownloadHeaderProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function DownloadHeader({ search, setSearch }: DownloadHeaderProps) {
  return (
    <div className="pt-20 sm:pt-24 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Title Area */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#0c4731]" />
            <span className="text-[11px] sm:text-xs font-normal uppercase tracking-wider">
              Instant Lead Exports
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-normal text-slate-900 tracking-tight leading-tight">
            My Downloads
          </h1>

          <p className="text-slate-500 mt-1 max-w-xl text-xs sm:text-sm font-normal leading-relaxed">
            Download verified unique leads directly in CSV format for all your completed orders.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by platform..."
            className="w-full h-11 sm:h-12 rounded-2xl border border-slate-200/80 bg-white pl-10 pr-4 text-xs sm:text-sm font-normal text-slate-900 outline-none transition-all focus:border-[#0c4731] focus:ring-4 focus:ring-emerald-900/5 shadow-sm placeholder-slate-400"
          />
        </div>
      </div>
    </div>
  );
}