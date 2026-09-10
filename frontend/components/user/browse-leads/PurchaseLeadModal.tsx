"use client";

import { useEffect, useState } from "react";
import { AlertCircle, X, ShoppingCart, Sparkles } from "lucide-react";
import PurchaseSummary from "./PurchaseSummary";
import { BrowsePlatform } from "@/types/browseLead";

interface PurchaseLeadModalProps {
  open: boolean;
  platform: BrowsePlatform | null;
  onClose: () => void;
  onPurchase: (quantity: number) => Promise<void> | void;
  loading?: boolean;
}

export default function PurchaseLeadModal({
  open,
  platform,
  onClose,
  onPurchase,
  loading = false,
}: PurchaseLeadModalProps) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (platform) {
      setQuantity(Math.max(1, platform.minimumPurchase || 1));
    }
  }, [platform]);

  if (!open || !platform) return null;

  const minimum = Math.max(1, platform.minimumPurchase || 1);
  const maximum = platform.availableLeads;

  const handleQuantityChange = (value: string) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return;
    const safeValue = Math.min(maximum, Math.max(minimum, Math.floor(parsed)));
    setQuantity(safeValue);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4 transition-all duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      {/* Modal Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-t-[32px] sm:rounded-[28px] bg-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 sm:px-7 py-4 sm:py-5 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            {/* Platform Initials */}
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white font-medium text-xs shadow-inner"
              style={{ backgroundColor: platform.color || "#0c4731" }}
            >
              {platform.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-medium text-slate-900 tracking-tight leading-none">
                  Purchase Leads
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#eef7ee] text-[#0c4731] border border-[#d6ecd6] text-[10px] font-medium px-2 py-0.5 uppercase tracking-wider">
                  <Sparkles size={10} /> Instant
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500 font-normal">
                {platform.name} Verified Lead Pool
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 disabled:opacity-50 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 sm:space-y-5 p-5 sm:p-7 overflow-y-auto">
          
          {/* Quantity Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs sm:text-sm font-medium text-slate-800">
                Number of Leads
              </label>
              <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                Stock: {platform.availableLeads.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="relative">
              <input
                type="number"
                min={minimum}
                max={maximum}
                value={quantity}
                disabled={loading}
                onChange={(e) => handleQuantityChange(e.target.value)}
                className="h-12 sm:h-13 w-full rounded-2xl border border-slate-200/90 bg-[#f8fafc] px-4 font-medium text-slate-900 text-sm sm:text-base outline-none transition-all focus:border-[#0c4731] focus:bg-white focus:ring-4 focus:ring-emerald-900/5"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                Leads
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-normal">
              <span>Minimum order: <b className="font-medium text-slate-800">{minimum}</b></span>
              <span>Rate: <b className="font-medium text-slate-800">₹{platform.pricePerLead}</b> / lead</span>
            </div>
          </div>

          {/* Pricing Summary Component */}
          <div className="rounded-2xl border border-slate-100 bg-[#fbfdfb] p-3.5 sm:p-4">
            <PurchaseSummary
              quantity={quantity}
              pricePerLead={platform.pricePerLead}
            />
          </div>

          {/* Notice Banner */}
          <div className="flex items-start gap-2.5 rounded-2xl bg-[#eef7ee] border border-[#d6ecd6] p-3.5 text-xs text-[#0c4731]">
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-[#0c4731]" />
            <p className="font-normal leading-relaxed">
              Instant delivery active. Once confirmed, leads will appear directly under your <span className="font-medium">Downloads</span> tab.
            </p>
          </div>

          {/* Actions Button Group */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="flex-1 rounded-2xl border border-slate-200 bg-white py-3 sm:py-3.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 active:scale-95 disabled:opacity-50 transition-all cursor-pointer shadow-sm"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={
                loading ||
                quantity < minimum ||
                quantity > platform.availableLeads
              }
              onClick={() => onPurchase(quantity)}
              className="flex-[1.5] inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0c4731] hover:bg-[#083021] py-3 sm:py-3.5 text-xs sm:text-sm font-medium text-white active:scale-95 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all shadow-md shadow-emerald-950/20 cursor-pointer"
            >
              <ShoppingCart size={16} className="text-[#a3e635]" />
              <span>{loading ? "Processing..." : "Confirm & Pay"}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}