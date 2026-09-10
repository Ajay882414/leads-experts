"use client";

import React from "react";

interface FloatingPill {
  id: string;
  name: string;
  position: string; // Tailwind absolute positions
  color: string;
  badge?: string;
}

const platformsPills: FloatingPill[] = [
  { id: "1", name: "Instagram DMs", position: "top-[12%] left-[20%] sm:left-[24%]", color: "text-rose-600 bg-white/90" },
  { id: "2", name: "Facebook Buyers", position: "top-[8%] right-[22%] sm:right-[26%]", color: "text-blue-600 bg-white/90" },
  { id: "3", name: "LinkedIn B2B", position: "bottom-[20%] left-[10%] sm:left-[14%]", color: "text-[#0a66c2] bg-white/90" },
  { id: "4", name: "WhatsApp Verified", position: "bottom-[10%] right-[28%] sm:right-[32%]", color: "text-emerald-600 bg-white/90" },
  { id: "5", name: "Google High-Intent", position: "top-[52%] right-[6%] sm:right-[10%]", color: "text-slate-800 bg-white/90" },
  { id: "6", name: "YouTube Subscribers", position: "top-[45%] left-[6%] sm:left-[10%]", color: "text-red-600 bg-white/90" },
];

export default function PlatformRadarSection() {
  return (
    <section className="relative w-full bg-white py-24 sm:py-32 px-4 overflow-hidden selection:bg-[#99db32] selection:text-black">
      
      {/* Soft Green Gradient Radial Glow (Exact to reference image) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[500px] bg-gradient-to-tr from-[#dcfce7]/60 via-[#ecfccb]/40 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto flex items-center justify-center min-h-[460px] sm:min-h-[520px]">
        
        {/* ================= CONCENTRIC RADAR RINGS ================= */}
        {/* Inner Ring */}
        <div className="absolute w-[300px] sm:w-[380px] h-[300px] sm:h-[380px] rounded-full border border-emerald-500/20 pointer-events-none" />
        
        {/* Middle Ring */}
        <div className="absolute w-[500px] sm:w-[620px] h-[500px] sm:h-[620px] rounded-full border border-emerald-500/15 pointer-events-none" />
        
        {/* Outer Ring */}
        <div className="absolute w-[700px] sm:w-[880px] h-[700px] sm:h-[880px] rounded-full border border-emerald-500/10 pointer-events-none" />

        {/* Diagonal Orbit Line Guides with tiny dots */}
        <div className="absolute w-full h-full pointer-events-none">
          <span className="absolute top-[22%] left-[28%] w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
          <span className="absolute top-[18%] right-[32%] w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
          <span className="absolute bottom-[26%] left-[22%] w-2 h-2 rounded-full bg-emerald-400/70" />
          <span className="absolute bottom-[22%] right-[20%] w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
          <span className="absolute top-[50%] right-[18%] w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
        </div>

        {/* ================= FLOATING PLATFORM PILLS ================= */}
        {platformsPills.map((pill) => (
          <div
            key={pill.id}
            className={`absolute ${pill.position} z-20 transition-transform duration-300 hover:scale-110 select-none`}
          >
            <div className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-emerald-100/80 backdrop-blur-md ${pill.color} text-xs sm:text-sm font-bold tracking-tight`}>
              {pill.name}
            </div>
          </div>
        ))}

        {/* ================= CENTER CORE CONTENT ================= */}
        <div className="relative z-30 text-center max-w-xl mx-auto px-4 flex flex-col items-center">
          
          {/* Top Pill (The Future is AI / Lead Generation) */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0c4731] text-white shadow-xl shadow-emerald-900/10 mb-4 transition-transform hover:scale-105">
            <span className="text-sm sm:text-base font-extrabold tracking-wide">
              Verified Lead Ecosystem
            </span>
            <span className="text-[#a3e635] text-base">✦</span>
          </div>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
            Real-Time Active Leads From
          </p>

          {/* Big Bold Headline */}
          <h2 className="text-3xl sm:text-5xl font-black text-[#0c4731] tracking-tight leading-tight">
            Multiple Platforms
          </h2>

          {/* Decorative Dashes (Match to reference image) */}
          <div className="mt-4 flex items-center gap-1.5">
            <span className="w-8 h-1 rounded-full bg-emerald-700/60" />
            <span className="w-2.5 h-1 rounded-full bg-emerald-700/60" />
            <span className="w-1.5 h-1 rounded-full bg-emerald-700/60" />
          </div>

        </div>

        {/* Bottom Right Carousel Status Indicator (3 dots from reference) */}
        <div className="absolute bottom-4 right-4 sm:right-8 flex items-center gap-1.5 z-20">
          <span className="w-2 h-2 rounded-full bg-emerald-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#0c4731]" />
          <span className="w-2 h-2 rounded-full bg-emerald-300" />
        </div>

      </div>
    </section>
  );
}