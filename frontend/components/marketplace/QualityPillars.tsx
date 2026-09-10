"use client";

import { ShieldCheck, RefreshCw, Layers } from "lucide-react";

export default function QualityPillars() {
  const pillars = [
    {
      icon: Layers,
      title: "Single-Buyer Allocation",
      desc: "Once you purchase a lead batch, those records are permanently locked and never resold to any other buyer.",
    },
    {
      icon: ShieldCheck,
      title: "OTP & Status Verification",
      desc: "Phone numbers pass automated line checks to ensure WhatsApp availability and active telecall reach.",
    },
    {
      icon: RefreshCw,
      title: "Replacement Guarantee",
      desc: "Found dead or wrong contacts? Request an automatic replacement or refund credit from your order modal.",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {pillars.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef7ee] text-[#0c4731] border border-[#d6ecd6]">
              <Icon size={20} className="stroke-[1.8]" />
            </div>
            <h4 className="text-base font-normal text-slate-900 tracking-tight">
              {item.title}
            </h4>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              {item.desc}
            </p>
          </div>
        );
      })}
    </section>
  );
}