"use client";

import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative w-full pt-36 sm:pt-44 md:pt-48 pb-14 px-4 sm:px-6 overflow-hidden bg-[#fafcfb] text-slate-900 border-b border-slate-100">
      {/* Background Line-Box Grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top Header Soft Glow */}
      <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[380px] bg-gradient-to-b from-[#eef7ee] via-emerald-100/30 to-transparent blur-3xl -z-1 rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] text-xs font-normal shadow-sm">
          <Sparkles size={13} className="text-[#0c4731]" />
          <span>The LeadsVero Mission &amp; Infrastructure</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-slate-900 leading-[1.15]">
          Pioneering High-Intent{" "}
          <span className="inline-block bg-[#97df2c] text-slate-950 px-3.5 py-0.5 rounded-xl shadow-sm transform -rotate-1 font-normal">
            Lead Delivery
          </span>{" "}
          For High-Growth Teams.
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
          We built LeadsVero to eliminate the single biggest bottleneck in modern sales outreach: dead, scraped, and recycled contact directories. We deliver single-buyer, verified social-intent leads that actually convert.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500 font-normal">
          <span className="flex items-center gap-1.5 text-slate-800">
            <CheckCircle2 size={15} className="text-[#0c4731]" /> 100% Single-Buyer Lock
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-slate-800">
            <CheckCircle2 size={15} className="text-[#0c4731]" /> Zero Shared Directories
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-slate-800">
            <CheckCircle2 size={15} className="text-[#0c4731]" /> Direct CSV Downloads
          </span>
        </div>
      </div>
    </section>
  );
}