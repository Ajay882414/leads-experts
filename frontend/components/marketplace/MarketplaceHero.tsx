"use client";

import { Sparkles, Search, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

interface MarketplaceHeroProps {
  search: string;
  setSearch: (val: string) => void;
}

export default function MarketplaceHero({ search, setSearch }: MarketplaceHeroProps) {
  return (
    <section className="relative overflow-hidden  bg-gradient-to-b from-[#092219] via-[#071912] to-[#040e0a] p-6 sm:p-12 text-white border border-emerald-950/80 shadow-2xl">
      {/* Background Soft Glows */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full bg-[#a3e635]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
        {/* Verification Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/40 border border-emerald-500/30 text-[#a3e635] text-xs font-normal backdrop-blur-sm shadow-inner">
          <Sparkles size={13} />
          <span>100% Verified & Direct CSV Downloads</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-tight">
          Targeted Lead Channels For High-Ticket Conversions
        </h1>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
          Select verified audience pools filtered directly from active DMs, comments, and buyer intent triggers across India.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto pt-2">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search platform (Instagram, LinkedIn, YouTube, Facebook)..."
            className="w-full h-12 sm:h-13 rounded-2xl bg-white/10 border border-white/15 pl-11 pr-4 text-xs sm:text-sm font-normal text-white placeholder-slate-400 outline-none focus:border-[#a3e635] focus:bg-white/15 focus:ring-4 focus:ring-[#a3e635]/10 transition-all backdrop-blur-md"
          />
        </div>

        {/* Trust Badges */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400 font-normal">
          <span className="flex items-center gap-1.5 text-emerald-300">
            <CheckCircle2 size={14} className="text-[#a3e635]" /> Instant Delivery
          </span>
          <span className="flex items-center gap-1.5 text-emerald-300">
            <ShieldCheck size={14} className="text-[#a3e635]" /> Single-Buyer Guaranteed
          </span>
          <span className="flex items-center gap-1.5 text-emerald-300">
            <Zap size={14} className="text-[#a3e635]" /> Fresh Active Data
          </span>
        </div>
      </div>
    </section>
  );
}