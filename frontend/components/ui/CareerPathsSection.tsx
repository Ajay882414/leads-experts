"use client";

import React from "react";

interface PathCard {
  id: string;
  emoji: string;
  title: string;
  description: string;
  rotation: string;
  pinColor: "dark-green" | "black" | "lime";
}

const pathsData: PathCard[] = [
  {
    id: "1",
    emoji: "🎓",
    title: "Student Prospects",
    description:
      "Target verified high-intent students looking for online skill courses, competitive exam prep, university admissions, and career mentorship programs with active WhatsApp connectivity.",
    rotation: "-rotate-4",
    pinColor: "dark-green",
  },
  {
    id: "2",
    emoji: "🏡",
    title: "Work From Home",
    description:
      "Connect with motivated individuals and homemakers seeking flexible remote jobs, reselling platforms, affiliate networks, and part-time independent digital income opportunities.",
    rotation: "rotate-0",
    pinColor: "black",
  },
  {
    id: "3",
    emoji: "🏢",
    title: "Business Owners",
    description:
      "Reach verified local MSME entrepreneurs, shop owners, and service founders looking for B2B tools, performance advertising, digital marketing, and automated business operations.",
    rotation: "rotate-2",
    pinColor: "lime",
  },
  {
    id: "4",
    emoji: "📈",
    title: "Affiliate & Network",
    description:
      "Engage active lead profiles seeking high-converting affiliate sales funnels, community memberships, business growth mentorships, and predictable monthly commissions.",
    rotation: "rotate-4",
    pinColor: "dark-green",
  },
  {
    id: "5",
    emoji: "💼",
    title: "Working Executives",
    description:
      "Target corporate employees and mid-level professionals seeking career upgrades, executive coaching, financial investments, and certified skill masterclasses.",
    rotation: "rotate-1",
    pinColor: "black",
  },
  {
    id: "6",
    emoji: "🏙️",
    title: "Real Estate Buyers",
    description:
      "Access high-ticket property seekers filtered across Tier-1 and Tier-2 metro cities ready for commercial spaces, residential apartments, and site visits.",
    rotation: "-rotate-2",
    pinColor: "lime",
  },
];

export default function CareerPathsSection() {
  return (
    <section className="relative w-full bg-white py-20 px-4 sm:px-8 lg:px-14 overflow-hidden selection:bg-[#99db32] selection:text-black">
      <div className="max-w-6xl mx-auto">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-left">

          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black">
            Choose Your Target Category
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-slate-500 font-medium max-w-md tracking-tight">
            Explore high-converting audience categories tailored for your specific sales offer and campaign targets.
          </p>
        </div>

        {/* ================= 6 PINNED CARDS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 sm:gap-x-10 pt-4">
          {pathsData.map((card) => (
            <div
              key={card.id}
              className={`relative mx-auto w-full max-w-[340px] shadow-xl rounded-full sm:max-w-[360px] ${card.rotation} transition-none select-none`}
            >
              {/* ================= 3D PUSH PIN ================= */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none drop-shadow-md">
                {card.pinColor === "dark-green" && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1b4332] via-[#082a1d] to-[#031810] shadow-[0_10px_14px_rgba(0,0,0,0.35)] border-2 border-[#2d6a4f] flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#1b4332] border border-[#40916c]/50 shadow-inner" />
                  </div>
                )}

                {card.pinColor === "black" && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#333] via-[#111] to-[#000] shadow-[0_10px_14px_rgba(0,0,0,0.4)] border-2 border-slate-700 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#222] border border-slate-500/50 shadow-inner" />
                  </div>
                )}

                {card.pinColor === "lime" && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a3e635] via-[#84cc16] to-[#4d7c0f] shadow-[0_10px_14px_rgba(0,0,0,0.25)] border-2 border-[#bef264] flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#84cc16] border border-[#d9f99d]/60 shadow-inner" />
                  </div>
                )}
              </div>

              {/* ================= OUTER WHITE CARD ================= */}
              <div className="bg-white rounded-[32px] p-3.5 sm:p-4 pt-12 sm:pt-14 shadow-[0_18px_40px_rgba(0,0,0,0.08)] border border-slate-100 min-h-[320px] flex flex-col justify-end">
                
                {/* ================= INNER SAGE GREEN CONTAINER ================= */}
                <div className="bg-[#e9eee2] rounded-[24px] p-5 sm:p-6 flex flex-col justify-start">
                  
                  {/* Title & Emoji */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-xl sm:text-2xl">{card.emoji}</span>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 tracking-tight">
                      {card.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-normal">
                    {card.description}
                  </p>

                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}