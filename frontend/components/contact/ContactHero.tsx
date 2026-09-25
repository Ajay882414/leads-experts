"use client";

import React from "react";
import { ArrowDown, Sparkles, MessageSquare, Clock, ShieldCheck, Zap } from "lucide-react";

export default function ContactHero() {
  const scrollToForm = () => {
    const el = document.getElementById("contact-form");
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

      {/* ================= FLOATING 3D ENTERPRISE SUPPORT CARDS ================= */}

      {/* 1. Left Card: < 15 Min Response SLA */}
      <div className="hidden lg:block absolute left-4 xl:left-12 2xl:left-24 top-1/2 -translate-y-8 z-10 pointer-events-none transition-transform duration-300">
        <div className="w-36 h-36 bg-[#161c24] text-white p-4 rounded-2xl shadow-2xl border border-slate-800 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
          </div>
          <div>
            <h4 className="text-2xl font-normal tracking-tight text-white">&lt; 15m</h4>
            <p className="text-[11px] text-slate-400 font-normal leading-tight">
              Average WhatsApp<br />Response Time
            </p>
          </div>
          <svg className="absolute -bottom-2 -right-2 w-20 h-20 text-slate-700/30" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M0,80 Q50,20 100,70" strokeWidth="2" />
            <path d="M10,95 Q50,40 100,90" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* 2. Right Top Card: Custom Volume 10k+ */}
      <div className="hidden lg:block absolute right-4 xl:right-14 2xl:right-24 top-24 xl:top-28 z-10 pointer-events-none transition-transform duration-300">
        <div className="w-36 h-36 bg-[#043d2b] text-white p-4 rounded-2xl shadow-2xl border border-emerald-800/80 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
          </div>
          <div>
            <h4 className="text-2xl font-normal tracking-tight text-white">10k+</h4>
            <p className="text-[11px] text-emerald-200/90 font-normal leading-tight">
              Custom Filtered<br />Bulk Orders Ready
            </p>
          </div>
          <svg className="absolute -bottom-2 -right-2 w-20 h-20 text-emerald-600/30" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M0,80 Q50,20 100,70" strokeWidth="2" />
            <path d="M10,95 Q50,40 100,90" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* 3. Right Bottom Card: Dedicated Account Manager */}
      <div className="hidden lg:block absolute right-24 xl:right-48 2xl:right-64 bottom-24 z-10 pointer-events-none transition-transform duration-300">
        <div className="w-36 h-36 bg-[#102d25] text-white p-4 rounded-2xl shadow-2xl border border-teal-900/80 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
          </div>
          <div>
            <h4 className="text-2xl font-normal tracking-tight text-white">1-on-1</h4>
            <p className="text-[11px] text-teal-200/90 font-normal leading-tight">
              Dedicated Support<br />Manager Assigned
            </p>
          </div>
          <svg className="absolute -bottom-2 -right-2 w-20 h-20 text-teal-600/30" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M0,80 Q50,20 100,70" strokeWidth="2" />
            <path d="M10,95 Q50,40 100,90" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* ================= FLOATING APP ICONS ================= */}

      {/* Facebook (Top Left) */}
      <div className="hidden md:flex absolute left-[3%] lg:left-[6%] top-24 sm:top-28 z-10 pointer-events-none">
        <div className="w-11 h-11 lg:w-13 lg:h-13 rounded-2xl bg-blue-600 text-white shadow-lg flex items-center justify-center p-2.5">
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
      </div>

      {/* Google Ads (Bottom Left) */}
      <div className="hidden sm:flex absolute left-[6%] md:left-[10%] lg:left-[12%] bottom-28 z-10 pointer-events-none">
        <div className="w-11 h-11 lg:w-13 lg:h-13 rounded-2xl bg-white border border-slate-200 shadow-md flex items-center justify-center font-normal text-[#4285F4] text-base">
          G
        </div>
      </div>

      {/* Central Platform: Instagram 3D Badge (Bottom Center) */}
      <div className="absolute left-[50%] -translate-x-1/2 bottom-20 sm:bottom-4 z-10 pointer-events-none">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] via-[#d62976] to-[#962fbf] shadow-xl flex items-center justify-center p-3 text-white">
          <svg className="w-full h-full fill-white" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </div>
      </div>

      {/* YouTube Leads (Mid Right) */}
      <div className="hidden sm:flex absolute right-[4%] md:right-[12%] lg:right-[15%] top-[50%] z-10 pointer-events-none">
        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-[#FF0000] shadow-lg flex items-center justify-center font-normal text-xs text-white">
          YT
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
        
        {/* Contact Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] text-xs font-normal">
          <Sparkles size={13} className="text-[#0c4731]" />
          <span>Priority Bulk Inquiries & Enterprise Support</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-[58px] font-normal text-[#111827] tracking-tight leading-[1.2] sm:leading-[1.12]">
          Talk to Our Lead{" "}
          <span className="inline-block bg-[#97df2c] text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded-xl sm:rounded-2xl shadow-sm transform -rotate-1 font-normal">
            Sourcing
          </span>{" "}
          Experts.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-600 max-w-xl mx-auto font-normal leading-relaxed">
          Need 10,000+ custom demographics, specific city filters, or assistance with your existing lead package? We respond within minutes.
        </p>

        {/* Quick Action CTA Buttons */}
        <div className="pt-2 sm:pt-4 flex flex-wrap items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-[#1b4b3e] hover:bg-[#153c32] active:scale-95 text-white font-normal text-xs sm:text-sm md:text-base transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            <span>Send Direct Inquiry</span>
            <ArrowDown size={15} className="text-[#a3e635] animate-bounce" />
          </button>

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-slate-100 hover:bg-slate-200/90 text-slate-800 font-normal text-xs sm:text-sm md:text-base transition-all duration-200 active:scale-95"
          >
            <MessageSquare size={15} className="text-[#25D366]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* ================= BOTTOM VERIFICATION STRIP ================= */}
      <div className="relative z-20 mt-8 w-full max-w-4xl mx-auto px-4">
        <div className="rounded-2xl bg-white/80 border border-slate-200/90 shadow-sm backdrop-blur-md p-3.5 sm:p-4 flex flex-wrap items-center justify-around gap-4 text-center">
          <div>
            <p className="text-base sm:text-xl font-normal text-slate-900 tracking-tight">&lt; 15 Mins</p>
            <p className="text-[10px] sm:text-xs text-slate-500 font-normal">WhatsApp Response</p>
          </div>
          <div className="h-7 w-[1px] bg-slate-200 hidden sm:block" />
          <div>
            <p className="text-base sm:text-xl font-normal text-[#0c4731] tracking-tight">10k+ Leads</p>
            <p className="text-[10px] sm:text-xs text-slate-500 font-normal">Custom Bulk Orders</p>
          </div>
          <div className="h-7 w-[1px] bg-slate-200 hidden sm:block" />
          <div>
            <p className="text-base sm:text-xl font-normal text-slate-900 tracking-tight">Direct Support</p>
            <p className="text-[10px] sm:text-xs text-slate-500 font-normal">No Automated Bots</p>
          </div>
          <div className="h-7 w-[1px] bg-slate-200 hidden sm:block" />
          <div>
            <p className="text-base sm:text-xl font-normal text-[#0c4731] tracking-tight">Daily 9 AM - 9 PM</p>
            <p className="text-[10px] sm:text-xs text-slate-500 font-normal">Active Desk Hours</p>
          </div>
        </div>
      </div>

    </section>
  );
}