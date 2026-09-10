"use client";

import React from "react";
import Marquee from "react-fast-marquee";

const topRowItems = [
  "Instagram Lead Generation",
  "Facebook Ads Buyers",
  "Verified WhatsApp Database",
  "B2B LinkedIn Decision Makers",
  "High Converting Funnels",
  "Real Estate Buyer Leads",
  "E-commerce Customers",
  "Crypto & Forex Leads",
  "Affiliate Marketers",
  "Local Business Outreach",
];

const bottomRowItems = [
  "100% Verified Phone Numbers",
  "Active Social Media Spenders",
  "High Ticket Clients",
  "Targeted Demographics & Location",
  "Instant Excel / CSV Export",
  "Student & Youth Databases",
  "Working Professionals",
  "Business Owners & CEOs",
  "High Conversion Rate",
  "24/7 Platform Lead Sync",
];

export default function MarqueeBanner() {
  return (
    <section className="relative w-full overflow-hidden ">
      
      {/* ================= TOP ROW (Dark Green BG, Left-to-Right Scroll) ================= */}
      <div className="relative z-10 w-full bg-[#0a271d] py-3.5 sm:py-4 border-y border-[#154636] shadow-md">
        <Marquee
          direction="right"
          speed={45}
          gradient={false}
          pauseOnHover={true}
        >
          <div className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm md:text-base font-bold text-[#a3e635] tracking-wide">
            {topRowItems.map((item, index) => (
              <div key={index} className="flex items-center gap-6 sm:gap-8">
                <span className="whitespace-nowrap">{item}</span>
                <span className="text-[#a3e635]/60 text-lg sm:text-xl font-black">✦</span>
              </div>
            ))}
          </div>
        </Marquee>
      </div>

      {/* ================= BOTTOM ROW (Lime Green BG, Overlapping Angled Strip, Right-to-Left Scroll) ================= */}
      <div className="relative z-20 w-[104%] -left-[2%] -mt-3.5 sm:-mt-4 bg-[#99db32] py-3.5 sm:py-4.5 transform -rotate-1 sm:-rotate-[1.2deg]  border-t-2 border-[#111827]">
        <Marquee
          direction="left"
          speed={50}
          gradient={false}
          pauseOnHover={true}
        >
          <div className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm md:text-base font-extrabold text-[#0a271d] tracking-tight">
            {bottomRowItems.map((item, index) => (
              <div key={index} className="flex items-center gap-6 sm:gap-8">
                <span className="whitespace-nowrap">{item}</span>
                <span className="text-[#0a271d]/60 text-lg sm:text-xl font-black">★</span>
              </div>
            ))}
          </div>
        </Marquee>
      </div>

    </section>
  );
}