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
    emoji: "🎬",
    title: "Video Editor",
    description:
      "Master industry-leading editing tools like Premiere Pro, Filmora, and After Effects to create cinematic videos, engaging reels, YouTube content, and professional brand campaigns that stand out.",
    rotation: "-rotate-4",
    pinColor: "dark-green",
  },
  {
    id: "2",
    emoji: "🤖",
    title: "AI Specialist",
    description:
      "Learn AI tools, automation systems, and prompt engineering to build smarter workflows, boost productivity, and create the next generation of AI-powered solutions.",
    rotation: "rotate-0",
    pinColor: "black",
  },
  {
    id: "3",
    emoji: "📱",
    title: "Social Media Expert",
    description:
      "Master Instagram growth, YouTube strategy, and content marketing to build personal brands, grow businesses, and create high-performing social media campaigns.",
    rotation: "rotate-2",
    pinColor: "lime",
  },
  {
    id: "4",
    emoji: "📈",
    title: "Performance Marketer",
    description:
      "Run high-ROI ad campaigns across Meta, Google Ads, and TikTok. Analyze key metrics, scale budgets effectively, and generate predictable sales funnels.",
    rotation: "rotate-4",
    pinColor: "dark-green",
  },
  {
    id: "5",
    emoji: "💼",
    title: "Lead Closer & Sales",
    description:
      "Develop direct client outreach mastery, pitch high-ticket retainers on WhatsApp and calls, handle objections effortlessly, and close regular paying clients.",
    rotation: "rotate-1",
    pinColor: "black",
  },
  {
    id: "6",
    emoji: "🚀",
    title: "Digital Freelancer",
    description:
      "Package your high-demand skills, build a strong portfolio, secure international remote clients, and establish a steady stream of independent digital revenue.",
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
               Choose Your Career Path
            </h2>
            
            <p className="mt-3 text-sm sm:text-base text-slate-500 font-medium max-w-md tracking-tight">
              Explore industry-ready skills and discover the path that matches your passion and future goals.
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