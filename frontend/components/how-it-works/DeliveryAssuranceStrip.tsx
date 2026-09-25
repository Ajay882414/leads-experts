"use client";

import React from "react";
import { Zap, ShieldCheck, RefreshCw, Clock } from "lucide-react";

export default function DeliveryAssuranceStrip() {
  const assurances = [
    {
      icon: Zap,
      metric: "< 30 Seconds",
      title: "Instant Download Speed",
      desc: "Zero waiting or manual processing. The verified CSV file generates and triggers instant download right inside your dashboard after checkout.",
      badge: "Real-Time",
    },
    {
      icon: ShieldCheck,
      metric: "100% Locked",
      title: "Single-Buyer Allocation",
      desc: "Strict anti-recycle protocol. Once you unlock a batch of leads, those exact records are permanently retired and never resold to any other user.",
      badge: "Zero Re-selling",
    },
    {
      icon: RefreshCw,
      metric: "Instant Credit",
      title: "Auto-Replacement Policy",
      desc: "Found dead or wrong contact numbers? Report within 24 hours directly from your order modal for seamless automated replacement lead balance.",
      badge: "100% Protected",
    },
  ];

  return (
    <section className="relative w-full py-14 sm:py-18 px-4 sm:px-6 bg-[#fafcfb] overflow-hidden border-b border-slate-100">
      
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

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] text-xs font-normal">
            <Clock size={13} className="text-[#0c4731]" />
            <span>Guaranteed Service Level</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-slate-900 tracking-tight">
            Delivery & Quality Assurances
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
            Every lead purchase on LeadsVero is backed by automated delivery pipelines and transparent consumer protection benchmarks.
          </p>
        </div>

        {/* 3-Pillar 3D Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {assurances.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative overflow-hidden rounded-[26px] bg-white border border-slate-200/90 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(12,71,49,0.08)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                {/* Upper Status Tag & Icon */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-11 w-11 rounded-2xl bg-[#0c4731] text-[#a3e635] flex items-center justify-center shadow-md">
                      <Icon size={20} className="stroke-[1.8]" />
                    </div>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#eef7ee] text-[#0c4731] font-normal border border-[#d6ecd6]">
                      {item.badge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-2xl sm:text-3xl font-normal text-slate-900 tracking-tight">
                      {item.metric}
                    </p>
                    <h3 className="text-sm sm:text-base font-normal text-slate-800">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 font-normal leading-relaxed pt-1">
                    {item.desc}
                  </p>
                </div>

                {/* Subtle Bottom Accent Indicator */}
                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400 font-normal">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
                  <span>Protocol Active 24/7</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}