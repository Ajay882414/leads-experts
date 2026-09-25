"use client";

import React from "react";
import { MessageSquare, Mail, PhoneCall, Zap, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export default function PriorityChannelsStrip() {
  const channels = [
    {
      icon: MessageSquare,
      title: "Direct WhatsApp Line",
      badge: "Instant Active",
      actionText: "Chat on WhatsApp",
      actionHref: "https://wa.me/919999999999?text=Hello%20LeadsVero,%20I%20need%20custom%20leads%20information",
      value: "+91 99999 •••••",
      subtext: "Best for quick platform inquiries, payment proof, or instant custom quotas.",
      theme: "lime",
    },
    {
      icon: Mail,
      title: "Enterprise Desk & CSV Feed",
      badge: "Replies in 1 Hour",
      actionText: "Email Sourcing Team",
      actionHref: "mailto:support@leadsvero.com?subject=Bulk%20Lead%20Inquiry",
      value: "support@leadsvero.com",
      subtext: "For contract billing, API webhooks, and 10k+ volume agency agreements.",
      theme: "green",
    },
    {
      icon: PhoneCall,
      title: "Telecaller Escalation Line",
      badge: "Mon - Sat 9am to 9pm",
      actionText: "Request Call Back",
      actionHref: "#contact-form",
      value: "Priority Voice Desk",
      subtext: "Direct voice consultation to map targeted audience niches to your campaign goals.",
      theme: "light",
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
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] text-xs font-normal">
            <Zap size={13} className="text-[#0c4731]" />
            <span>Fast-Track Response Channels</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-slate-900 tracking-tight">
            Urgent Requirement or Order Assistance?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
            Reach out directly through any of our priority desks. Real sourcing managers handle your requests without automated chat loops.
          </p>
        </div>

        {/* 3 Channels Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {channels.map((ch, idx) => {
            const Icon = ch.icon;

            if (ch.theme === "lime") {
              return (
                <div
                  key={idx}
                  className="rounded-[28px] bg-gradient-to-br from-[#bef264] via-[#a3e635] to-[#84cc16] text-slate-950 p-6 sm:p-7 flex flex-col justify-between border-t border-white/60 border-b-4 border-b-[#65a30d] shadow-[0_12px_30px_rgba(163,230,53,0.3)] transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-11 w-11 rounded-2xl bg-slate-950 text-[#a3e635] flex items-center justify-center shadow-md">
                        <Icon size={20} />
                      </div>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-black/10 text-slate-900 font-normal">
                        {ch.badge}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-normal text-slate-950">{ch.title}</h3>
                      <p className="text-sm font-mono font-normal text-slate-900">{ch.value}</p>
                    </div>

                    <p className="text-xs text-slate-800 font-normal leading-relaxed">
                      {ch.subtext}
                    </p>
                  </div>

                  <div className="pt-6">
                    <a
                      href={ch.actionHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-slate-950 text-white text-xs font-normal shadow-sm hover:bg-slate-900 active:scale-95 transition-all"
                    >
                      <span>{ch.actionText}</span>
                      <ArrowRight size={13} className="text-[#a3e635]" />
                    </a>
                  </div>
                </div>
              );
            }

            if (ch.theme === "green") {
              return (
                <div
                  key={idx}
                  className="rounded-[28px] bg-gradient-to-br from-[#0e3b2a] via-[#092219] to-[#05140e] text-white p-6 sm:p-7 flex flex-col justify-between border-t border-emerald-400/30 border-b-4 border-b-[#030d09] shadow-[0_12px_30px_rgba(12,71,49,0.3)] transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-11 w-11 rounded-2xl bg-white/10 text-[#a3e635] border border-white/10 flex items-center justify-center shadow-md">
                        <Icon size={20} />
                      </div>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-200 font-normal">
                        {ch.badge}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-normal text-white">{ch.title}</h3>
                      <p className="text-sm font-mono font-normal text-emerald-300">{ch.value}</p>
                    </div>

                    <p className="text-xs text-emerald-100/75 font-normal leading-relaxed">
                      {ch.subtext}
                    </p>
                  </div>

                  <div className="pt-6">
                    <a
                      href={ch.actionHref}
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-white text-slate-950 text-xs font-normal shadow-sm hover:bg-slate-100 active:scale-95 transition-all"
                    >
                      <span>{ch.actionText}</span>
                      <ArrowRight size={13} className="text-[#0c4731]" />
                    </a>
                  </div>
                </div>
              );
            }

            // Light Theme
            return (
              <div
                key={idx}
                className="rounded-[28px] bg-white text-slate-900 p-6 sm:p-7 flex flex-col justify-between border border-slate-200/90 border-b-4 border-b-slate-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-11 w-11 rounded-2xl bg-[#eef7ee] text-[#0c4731] flex items-center justify-center shadow-sm">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-normal">
                      {ch.badge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-normal text-slate-900">{ch.title}</h3>
                    <p className="text-sm font-normal text-slate-700">{ch.value}</p>
                  </div>

                  <p className="text-xs text-slate-500 font-normal leading-relaxed">
                    {ch.subtext}
                  </p>
                </div>

                <div className="pt-6">
                  <a
                    href={ch.actionHref}
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#0c4731] text-white text-xs font-normal shadow-sm hover:bg-[#083021] active:scale-95 transition-all"
                  >
                    <span>{ch.actionText}</span>
                    <ArrowRight size={13} className="text-[#a3e635]" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}