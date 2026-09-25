"use client";

import React from "react";
import { TrendingUp } from "lucide-react";

export default function AboutMilestones() {
  const milestones = [
    { value: "50,000+", label: "Verified Leads Dispatched", sub: "Across India Tier-1 & Tier-2" },
    { value: "10,000+", label: "Active Marketers & Agencies", sub: "Relying on our data engine" },
    { value: "99.4%", label: "Average Call Connect Rate", sub: "Far superior to scraped web data" },
    { value: "120+", label: "Targeted Audience Niches", sub: "From Real Estate to Gen-Z Learners" },
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 px-4 sm:px-6 bg-[#fafcfb] overflow-hidden border-b border-slate-100">
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

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="rounded-[32px] bg-gradient-to-br from-[#0c4731] via-[#08291d] to-[#04120d] text-white p-8 sm:p-12 md:p-14 border border-emerald-800/70 shadow-[0_20px_50px_rgba(12,71,49,0.3)] relative overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[#a3e635]/15 blur-3xl" />

          <div className="relative z-10 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-[#a3e635] text-xs font-normal border border-white/10">
                <TrendingUp size={13} />
                <span>Our Impact &amp; Footprint</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white tracking-tight">
                Trusted by Marketers, Closers &amp; Telecalling Units
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/80 font-normal leading-relaxed">
                Measurable results delivered directly to businesses across finance, education, real estate, and consumer tech.
              </p>
            </div>

            {/* 4 Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
              {milestones.map((m, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm space-y-1">
                  <p className="text-3xl sm:text-4xl font-normal text-[#a3e635] tracking-tight font-mono">
                    {m.value}
                  </p>
                  <p className="text-sm font-normal text-white pt-1">
                    {m.label}
                  </p>
                  <p className="text-[11px] text-emerald-200/70 font-normal">
                    {m.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}