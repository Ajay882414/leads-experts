"use client";

import React from "react";
import { Lock, CheckCircle2, Zap, RefreshCw, Award } from "lucide-react";

export default function AboutValuePillars() {
  const coreValues = [
    {
      icon: Lock,
      title: "Single-Buyer Allocation",
      tag: "Zero Reselling",
      desc: "Hum purane leads recycle nahi karte. Jab aap koi batch khareedte hain, wo data platform se instantly retire hokar hamesha ke liye lock ho jaata hai.",
    },
    {
      icon: CheckCircle2,
      title: "Active Telecom Verification",
      tag: "Verified SIMs",
      desc: "Her single contact line automated dial checks aur WhatsApp activity filters pass karne ke baad hi catalog me list hota hai.",
    },
    {
      icon: Zap,
      title: "Instant Digital Delivery",
      tag: "< 30s CSV",
      desc: "Manual delays ko eliminate karke checkout ke sath hi instant CSV export provide kiya jaata hai jo har CRM aur telecaller dialer me fit hota hai.",
    },
    {
      icon: RefreshCw,
      title: "24-Hour Replacement SLA",
      tag: "Zero-Risk Guard",
      desc: "Agar kisi batch me dead ya disconnected contact nikalta hai, toh hamara automated resolution engine 24 ghante ke andar replacement credit unlock karta hai.",
    },
  ];

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 bg-[#fafcfb] overflow-hidden border-b border-slate-100">
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

      <div className="relative z-10 max-w-6xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] text-xs font-normal">
            <Award size={13} className="text-[#0c4731]" />
            <span>Our Quality Foundations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-slate-900 tracking-tight">
            How We Guarantee Lead Integrity
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
            Four rigid operational principles guide every CSV file processed on the LeadsVero marketplace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {coreValues.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group rounded-[26px] bg-white border border-slate-200/90 p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(12,71,49,0.06)] hover:-translate-y-1 transition-all duration-200"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-11 w-11 rounded-2xl bg-[#0c4731] text-[#a3e635] flex items-center justify-center shadow-md">
                      <Icon size={20} className="stroke-[1.8]" />
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#eef7ee] text-[#0c4731] font-normal border border-[#d6ecd6]">
                      {item.tag}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-normal text-slate-900 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-400 font-normal">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
                  <span>Enforced by Platform SLA</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}