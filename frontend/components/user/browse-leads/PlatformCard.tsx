"use client";

import Link from "next/link";
import { ArrowRight, Users, CheckCircle2 } from "lucide-react";
import { BrowsePlatform } from "@/types/browseLead";

interface PlatformCardProps {
  platform: BrowsePlatform & { categories?: string[] };
  onQuickBuy?: (platform: BrowsePlatform) => void;
}

export default function PlatformCard({ platform }: PlatformCardProps) {
  const isAvailable =
    platform.status === "ACTIVE" &&
    (platform.availableLeads || 0) >= (platform.minimumPurchase || 1);

  // Dynamic categories backend se, fallback default agar empty ho
  const categories: string[] =
    Array.isArray(platform.categories) && platform.categories.length > 0
      ? platform.categories
      : ["Housewife", "Students", "Working Pro"];

  return (
    <div className="group overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg flex flex-col justify-between">
      <div>
        {/* Banner Area */}
        <div
          className="relative h-32 w-full overflow-hidden bg-gradient-to-tr from-[#092219] to-[#0c4731]"
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
              <span className="text-xl font-black text-white tracking-wider uppercase drop-shadow-sm">
                {platform.name}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Stock Status Badge */}
          {/* <div className="absolute right-3 top-3">
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
                // "Sold Out"
                ""

              )}
            </span>
          </div> */}
        </div>

        {/* Platform Details */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-3.5">
            {platform.icon ? (
              <img
                src={platform.icon}
                alt={platform.name}
                className="h-12 w-12 rounded-2xl object-cover border border-slate-100 shadow-sm shrink-0"
              />
            ) : (
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-white font-black text-lg shadow-sm shrink-0"
                style={{ backgroundColor: platform.color || "#0c4731" }}
              >
                <Users size={22} />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight truncate">
                  {platform.name}
                </h3>
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
              </div>
              <p className="text-xs font-semibold text-emerald-700 tracking-tight mt-0.5">
                {/* {(platform.availableLeads || 0).toLocaleString("en-IN")} */}
                 Unlimited Leads Available
              </p>
            </div>
          </div>

          <p className="mt-3.5 line-clamp-2 text-xs leading-relaxed text-slate-500 font-normal">
            {platform.description ||
              `Exclusive Fresh Leads captured organically across ${platform.name}.`}
          </p>

          {/* Dynamic Sub-Categories Chips */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {categories.map((cat: string) => (
              <span
                key={cat}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 border border-slate-200/60"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer View Packages Button */}
      <div className="p-5 sm:p-6 pt-0">
        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Starting From
            </p>
            <p className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              ₹{platform.pricePerLead}
              <span className="text-xs font-normal text-slate-400">/lead</span>
            </p>
          </div>

          <Link
            href={`/browse-leads/${platform._id}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#265345] hover:bg-[#1a3930] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all active:scale-95"
          >
            <span>View Packages</span>
            <ArrowRight size={14} className="text-[#a3e635]" />
          </Link>
        </div>
      </div>
    </div>
  );
}