"use client";

import Link from "next/link";
import { ArrowRight, Camera, CircleUserRound, Ghost } from "lucide-react";
import { FaLinkedin, FaYoutube } from "react-icons/fa";

export interface PlatformItem {
  id: string;
  name: string;
  description: string;
  pricePerLead: number;
  availableStock: number;
  theme: "green" | "lime" | "light";
  iconName: "instagram" | "facebook" | "linkedin" | "youtube" | "snapchat";
  category: "social" | "practice";
  targetAudiences: string[];
}

interface PlatformGridProps {
  platforms: PlatformItem[];
}

export default function PlatformGrid({ platforms }: PlatformGridProps) {
  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case "instagram":
        return <Camera className={className} />;
      case "facebook":
        return <CircleUserRound className={className} />;
      case "linkedin":
        return <FaLinkedin className={className} />;
      case "youtube":
        return <FaYoutube className={className} />;
      case "snapchat":
        return <Ghost className={className} />;
      default:
        return <Camera className={className} />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {platforms.map((p) => {
        // Theme 1: Instagram Forest Green
        if (p.theme === "green") {
          return (
            <div
              key={p.id}
              className="relative overflow-hidden rounded-[28px] bg-[#0c4731] text-white p-6 sm:p-7 flex flex-col justify-between shadow-lg border border-emerald-800/40 min-h-[240px] group transition-all duration-200 hover:-translate-y-1"
            >
              <div className="relative z-10 space-y-2 max-w-[85%]">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-normal text-white">{p.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-emerald-200 font-normal">
                    ₹{p.pricePerLead}/lead
                  </span>
                </div>
                <p className="text-xs text-emerald-100/80 font-normal leading-relaxed">
                  {p.description}
                </p>
              </div>

              {/* Watermark Logo */}
              <div className="absolute right-4 bottom-4 text-white/10 pointer-events-none group-hover:scale-110 transition-transform">
                {renderIcon(p.iconName, "w-16 h-16 sm:w-20 sm:h-20")}
              </div>

              <div className="relative z-10 pt-6 flex items-center justify-between">
                <Link
                  href={`/browse-leads/${p.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-slate-950 text-xs font-normal hover:bg-slate-100 active:scale-95 transition-all shadow-sm"
                >
                  <span>Buy Now</span>
                  <ArrowRight size={13} />
                </Link>
                <span className="text-[11px] text-emerald-200/70 font-normal">
                  {p.availableStock.toLocaleString("en-IN")} available
                </span>
              </div>
            </div>
          );
        }

        // Theme 2: LinkedIn Neon Lime
        if (p.theme === "lime") {
          return (
            <div
              key={p.id}
              className="relative overflow-hidden rounded-[28px] bg-[#a3e635] text-slate-950 p-6 sm:p-7 flex flex-col justify-between shadow-lg border border-lime-300/60 min-h-[240px] group transition-all duration-200 hover:-translate-y-1"
            >
              <div className="relative z-10 space-y-2 max-w-[85%]">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-normal text-slate-950">{p.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/10 text-slate-900 font-normal">
                    ₹{p.pricePerLead}/lead
                  </span>
                </div>
                <p className="text-xs text-slate-800 font-normal leading-relaxed">
                  {p.description}
                </p>
              </div>

              {/* Watermark Logo */}
              <div className="absolute right-4 bottom-4 text-slate-900/10 pointer-events-none group-hover:scale-110 transition-transform">
                {renderIcon(p.iconName, "w-16 h-16 sm:w-20 sm:h-20")}
              </div>

              <div className="relative z-10 pt-6 flex items-center justify-between">
                <Link
                  href={`/browse-leads/${p.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-950 text-white text-xs font-normal hover:bg-slate-900 active:scale-95 transition-all shadow-sm"
                >
                  <span>Buy Now</span>
                  <ArrowRight size={13} className="text-[#a3e635]" />
                </Link>
                <span className="text-[11px] text-slate-800/80 font-normal">
                  {p.availableStock.toLocaleString("en-IN")} available
                </span>
              </div>
            </div>
          );
        }

        // Theme 3: Facebook, YouTube, Snapchat (Clean Crisp White/Off-White)
        return (
          <div
            key={p.id}
            className="relative overflow-hidden rounded-[28px] bg-white border border-slate-200/90 text-slate-900 p-6 sm:p-7 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] min-h-[240px] group transition-all duration-200 hover:-translate-y-1 hover:border-slate-300"
          >
            <div className="relative z-10 space-y-2 max-w-[85%]">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-normal text-slate-900">{p.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-normal">
                  ₹{p.pricePerLead}/lead
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                {p.description}
              </p>
            </div>

            {/* Watermark Logo */}
            <div className="absolute right-4 bottom-4 text-slate-200 pointer-events-none group-hover:scale-110 transition-transform">
              {renderIcon(p.iconName, "w-16 h-16 sm:w-20 sm:h-20")}
            </div>

            <div className="relative z-10 pt-6 flex items-center justify-between">
              <Link
                href={`/browse-leads/${p.id}`}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-normal hover:bg-[#0c4731] active:scale-95 transition-all shadow-sm"
              >
                <span>Buy Now</span>
                <ArrowRight size={13} className="text-[#a3e635]" />
              </Link>
              <span className="text-[11px] text-slate-400 font-normal">
                {p.availableStock.toLocaleString("en-IN")} available
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}