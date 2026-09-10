"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface LeadPlatform {
  id: string;
  name: string;
  description: string;
  bgClass: string;
  textClass: string;
  descClass: string;
  btnBg: string;
  btnText: string;
  icon: React.ReactNode;
  colSpan?: string;
  category: "social" | "practice";
}

const platformsData: LeadPlatform[] = [
  {
    id: "instagram",
    name: "Instagram",
    description: "High-intent leads from DMs, Stories & Reels. Filtered by age, gender & location.",
    bgClass: "bg-[#1b4d34]",
    textClass: "text-white",
    descClass: "text-emerald-100/80",
    btnBg: "bg-white hover:bg-slate-100",
    btnText: "text-[#111827]",
    category: "social",
    icon: (
      <svg className="w-10 h-10 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    id: "facebook",
    name: "Facebook",
    description: "Targeted leads from Groups, Ads & Marketplace ready for outreach.",
    bgClass: "bg-[#e2e8f0]",
    textClass: "text-slate-900",
    descClass: "text-slate-600",
    btnBg: "bg-[#111827] hover:bg-slate-800",
    btnText: "text-white",
    category: "social",
    icon: (
      <div className="w-10 h-10 rounded-full bg-slate-300/80 flex items-center justify-center text-white/90 font-black text-xl">
        f
      </div>
    ),
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "B2B professionals & decision makers perfect for high-ticket offers.",
    bgClass: "bg-[#b8e957]",
    textClass: "text-slate-950",
    descClass: "text-slate-800",
    btnBg: "bg-[#111827] hover:bg-slate-800",
    btnText: "text-white",
    category: "social",
    icon: (
      <span className="font-bold text-3xl text-slate-900/20 tracking-tighter">in</span>
    ),
  },
  {
    id: "youtube",
    name: "YouTube",
    description: "Engaged subscribers & commenters from your niche with high conversion.",
    bgClass: "bg-white",
    textClass: "text-slate-900",
    descClass: "text-slate-600",
    btnBg: "bg-[#111827] hover:bg-slate-800",
    btnText: "text-white",
    colSpan: "lg:col-span-2",
    category: "social",
    icon: (
      <div className="w-10 h-7 bg-red-100/90 rounded-xl flex items-center justify-center">
        <svg className="w-4 h-4 fill-red-400" viewBox="0 0 24 24">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </div>
    ),
  },
  {
    id: "snapchat",
    name: "Snapchat",
    description: "Gen-Z audience, quick responders for trendy products & courses.",
    bgClass: "bg-[#e2e8f0]",
    textClass: "text-slate-900",
    descClass: "text-slate-600",
    btnBg: "bg-[#111827] hover:bg-slate-800",
    btnText: "text-white",
    category: "social",
    icon: (
      <svg className="w-8 h-8 text-amber-500/30 fill-amber-300/20 stroke-amber-500" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4 21l3.39-.97C8.93 20.26 10.88 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z" />
      </svg>
    ),
  },
];

const audiences = [
  "Housewife",
  "Working Pro",
  "Students",
  "Business Owners",
  "Job Seekers",
];

export default function LeadPacks() {
  const router = useRouter();
  const { user } = useAuth(); // AuthContext check
  
  const [activeTab, setActiveTab] = useState<"social" | "practice">("social");
  const [selectedAudience, setSelectedAudience] = useState<string>("Housewife");

  const handleBuyNow = (platformId: string) => {
    if (user) {
      router.push(`/dashboard?platform=${platformId}&audience=${encodeURIComponent(selectedAudience)}`);
    } else {
      router.push(`/login?redirect=/dashboard?platform=${platformId}`);
    }
  };

  return (
    <section className="relative w-full bg-[#0a1122] text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-14 selection:bg-[#b8e957] selection:text-black">
      <div className="max-w-6xl mx-auto">
        
        {/* ================= HEADER & TOP TOGGLE ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white">
              Lead Packs
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-md">
              Choose your platform, pick your audience, and start converting today.
            </p>
          </div>

          {/* Social vs Practice Tabs Toggle */}
          <div className="inline-flex p-1 bg-white rounded-full self-start md:self-auto shadow-sm">
            <button
              onClick={() => setActiveTab("social")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === "social"
                  ? "bg-[#0a1122] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Social Platforms <span className="text-[#38ef7d] font-bold ml-1">(5)</span>
            </button>

            <button
              onClick={() => setActiveTab("practice")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === "practice"
                  ? "bg-[#0a1122] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Practice Leads <span className="text-emerald-600 font-bold ml-1">(4)</span>
            </button>
          </div>
        </div>

        {/* ================= PLATFORM CARDS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {platformsData.map((item) => (
            <div
              key={item.id}
              className={`${item.bgClass} ${item.colSpan || ""} rounded-[28px] p-6 sm:p-7 flex flex-col justify-between shadow-xl transition-transform hover:-translate-y-1 duration-200 min-h-[260px] relative`}
            >
              {/* Top Text Info */}
              <div>
                <h3 className={`text-xl sm:text-2xl font-bold ${item.textClass} tracking-tight`}>
                  {item.name}
                </h3>
                <p className={`mt-2.5 text-xs sm:text-sm ${item.descClass} leading-relaxed max-w-xs sm:max-w-sm`}>
                  {item.description}
                </p>
              </div>

              {/* Bottom Icon & Action */}
              <div className="mt-6 flex items-end justify-between">
                <button
                  onClick={() => handleBuyNow(item.id)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${item.btnBg} ${item.btnText} font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95`}
                >
                  <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                  <span>Buy Now</span>
                </button>

                {/* Platform Ghost / 3D Icon */}
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= BOTTOM AUDIENCE FILTERS ================= */}
        <div className="mt-12 sm:mt-14">
          <p className="text-xs font-semibold text-slate-400 mb-3 tracking-wide">
            Filter by Audience:
          </p>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {audiences.map((aud) => {
              const isSelected = selectedAudience === aud;
              return (
                <button
                  key={aud}
                  onClick={() => setSelectedAudience(aud)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 ${
                    isSelected
                      ? "bg-white text-slate-900 shadow-md scale-105"
                      : "bg-[#1a233a] text-slate-300 hover:bg-[#222e4d] hover:text-white"
                  }`}
                >
                  {aud}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}