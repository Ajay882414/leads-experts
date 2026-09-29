"use client";

import React from "react";
import { ArrowDown, Sparkles, HelpCircle } from "lucide-react";

export default function HowItWorksHero() {
  const scrollToProcess = () => {
    const el = document.getElementById("process-steps");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[100vh] flex flex-col justify-between pt-36 sm:pt-44 md:pt-48 pb-10 overflow-hidden bg-white text-slate-900 border-b border-slate-100">
      
      {/* Subtle Line-Box Grid Background (No Dots) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.45]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Soft Glow Radial Circles */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-50/60 blur-3xl rounded-full pointer-events-none -z-1" />

      {/* ================= FLOATING 3D METRIC CARDS ================= */}

      {/* 1. Left Card: 4 Simple Steps */}
      <div className="hidden lg:block absolute left-4 xl:left-12 2xl:left-24 top-1/2 -translate-y-8 z-10 pointer-events-none transition-transform duration-300">
        <div className="w-36 h-36 bg-[#161c24] text-white p-4 rounded-2xl shadow-2xl border border-slate-800 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
          </div>
          <div>
            <h4 className="text-2xl font-normal tracking-tight text-white">4 Steps</h4>
            <p className="text-[11px] text-slate-400 font-normal leading-tight">
              From Niche Filter<br />To Live CSV
            </p>
          </div>
          <svg className="absolute -bottom-2 -right-2 w-20 h-20 text-slate-700/30" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M0,80 Q50,20 100,70" strokeWidth="2" />
            <path d="M10,95 Q50,40 100,90" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* 2. Right Top Card: 100% Single Buyer Verified */}
      <div className="hidden lg:block absolute right-4 xl:right-14 2xl:right-24 top-24 xl:top-28 z-10 pointer-events-none transition-transform duration-300">
        <div className="w-36 h-36 bg-[#043d2b] text-white p-4 rounded-2xl shadow-2xl border border-emerald-800/80 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
          </div>
          <div>
            <h4 className="text-2xl font-normal tracking-tight text-white">100%</h4>
            <p className="text-[11px] text-emerald-200/90 font-normal leading-tight">
              Single-Buyer<br />Exclusive Lock
            </p>
          </div>
          <svg className="absolute -bottom-2 -right-2 w-20 h-20 text-emerald-600/30" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M0,80 Q50,20 100,70" strokeWidth="2" />
            <path d="M10,95 Q50,40 100,90" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* 3. Right Bottom Card: 24h SLA */}
      <div className="hidden lg:block absolute right-24 xl:right-48 2xl:right-64 bottom-24 z-10 pointer-events-none transition-transform duration-300">
        <div className="w-36 h-36 bg-[#102d25] text-white p-4 rounded-2xl shadow-2xl border border-teal-900/80 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
          </div>
          <div>
            <h4 className="text-2xl font-normal tracking-tight text-white">24h SLA</h4>
            <p className="text-[11px] text-teal-200/90 font-normal leading-tight">
              Defective Record<br />Replacement
            </p>
          </div>
          <svg className="absolute -bottom-2 -right-2 w-20 h-20 text-teal-600/30" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M0,80 Q50,20 100,70" strokeWidth="2" />
            <path d="M10,95 Q50,40 100,90" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* ================= HERO CENTER CONTENT ================= */}
      <div className="relative z-20 max-w-3xl lg:max-w-3xl mx-auto text-center px-4 sm:px-6 my-auto space-y-4 sm:space-y-6">
        
        {/* Page Flow Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] text-xs font-normal">
          <Sparkles size={13} className="text-[#0c4731]" />
          <span>The Acquisition Engine Architecture</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-[58px] font-normal text-[#111827] tracking-tight leading-[1.2] sm:leading-[1.12]">
          How LeadsVero Delivers{" "}
          <span className="inline-block bg-[#97df2c] text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded-xl sm:rounded-2xl shadow-sm transform -rotate-1 font-normal">
            Verified Buyers.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-600 max-w-xl mx-auto font-normal leading-relaxed">
          Understand how our dynamic filtering, Single-Buyer anti-resell lock, and instant dashboard unlocks guarantee clean closing pipelines.
        </p>

        {/* Quick Scroll CTA */}
        <div className="pt-2 sm:pt-4 flex items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={scrollToProcess}
            className="inline-flex items-center gap-2 px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-[#1b4b3e] hover:bg-[#153c32] active:scale-95 text-white font-normal text-xs sm:text-sm md:text-base transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>See Step-by-Step Flow</span>
            <ArrowDown size={15} className="text-[#a3e635] animate-bounce" />
          </button>
        </div>
      </div>

      {/* ================= BOTTOM VERIFICATION STRIP ================= */}
      <div className="relative z-20 mt-8 w-full max-w-4xl mx-auto px-4">
        <div className="rounded-2xl bg-white/80 border border-slate-200/90 shadow-sm backdrop-blur-md p-3.5 sm:p-4 flex flex-wrap items-center justify-around gap-4 text-center">
          <div>
            <p className="text-base sm:text-xl font-normal text-slate-900 tracking-tight">Step 1</p>
            <p className="text-[10px] sm:text-xs text-slate-500 font-normal">Select Platform</p>
          </div>
          <div className="h-7 w-[1px] bg-slate-200 hidden sm:block" />
          <div>
            <p className="text-base sm:text-xl font-normal text-[#0c4731] tracking-tight">Step 2</p>
            <p className="text-[10px] sm:text-xs text-slate-500 font-normal">Choose Lead Count</p>
          </div>
          <div className="h-7 w-[1px] bg-slate-200 hidden sm:block" />
          <div>
            <p className="text-base sm:text-xl font-normal text-slate-900 tracking-tight">Step 3</p>
            <p className="text-[10px] sm:text-xs text-slate-500 font-normal">1-Click Checkout</p>
          </div>
          <div className="h-7 w-[1px] bg-slate-200 hidden sm:block" />
          <div>
            <p className="text-base sm:text-xl font-normal text-[#0c4731] tracking-tight">Step 4</p>
            <p className="text-[10px] sm:text-xs text-slate-500 font-normal">Instant CSV Export</p>
          </div>
        </div>
      </div>

    </section>
  );
}