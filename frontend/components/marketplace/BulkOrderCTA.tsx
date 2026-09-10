"use client";

import Link from "next/link";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";

export default function BulkOrderCTA() {
  return (
    <section className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-[#092219] via-[#0c3525] to-[#081f16] p-7 sm:p-10 text-white border border-emerald-900/50 shadow-xl">
      {/* Background Accent */}
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#a3e635]/10 blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#a3e635] text-xs font-normal border border-white/10">
            <Sparkles size={12} />
            <span>High Volume Enterprise Sourcing</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-white">
            Need 10,000+ Custom Qualified Leads?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-xl leading-relaxed">
            Get targeted demographic filters, custom states, or API webhook feeds tailored directly to your telecalling agency.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#a3e635] text-slate-950 hover:bg-[#b2f244] active:scale-95 px-6 py-3 text-xs sm:text-sm font-normal transition-all shadow-md"
          >
            <span>Request Custom Batch</span>
            <ArrowRight size={15} />
          </Link>

          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-white/5 hover:bg-white/10 active:scale-95 px-5 py-3 text-xs sm:text-sm font-normal text-white transition-all"
          >
            <MessageSquare size={14} className="text-[#a3e635]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}