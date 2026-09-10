"use client";

import React from "react";
import Image from "next/image";

export default function WhyUsSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-24 px-4 sm:px-8 lg:px-14 selection:bg-[#97df2c] selection:text-black">
      <div className="max-w-6xl mx-auto">
        
        {/* ================= TOP HEADER + SOCIAL PILL ================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black">
                Why Us?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 font-medium tracking-tight">
              We Don&apos;t Just Supply Data. We Deliver High-Converting Customers.
            </p>
          </div>

          {/* Social Icons + 2M+ Badge */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center -space-x-1.5">
              {/* YouTube */}
              <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white text-[9px] shadow-sm ring-2 ring-white">
                ▶
              </div>
              {/* Facebook */}
              <div className="w-6 h-6 rounded-full bg-[#1877F2] flex items-center justify-center text-white text-xs font-bold shadow-sm ring-2 ring-white">
                f
              </div>
              {/* Instagram */}
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#962fbf] flex items-center justify-center text-white text-[9px] shadow-sm ring-2 ring-white">
                📷
              </div>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-medium">
              2M+
            </span>
          </div>
        </div>

        {/* ================= DUAL CARDS GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
          
          {/* ----- LEFT CARD: Grey Card with 3D Avatar Network ----- */}
          <div className="bg-[#f2f4f6] rounded-[32px] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden min-h-[310px]">
            
            {/* Left Stats Text */}
            <div className="flex flex-col justify-center space-y-6 z-10 w-full sm:w-1/2">
              <div>
                <h3 className="text-4xl sm:text-5xl font-black text-slate-900 font-medium tracking-tight leading-none">
                  50k+
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5">
                  Verified Leads Generated
                </p>
              </div>

              <div>
                <h3 className="text-4xl sm:text-5xl font-black text-slate-900 font-medium tracking-tight leading-none">
                  10k+
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5">
                  Active Paying Clients
                </p>
              </div>
            </div>

            {/* Right Side: 3D Avatar Connection Graph (Pure Vector Representation) */}
            <div className="w-full sm:w-1/2 flex items-center justify-center relative h-52 sm:h-60">
              
              {/* Connection Lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200">
                <line x1="100" y1="100" x2="100" y2="35" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="100" y1="100" x2="45" y2="70" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="100" y1="100" x2="155" y2="70" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="100" y1="100" x2="50" y2="145" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="100" y1="100" x2="150" y2="145" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>

              {/* Center Main Avatar */}
              <div className="relative z-20 w-16 h-16 rounded-full bg-blue-100 border-2 border-white shadow-xl flex items-center justify-center overflow-hidden">
                <span className="text-3xl">👨‍💼</span>
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-full border border-white flex items-center justify-center text-[8px] text-white">★</span>
              </div>

              {/* Top Avatar */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-11 h-11 rounded-full bg-purple-100 border-2 border-white shadow-md flex items-center justify-center">
                <span className="text-xl">👩‍💼</span>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-purple-500 rounded-full border border-white flex items-center justify-center text-[7px] text-white">✓</span>
              </div>

              {/* Left Top Avatar */}
              <div className="absolute top-10 left-3 sm:left-4 z-10 w-11 h-11 rounded-full bg-emerald-100 border-2 border-white shadow-md flex items-center justify-center">
                <span className="text-xl">👨‍💻</span>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border border-white flex items-center justify-center text-[7px] text-white">✓</span>
              </div>

              {/* Right Top Avatar */}
              <div className="absolute top-10 right-3 sm:right-4 z-10 w-11 h-11 rounded-full bg-amber-100 border-2 border-white shadow-md flex items-center justify-center">
                <span className="text-xl">🧑‍🎓</span>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full border border-white flex items-center justify-center text-[7px] text-white">✓</span>
              </div>

              {/* Left Bottom Avatar */}
              <div className="absolute bottom-2 left-6 z-10 w-10 h-10 rounded-full bg-pink-100 border-2 border-white shadow-md flex items-center justify-center">
                <span className="text-lg">👩</span>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border border-white flex items-center justify-center text-[6px] text-white">✓</span>
              </div>

              {/* Right Bottom Avatar */}
              <div className="absolute bottom-2 right-6 z-10 w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-md flex items-center justify-center">
                <span className="text-lg">🧑</span>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-slate-600 rounded-full border border-white flex items-center justify-center text-[6px] text-white">✓</span>
              </div>

            </div>

          </div>

          {/* ----- RIGHT CARD: Sage Green Card with Mobile Mockup ----- */}
          <div className="bg-[#e7eee1] rounded-[32px] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden min-h-[310px]">
            
            {/* Left Content */}
            <div className="flex flex-col justify-center z-10 w-full sm:w-1/2">
              <span className="text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                Leads Without Limits
              </span>

              <h3 className="text-2xl sm:text-[28px] font-black font-medium text-slate-900 tracking-tight leading-[1.25]">
                Filter by niche, track delivery, and access leads anytime, anywhere.
              </h3>
            </div>

            {/* Right Side: Dual Floating Phone Screen Mockup */}
            <div className="w-full sm:w-1/2 flex items-center justify-center relative h-56 sm:h-64">
              
              {/* Phone 1 (Back Phone) */}
              <div className="absolute right-2 top-2 w-36 h-52 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 transform rotate-6 scale-95 opacity-90 hidden sm:block">
                <div className="w-full h-3 bg-slate-100 rounded-full mb-2" />
                <div className="w-full h-20 bg-slate-800 rounded-xl mb-2 p-2 flex flex-col justify-end text-white text-[8px] font-bold">
                  <span>Targeted DB</span>
                </div>
                <div className="space-y-1">
                  <div className="w-full h-2 bg-slate-100 rounded" />
                  <div className="w-3/4 h-2 bg-slate-100 rounded" />
                </div>
              </div>

              {/* Phone 2 (Main Foreground Phone) */}
              <div className="relative z-20 w-44 sm:w-44 h-56 bg-white rounded-[24px] shadow-2xl border-4 border-slate-900 p-2.5 flex flex-col justify-between transform -rotate-2">
                
                {/* Dynamic Island / Notch */}
                <div className="w-12 h-3 bg-slate-900 rounded-full mx-auto mb-1.5" />
                
                {/* Header inside phone */}
                <div className="flex items-center justify-between text-[8px] font-bold text-slate-800 mb-1">
                  <span>Hello Lead Closer 👋</span>
                  <span className="px-1.5 py-0.5 bg-lime-200 text-slate-900 rounded-full font-black">21 New</span>
                </div>

                {/* Search Bar inside phone */}
                <div className="w-full h-4 bg-slate-100 rounded-full px-2 text-[7px] text-slate-400 flex items-center mb-1.5">
                  🔍 Search Niche...
                </div>

                {/* Mock Card Preview inside phone */}
                <div className="w-full h-24 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-2 text-white flex flex-col justify-between relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <span className="text-[7px] font-bold text-lime-400 uppercase">INSTAGRAM LEADS</span>
                    <span className="text-[7px] text-slate-400">99.4% Verified</span>
                  </div>
                  <div>
                    <p className="text-[9px] font-extrabold leading-tight">High Ticket Buyers</p>
                    <p className="text-[7px] text-slate-300">Instant CSV Export</p>
                  </div>
                </div>

                {/* Bottom Navigation inside phone */}
                <div className="flex justify-around items-center pt-1 border-t border-slate-100 text-[9px]">
                  <span>🏠</span>
                  <span>📊</span>
                  <span>📥</span>
                  <span>⚙️</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ================= BOTTOM PUNCHLINE HEADLINE ================= */}
        <div className="mt-16 sm:mt-24 text-center max-w-4xl mx-auto px-2">
          <h3 className="text-2xl sm:text-4xl md:text-[42px] font-black font-medium text-slate-900 tracking-tight leading-[1.25]">
            Loved by thousands <span className="inline-block">😍</span> who turned <br className="hidden sm:inline" />
            their targeted leads <span className="inline-block">📊</span> into real income and <span className="inline-block">💰</span> <br className="hidden sm:inline" />
            scaling opportunities online
          </h3>
        </div>

      </div>
    </section>
  );
}