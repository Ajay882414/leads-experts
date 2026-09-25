"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  RefreshCw,
  PhoneCall,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";

export default function DataGuaranteeCard() {
  const pillars = [
    {
      icon: Lock,
      title: "Anti-Recycle Protocol",
      highlight: "100% Single-Buyer Lock",
      desc: "Jab aap koi lead batch purchase karte hain, wo records platform se instantly aur permanently retire ho jaate hain. Hum purane ya shared leads kisi doosre buyer ko kabhi nahi bechte.",
      tag: "Permanent Archive",
    },
    {
      icon: PhoneCall,
      title: "Active Line Verification",
      highlight: "Live WhatsApp & Dialing Reach",
      desc: "Her ek lead database me add hone se pehle active telecom line status aur WhatsApp availability check pass karti hai, taaki calling campaigns me zero dead connections milein.",
      tag: "Verified SIMs",
    },
    {
      icon: RefreshCw,
      title: "Auto Replacement Credit",
      highlight: "Instant 24-Hour Policy",
      desc: "Agar aapko koi invalid, disconnected ya out-of-service number milta hai, toh aap dashboard me 1-click replacement request daal sakte hain. Equivalent lead credit automated add ho jaata hai.",
      tag: "Zero-Risk Guard",
    },
  ];

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 bg-[#fafcfb] overflow-hidden border-b border-slate-100">
      {/* Background Subtle Line Grid */}
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

      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] text-xs font-normal">
            <ShieldCheck size={14} className="text-[#0c4731]" />
            <span>Buyer Protection Guarantee</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-normal text-slate-900 tracking-tight leading-tight">
            Our Triple-Shield Lead Quality Guarantee
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
            Lead business me trust sabse important hai. Hum har batch ke sath 3 transparent guarantees dete hain taaki aapka acquisition ROI hamesha protected rahe.
          </p>
        </div>

        {/* ================= 3-PILLAR 3D CARDS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-[28px] bg-white border border-slate-200/90 p-7 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(12,71,49,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Subtle Hover Accent Light */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#a3e635] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-2xl bg-[#0c4731] text-[#a3e635] flex items-center justify-center shadow-md">
                      <Icon size={22} className="stroke-[1.8]" />
                    </div>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#eef7ee] text-[#0c4731] font-normal border border-[#d6ecd6]">
                      {item.tag}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-normal text-[#0c4731] tracking-wide uppercase">
                      {item.highlight}
                    </span>
                    <h3 className="text-lg sm:text-xl font-normal text-slate-900 tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400 font-normal">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Verified Platform SLA</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= BOTTOM CERTIFICATE SLAB (PREMIUM FINISH) ================= */}
        <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-[#0c4731] via-[#08281c] to-[#04120d] p-7 sm:p-10 text-white shadow-[0_20px_45px_rgba(12,71,49,0.3)] border border-emerald-800/70">
          {/* Subtle Ambient Radial Glow */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[#a3e635]/15 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-[#a3e635] text-xs font-normal border border-white/10">
                <BadgeCheck size={14} />
                <span>Zero Risk Policy</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-normal text-white tracking-tight">
                Worried about bad leads? We&apos;ve got your back.
              </h4>
              <p className="text-xs sm:text-sm text-emerald-100/80 font-normal leading-relaxed">
                Her verified lead package me direct replacement support aur dedicated account assistance include rehti hai. No questions asked replacement within 24 hours.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/marketplace"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#a3e635] hover:bg-[#b2f543] active:scale-95 text-slate-950 font-normal text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                <span>Browse Guaranteed Packs</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}