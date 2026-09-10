"use client";

import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-between pt-36 sm:pt-44 md:pt-48 pb-10 overflow-hidden bg-white">
      {/* Subtle Background Grid Line System */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-grid-exact opacity-65" />

      {/* Soft Glow Radial Circles */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-50/60 blur-3xl rounded-full pointer-events-none -z-1" />

      {/* ================= FLOATING STAT CARDS ================= */}

      {/* 1. Left Card: 50k+ Verified Leads */}
      <div className="hidden lg:block absolute left-4 xl:left-12 2xl:left-24 top-1/2 -translate-y-8 z-10 anim-float-1 pointer-events-none">
        <div className="w-36 h-36 bg-[#161c24] text-white p-4 rounded-2xl shadow-2xl border border-slate-800 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
          </div>
          <div>
            <h4 className="text-2xl font-black tracking-tight">50k+</h4>
            <p className="text-[11px] text-slate-400 font-medium leading-tight">Fresh Leads<br />Generated</p>
          </div>
          <svg className="absolute -bottom-2 -right-2 w-20 h-20 text-slate-700/30" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M0,80 Q50,20 100,70" strokeWidth="2" />
            <path d="M10,95 Q50,40 100,90" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* 2. Right Top Card: 99.4% Delivery Rate */}
      <div className="hidden lg:block absolute right-4 xl:right-14 2xl:right-24 top-24 xl:top-28 z-10 anim-float-2 pointer-events-none">
        <div className="w-36 h-36 bg-[#043d2b] text-white p-4 rounded-2xl shadow-2xl border border-emerald-800/80 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
          </div>
          <div>
            <h4 className="text-2xl font-black tracking-tight">99.4%</h4>
            <p className="text-[11px] text-emerald-200/90 font-medium leading-tight">Verified Buyer<br />Conversion</p>
          </div>
          <svg className="absolute -bottom-2 -right-2 w-20 h-20 text-emerald-600/30" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M0,80 Q50,20 100,70" strokeWidth="2" />
            <path d="M10,95 Q50,40 100,90" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* 3. Right Bottom Card: 120+ Active Niches */}
      <div className="hidden lg:block absolute right-24 xl:right-48 2xl:right-64 bottom-24 z-10 anim-float-3 pointer-events-none">
        <div className="w-36 h-36 bg-[#102d25] text-white p-4 rounded-2xl shadow-2xl border border-teal-900/80 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
          </div>
          <div>
            <h4 className="text-2xl font-black tracking-tight">120+</h4>
            <p className="text-[11px] text-teal-200/90 font-medium leading-tight">Targeted Target<br />Categories</p>
          </div>
          <svg className="absolute -bottom-2 -right-2 w-20 h-20 text-teal-600/30" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <path d="M0,80 Q50,20 100,70" strokeWidth="2" />
            <path d="M10,95 Q50,40 100,90" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* ================= FLOATING PLATFORM / LEAD SOURCE ICONS ================= */}

      {/* 1. Meta / Facebook Lead Icon (Top Left) */}
      <div className="hidden md:flex absolute left-[3%] lg:left-[6%] top-24 sm:top-28 z-10 anim-float-3 pointer-events-none">
        <div className="w-11 h-11 lg:w-13 lg:h-13 rounded-2xl bg-blue-600 text-white app-icon-shadow flex items-center justify-center p-2.5">
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
      </div>

      {/* 2. LinkedIn (Mid Top Left) */}
      <div className="hidden md:flex absolute left-[15%] lg:left-[19%] top-20 sm:top-24 z-10 anim-float-4 pointer-events-none">
        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-[#0a66c2] text-white app-icon-shadow flex items-center justify-center font-bold text-sm">
          in
        </div>
      </div>

      {/* 3. WhatsApp Leads (Mid Left) */}
      <div className="hidden sm:flex absolute left-[4%] md:left-[14%] lg:left-[18%] top-[52%] z-10 anim-float-2 pointer-events-none">
        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-[#25D366] text-white app-icon-shadow flex items-center justify-center p-2 font-bold text-xs">
          WA
        </div>
      </div>

      {/* 4. Google Ads (Bottom Left) */}
      <div className="hidden sm:flex absolute left-[6%] md:left-[10%] lg:left-[12%] bottom-28 z-10 anim-float-1 pointer-events-none">
        <div className="w-11 h-11 lg:w-13 lg:h-13 rounded-2xl bg-white border border-slate-200 app-icon-shadow flex items-center justify-center font-black text-[#4285F4] text-base">
          G
        </div>
      </div>

      {/* 5. Central Platform: Instagram 3D Badge (Bottom Center) */}
      <div className="absolute left-[50%] -translate-x-1/2 bottom-20 sm:bottom-24 z-10 anim-float-3 pointer-events-none">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] via-[#d62976] to-[#962fbf] app-icon-shadow flex items-center justify-center p-3 text-white">
          <svg className="w-full h-full fill-white" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </div>
      </div>

      {/* 6. Instagram Alternate Icon (Top Right) */}
      <div className="hidden md:flex absolute right-[18%] lg:right-[22%] top-20 z-10 anim-float-1 pointer-events-none">
        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-[#E1306C] app-icon-shadow flex items-center justify-center text-white font-bold text-xs">
          IG
        </div>
      </div>

      {/* 7. YouTube Leads (Mid Right) */}
      <div className="hidden sm:flex absolute right-[4%] md:right-[12%] lg:right-[15%] top-[50%] z-10 anim-float-4 pointer-events-none">
        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-[#FF0000] text-white app-icon-shadow flex items-center justify-center font-bold text-xs">
          YT
        </div>
      </div>

      {/* 8. Verified Lead Badge (Bottom Right) */}
      <div className="hidden sm:flex absolute right-[5%] md:right-[8%] bottom-28 z-10 anim-float-2 pointer-events-none">
        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-emerald-500 app-icon-shadow flex items-center justify-center text-white text-lg">
          ⚡
        </div>
      </div>

      {/* ================= HERO CENTER CONTENT ================= */}
      <div className="relative z-20 max-w-3xl lg:max-w-3xl mx-auto text-center px-4 sm:px-6 my-auto">
        <h1 className="text-3xl sm:text-5xl md:text-[62px] font-medium text-[#111827] tracking-tight leading-[1.2] sm:leading-[1.12]">
           Buy Real{" "}
          <span className="inline-block bg-[#97df2c] text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded-xl sm:rounded-2xl shadow-sm transform -rotate-1">
            Leads.
          </span>{" "}
          Grow Your Business.
        </h1>

       


        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-600 max-w-xl mx-auto font-normal leading-relaxed">
          Select targeted platforms like Instagram, Facebook & LinkedIn. <br className="hidden sm:inline" />
          Get instant, verified buyers and scale your revenue with ease.
        </p>

        {/* Global Action CTA Buttons */}
        <div className="mt-7 sm:mt-9 flex items-center justify-center gap-3.5">
          <Link
            href="/packages"
            className="px-7 sm:px-9 py-2.5 sm:py-3.5 rounded-full bg-[#1b4b3e] hover:bg-[#153c32] text-white font-semibold text-xs sm:text-sm md:text-base transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          >
            Explore Lead Packages
          </Link>
          <Link
            href="/register"
            className="px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-slate-200/90 hover:bg-slate-300 text-slate-800 font-semibold text-xs sm:text-sm md:text-base transition-all duration-200 active:scale-95"
          >
            Get Started Free
          </Link>
        </div>
      </div>

      {/* ================= TRUSTED NETWORKS & MEDIA STRIP ================= */}
      <div className="relative z-20 mt-14 w-full max-w-5xl mx-auto px-4 text-center">
        <p className="text-[11px] sm:text-xs font-bold text-slate-800 tracking-wide mb-5">
          Trusted By 10,000+ Marketers, Agencies & Media Networks
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-9 md:gap-12 opacity-65 grayscale hover:grayscale-0 transition-all duration-300">
          <span className="font-extrabold text-xs sm:text-sm tracking-wider text-slate-700">META ADS</span>
          <span className="font-bold text-xs sm:text-sm tracking-wider text-slate-700">GOOGLE LEADS</span>
          <span className="font-black text-sm sm:text-base tracking-tight text-slate-800 font-serif">mid-day</span>
          <span className="font-bold text-[10px] sm:text-xs tracking-tighter text-white bg-slate-800 px-2 py-0.5 rounded">ZEENEWS</span>
          <span className="font-bold text-[10px] sm:text-xs tracking-tighter text-white bg-slate-800 px-2 py-0.5 rounded">ZEEBUSINESS</span>
          <span className="font-bold text-[10px] sm:text-xs tracking-tight text-slate-700">BW BUSINESSWORLD</span>
          <span className="font-bold text-xs sm:text-sm text-slate-800">Outlook</span>
        </div>
      </div>
    </section>
  );
}