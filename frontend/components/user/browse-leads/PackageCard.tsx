"use client";

import { Clock, ShieldCheck, Heart, ShoppingBag } from "lucide-react";
import { Package } from "@/types/package";

interface PackageCardProps {
  pkg: Package;
  onBuy: (pkg: Package) => void;
}

export default function PackageCard({ pkg, onBuy }: PackageCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-slate-300">
      <div>
        {/* Title & Favorite */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold text-slate-900 leading-snug">
            {pkg.name}
          </h3>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-red-500 transition border border-slate-100 shrink-0 cursor-pointer"
          >
            <Heart size={15} />
          </button>
        </div>

        {/* Delivery Time */}
        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
          <Clock size={13} className="text-slate-400" />
          <span>{pkg.deliveryTime || "12 - 24 hours delivery"}</span>
        </div>

        {/* Badges */}
        <div className="mt-3.5 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-100">
            Hot
          </span>
          {/* <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-100 flex items-center gap-1">
            <ShieldCheck size={11} /> Verified
          </span> */}
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-700">
            {pkg.category}
          </span>
        </div>
      </div>

      {/* Pricing & Always Active Buy Button */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-medium text-slate-400 block uppercase">
            Rate
          </span>
          <span className="text-xl font-black text-slate-900">
            ₹{pkg.pricePerLead}
            <span className="text-xs text-slate-400 font-normal"> / lead</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => onBuy(pkg)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#0c4731] hover:bg-[#083021] active:scale-95 text-white px-5 py-2.5 text-xs font-bold transition shadow-sm cursor-pointer"
        >
          <ShoppingBag size={14} className="text-[#a3e635]" />
          <span>Buy Now</span>
        </button>
      </div>
    </div>
  );
}