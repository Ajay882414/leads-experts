"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown, Sparkles, ShieldCheck, CheckCircle2, TrendingUp, ArrowRight } from "lucide-react";

export default function WhyUsHero() {
  const scrollToProof = () => {
    const el = document.getElementById("proof-metrics");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[100vh] flex flex-col justify-between pt-36 sm:pt-44 md:pt-48 pb-10 overflow-hidden bg-white text-slate-900 border-b border-slate-100">
      
      {/* Subtle Line-Box Grid Background (Graph-Paper Style) */}
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

      {/* Soft Glow Radial Circles (Header ke peeche seamless backdrop glow) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-50/60 blur-3xl rounded-full pointer-events-none -z-1" />

      {/* ================= FLOATING 3D CREDIBILITY CARDS ================= */}

      {/* 1. Left Card: 0% Web Scraped Data */}
      <div className="hidden lg:block absolute left-4 xl:left-12 2xl:left-24 top-1/2 -translate-y-8 z-10 pointer-events-none transition-transform duration-300">
        <div className="w-36 h-36 bg-[#161c24] text-white p-4 rounded-2xl shadow-2xl border border-slate-800 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
          </div>
          <div>
            <h4 className="text-2xl font-normal tracking-tight text-white">0%</h4>
            <p className="text-[11px] text-slate-400 font-normal leading-tight">
              Scraped Web Data<br />100% Inbound
            </p>
          </div>
          <svg className="absolute -bottom-2 -right-2 w-20 h-20 text-slate-700/30" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M0,80 Q50,20 100,70" strokeWidth="2" />
            <path d="M10,95 Q50,40 100,90" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* 2. Right Top Card: Conversion Focus */}
      <div className="hidden lg:block absolute right-4 xl:right-14 2xl:right-24 top-24 xl:top-28 z-10 pointer-events-none transition-transform duration-300">
        <div className="w-36 h-36 bg-[#043d2b] text-white p-4 rounded-2xl shadow-2xl border border-emerald-800/80 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
          </div>
          <div>
            <h4 className="text-2xl font-normal tracking-tight text-white">3.4x</h4>
            <p className="text-[11px] text-emerald-200/90 font-normal leading-tight">
              Higher Connect<br />& Call Pickup Rate
            </p>
          </div>
          <svg className="absolute -bottom-2 -right-2 w-20 h-20 text-emerald-600/30" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M0,80 Q50,20 100,70" strokeWidth="2" />
            <path d="M10,95 Q50,40 100,90" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* 3. Right Bottom Card: Anti-Recycle Protection */}
      <div className="hidden lg:block absolute right-24 xl:right-48 2xl:right-64 bottom-24 z-10 pointer-events-none transition-transform duration-300">
        <div className="w-36 h-36 bg-[#102d25] text-white p-4 rounded-2xl shadow-2xl border border-teal-900/80 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
          </div>
          <div>
            <h4 className="text-2xl font-normal tracking-tight text-white">100%</h4>
            <p className="text-[11px] text-teal-200/90 font-normal leading-tight">
              Permanently Locked<br />Post-Purchase
            </p>
          </div>
          <svg className="absolute -bottom-2 -right-2 w-20 h-20 text-teal-600/30" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M0,80 Q50,20 100,70" strokeWidth="2" />
            <path d="M10,95 Q50,40 100,90" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* ================= FLOATING PLATFORM & INTENT ICONS ================= */}

      {/* Facebook (Top Left) */}
      <div className="hidden md:flex absolute left-[3%] lg:left-[6%] top-24 sm:top-28 z-10 pointer-events-none">
        <div className="w-11 h-11 lg:w-13 lg:h-13 rounded-2xl bg-blue-600 text-white shadow-lg flex items-center justify-center p-2.5">
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
      </div>

      

     

      

      {/* Verified Lead Badge (Bottom Right) */}
      <div className="hidden sm:flex absolute right-[5%] md:right-[8%] bottom-28 z-10 pointer-events-none">
        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-emerald-500 shadow-lg flex items-center justify-center text-white text-lg">
          ⚡
        </div>
      </div>

      {/* ================= HERO CENTER CONTENT ================= */}
      <div className="relative z-20 max-w-3xl lg:max-w-4xl mx-auto text-center px-4 sm:px-6 my-auto space-y-4 sm:space-y-6">
        
        {/* Credibility Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] text-xs font-normal">
          <Sparkles size={13} className="text-[#0c4731]" />
          <span>Real Buyer Intent Over Bulk Data</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-[58px] font-normal text-[#111827] tracking-tight leading-[1.2] sm:leading-[1.12]">
          We Don't Just Supply Data.{" "}
          <span className="inline-block bg-[#97df2c] text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded-xl sm:rounded-2xl shadow-sm transform -rotate-1 font-normal">
            We Deliver
          </span>{" "}
          High-Converting Customers.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Cold calling dead directories kills sales teams. We capture real-time intent from active social DMs, course inquiries, and B2B engagement so every call converts.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 sm:pt-4 flex flex-wrap items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={scrollToProof}
            className="inline-flex items-center gap-2 px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-[#1b4b3e] hover:bg-[#153c32] active:scale-95 text-white font-normal text-xs sm:text-sm md:text-base transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>Explore Verification Proof</span>
            <ArrowDown size={15} className="text-[#a3e635] animate-bounce" />
          </button>

          <Link
            href="/platforms"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-slate-100 hover:bg-slate-200/90 text-slate-800 font-normal text-xs sm:text-sm md:text-base transition-all duration-200 active:scale-95"
          >
            <span>Browse Available Leads</span>
            <ArrowRight size={14} className="text-[#0c4731]" />
          </Link>
        </div>
      </div>

      {/* ================= BOTTOM VERIFICATION STRIP ================= */}
      <div className="relative z-20 mt-8 w-full max-w-4xl mx-auto px-4">
        <div className="rounded-2xl bg-white/80 border border-slate-200/90 shadow-sm backdrop-blur-md p-3.5 sm:p-4 flex flex-wrap items-center justify-around gap-4 text-center">
          <div>
            <p className="text-base sm:text-xl font-normal text-slate-900 tracking-tight">Zero Scraping</p>
            <p className="text-[10px] sm:text-xs text-slate-500 font-normal">Human-Triggered Leads</p>
          </div>
          <div className="h-7 w-[1px] bg-slate-200 hidden sm:block" />
          <div>
            <p className="text-base sm:text-xl font-normal text-[#0c4731] tracking-tight">100% Unique</p>
            <p className="text-[10px] sm:text-xs text-slate-500 font-normal">Single-Buyer Lock</p>
          </div>
          <div className="h-7 w-[1px] bg-slate-200 hidden sm:block" />
          <div>
            <p className="text-base sm:text-xl font-normal text-slate-900 tracking-tight">Instant Credit</p>
            <p className="text-[10px] sm:text-xs text-slate-500 font-normal">Auto Replacement Guard</p>
          </div>
          <div className="h-7 w-[1px] bg-slate-200 hidden sm:block" />
          <div>
            <p className="text-base sm:text-xl font-normal text-[#0c4731] tracking-tight">Verified SIMs</p>
            <p className="text-[10px] sm:text-xs text-slate-500 font-normal">WhatsApp & Active Reach</p>
          </div>
        </div>
      </div>

    </section>
  );
}