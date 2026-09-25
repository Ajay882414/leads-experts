"use client";

import React from "react";
import Link from "next/link";
import { Globe, ArrowRight } from "lucide-react";

export default function AboutCTA() {
  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 bg-[#fafcfb] overflow-hidden">
      {/* Background Line-Box Grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="rounded-[28px] bg-white border border-slate-200/90 p-8 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.03)] text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] text-xs font-normal">
            <Globe size={13} className="text-[#0c4731]" />
            <span>Ready to scale your outreach pipeline?</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-slate-900 tracking-tight">
            Stop Dialing Dead Lists. Get Live Leads Today.
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-xl mx-auto leading-relaxed">
            Browse our verified packages across Instagram, LinkedIn, Facebook, and YouTube. Instant download, unmasked phone numbers, and full replacement protection.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/platforms"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0c4731] hover:bg-[#083021] text-white text-xs sm:text-sm font-normal shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <span>Explore Marketplace Packs</span>
              <ArrowRight size={15} className="text-[#a3e635]" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200/90 text-slate-800 text-xs sm:text-sm font-normal active:scale-95 transition-all"
            >
              <span>Talk to Sourcing Team</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}