"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Database } from "lucide-react";

export default function MarketplaceCTA() {
  return (
    <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 bg-[#fafcfb] overflow-hidden">
      
      {/* Background Subtle Line Grid */}
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

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Luxury Capsule Container (Forest Green Gradient Style) */}
        <div className="relative overflow-hidden rounded-[32px] sm:rounded-[36px] bg-gradient-to-br from-[#0c4731] via-[#093223] to-[#051a12] p-8 sm:p-12 md:p-14 text-white shadow-[0_20px_50px_rgba(12,71,49,0.35)] border border-emerald-800/60">
          
          {/* Subtle Ambient Glowing Orbs */}
          <div className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full bg-[#a3e635]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

          {/* Capsule Content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#a3e635] text-xs font-normal border border-white/10 backdrop-blur-md">
                <Sparkles size={13} />
                <span>Instant Turnaround Guaranteed</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-white leading-tight">
                Ready to test your first batch?
              </h2>

              <p className="text-xs sm:text-sm text-emerald-100/80 font-normal leading-relaxed">
                Choose your favorite platform, preview lead demographics, and export verified phone numbers immediately in clean CSV format.
              </p>

              {/* Mini Feature Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-emerald-200/70 font-normal">
                <span className="flex items-center gap-1.5">
                  <Database size={13} className="text-[#a3e635]" />
                  50k+ Live Inventory
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-[#a3e635]" />
                  Single-Buyer Lock
                </span>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="shrink-0 w-full sm:w-auto">
              <Link
                href="/marketplace"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#a3e635] hover:bg-[#b2f543] active:scale-95 text-slate-950 font-normal text-xs sm:text-sm transition-all duration-200 shadow-[0_8px_25px_rgba(163,230,53,0.35)] cursor-pointer"
              >
                <span>Explore Lead Packs</span>
                <ArrowRight size={15} />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}