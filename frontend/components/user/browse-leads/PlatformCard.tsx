"use client";

import Link from "next/link";
import { ArrowRight, ShoppingCart, Users, CheckCircle2 } from "lucide-react";
import { BrowsePlatform } from "@/types/browseLead";

interface PlatformCardProps {
  platform: BrowsePlatform;
  onQuickBuy?: (platform: BrowsePlatform) => void;
}

export default function PlatformCard({
  platform,
  onQuickBuy,
}: PlatformCardProps) {
  const isAvailable =
    platform.status === "ACTIVE" &&
    platform.availableLeads >= platform.minimumPurchase;

  return (
    <div className="group overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg flex flex-col justify-between">
      <div>
        {/* Banner Area */}
        <div
          className="relative h-36 w-full overflow-hidden bg-gradient-to-tr from-[#092219] to-[#0c4731]"
          style={{ backgroundColor: platform.color || undefined }}
        >
          {platform.banner ? (
            <img
              src={platform.banner}
              alt={platform.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-black text-white tracking-wider uppercase drop-shadow-sm">
                {platform.name}
              </span>
            </div>
          )}

          {/* Dark Overlay Tint */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Availability Status Badge */}
          <div className="absolute right-3.5 top-3.5">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider backdrop-blur-md shadow-sm ${
                isAvailable
                  ? "bg-[#a3e635] text-slate-950 border border-lime-300/60"
                  : "bg-red-500/90 text-white border border-red-300/40"
              }`}
            >
              {isAvailable ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-950 animate-pulse" />
                  In Stock
                </>
              ) : (
                "Sold Out"
              )}
            </span>
          </div>
        </div>

        {/* Platform Details & Body */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-3.5">
            {/* Icon Box */}
            {platform.icon ? (
              <img
                src={platform.icon}
                alt={platform.name}
                className="h-12 w-12 rounded-2xl object-cover border border-slate-100 shadow-sm"
              />
            ) : (
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-white font-black text-lg shadow-sm"
                style={{ backgroundColor: platform.color || "#0c4731" }}
              >
                <Users size={22} />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-slate-900 text-base font-medium sm:text-lg tracking-tight truncate">
                  {platform.name}
                </h3>
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
              </div>
              
              <p className="text-xs font-semibold text-emerald-700 tracking-tight mt-0.5">
                {platform.availableLeads.toLocaleString("en-IN")} leads available
              </p>
            </div>
          </div>

          <p className="mt-3.5 line-clamp-2 text-xs font-medium leading-relaxed text-slate-500 font-normal">
            {platform.description ||
              "Exclusive verified leads filtered for outreach conversion and high sales intent."}
          </p>
        </div>
      </div>

      {/* Card Footer: Pricing & Action Buttons */}
      <div className="p-5 sm:p-6 pt-0">
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Price / Lead
            </p>
            <p className="text-lg font-medium sm:text-xl font-black text-slate-900 tracking-tight">
              ₹{platform.pricePerLead.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Details Button */}
            <Link
              href={`/browse-leads/${platform._id}`}
              className="rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-700 transition-all active:scale-95 shadow-sm"
            >
              Details
            </Link>

            {/* Buy Action Button */}
            {onQuickBuy ? (
              <button
                type="button"
                disabled={!isAvailable}
                onClick={() => onQuickBuy(platform)}
                className="inline-flex items-center font-medium gap-1.5 rounded-xl bg-[#0c4731] hover:bg-[#083021] px-4 py-2.5 text-xs font-black text-white shadow-sm transition-all active:scale-95 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed cursor-pointer"
              >
                <ShoppingCart size={14} className="text-[#a3e635]" />
                <span>Buy</span>
              </button>
            ) : (
              <Link
                href={`/browse-leads/${platform._id}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#0c4731] hover:bg-[#083021] px-4 py-2.5 text-xs font-black text-white shadow-sm transition-all active:scale-95"
              >
                <span>Buy</span>
                <ArrowRight size={14} className="text-[#a3e635]" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}