"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Lock,
  Layers,
  ArrowRight,
} from "lucide-react";

import { getBrowsePlatform, purchaseLeads } from "@/services/browseLeadsApi";
import type { BrowsePlatform } from "@/types/browseLead";
import PurchaseSummary from "@/components/user/browse-leads/PurchaseSummary";

export default function PlatformDetailPage() {
  const params = useParams();
  const router = useRouter();
  const platformId = params?.id as string;

  const [platform, setPlatform] = useState<BrowsePlatform | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    if (!platformId) return;

    const fetchPlatformDetails = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getBrowsePlatform(platformId);
        setPlatform(data);
        setQuantity(Math.max(1, data.minimumPurchase || 1));
      } catch (err: any) {
        setError(
          err?.response?.data?.message || "Failed to load platform details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlatformDetails();
  }, [platformId]);

  const minimum = platform ? Math.max(1, platform.minimumPurchase || 1) : 1;
  const maximum = platform ? platform.availableLeads : 1;

  const handleQuantityChange = (val: string) => {
    const parsed = Number(val);
    if (!Number.isFinite(parsed)) return;
    setQuantity(Math.min(maximum, Math.max(minimum, Math.floor(parsed))));
  };

  const handlePurchase = async () => {
    if (!platform || quantity < minimum || quantity > platform.availableLeads)
      return;

    try {
      setPurchasing(true);
      setError("");

      const response = await purchaseLeads({
        platform: platform._id,
        quantity,
      });

      if (!response.success) {
        throw new Error(response.message || "Purchase failed");
      }

      router.push("/downloads");
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to complete purchase."
      );
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 pt-2 sm:pt-4 pb-12 animate-pulse">
        <div className="h-6 w-36 rounded-lg bg-slate-200" />
        <div className="h-56 rounded-[28px] bg-slate-200" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 rounded-[28px] bg-slate-100" />
          <div className="h-96 rounded-[28px] bg-slate-100" />
        </div>
      </div>
    );
  }

  if (error || !platform) {
    return (
      <div className="max-w-xl mx-auto mt-12 rounded-[28px] border border-red-200/80 bg-red-50/90 p-8 text-center shadow-sm">
        <AlertCircle className="mx-auto text-red-500 mb-3" size={36} />
        <h2 className="text-xl font-medium text-red-800">Platform Not Found</h2>
        <p className="mt-2 text-xs sm:text-sm text-red-600 font-normal">
          {error || "Platform details not accessible or currently offline."}
        </p>
        <Link
          href="/browse-leads"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0c4731] hover:bg-[#093625] px-5 py-2.5 text-xs sm:text-sm font-medium text-white transition-all shadow-sm"
        >
          <ArrowLeft size={16} /> Back to Platforms
        </Link>
      </div>
    );
  }

  const isAvailable =
    platform.status === "ACTIVE" && platform.availableLeads >= minimum;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pt-18 sm:pt-20 pb-14">
      {/* Back Breadcrumb Navigation */}
      <Link
        href="/browse-leads"
        className="group inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500 hover:text-[#0c4731] transition-colors"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-200 group-hover:border-[#0c4731] transition-colors">
          <ArrowLeft size={14} />
        </div>
        <span>Back to Browse Leads</span>
      </Link>

      {/* Hero Showcase Banner */}
      <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-[#091e16] via-[#0c2e22] to-[#124230] p-6 sm:p-10 text-white shadow-xl border border-emerald-950/40">
        {/* Glow Spheres */}
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#a3e635]/15 blur-3xl" />
        <div className="pointer-events-none absolute left-1/3 -bottom-10 h-48 w-48 rounded-full bg-emerald-500/10 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="sm:flex items-start sm:items-center gap-4 sm:gap-6 ">
            {platform.icon ? (
              <img
                src={platform.icon}
                alt=""
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover bg-white/10 p-1.5 backdrop-blur-md border border-white/20 shadow-md shrink-0"
              />
            ) : (
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-[#a3e635] shrink-0">
                <Users size={32} />
              </div>
            )}

            <div className="sm:pt-0 pt-4">
              <div className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-[#a3e635] uppercase mb-2 border border-white/10">
                <Sparkles size={11} /> Verified Channel
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white leading-tight">
                {platform.name} Leads
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed font-normal">
                {platform.description ||
                  `Targeted, verified client leads captured organically across ${platform.name}.`}
              </p>
            </div>
          </div>

          {/* Stock Pill */}
          <div className="shrink-0 self-start md:self-auto">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium backdrop-blur-md border ${
                isAvailable
                  ? "bg-[#a3e635] text-slate-950 border-lime-300/80 shadow-md"
                  : "bg-red-500/20 text-red-200 border-red-400/40"
              }`}
            >
              {isAvailable ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-slate-950 animate-pulse" />
                  Available in Stock
                </>
              ) : (
                "Out of Stock"
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Details Overview + Checkout Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Platform Metrics & Guarantee */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
            <div>
              <h2 className="text-base sm:text-lg font-medium text-slate-900 tracking-tight">
                Platform Statistics
              </h2>
              <p className="text-xs text-slate-400 font-normal mt-0.5">
                Real-time inventory metrics and purchase bounds
              </p>
            </div>

            {/* 3 Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4 text-center">
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                  Available Leads
                </p>
                <p className="mt-1.5 text-xl sm:text-2xl font-medium text-[#0c4731] tracking-tight">
                  {platform.availableLeads.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4 text-center">
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                  Price / Lead
                </p>
                <p className="mt-1.5 text-xl sm:text-2xl font-medium text-slate-900 tracking-tight">
                  ₹{platform.pricePerLead.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-[#f8fafc] p-4 text-center">
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                  Min Order
                </p>
                <p className="mt-1.5 text-xl sm:text-2xl font-medium text-slate-900 tracking-tight">
                  {platform.minimumPurchase}
                </p>
              </div>
            </div>

            {/* Quality Guarantees */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <h3 className="text-xs sm:text-sm font-medium text-slate-900 uppercase tracking-wider">
                What you receive with this purchase:
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <div className="h-7 w-7 rounded-lg bg-[#eef7ee] text-[#0c4731] flex items-center justify-center shrink-0">
                    <CheckCircle2 size={15} />
                  </div>
                  <span className="text-xs sm:text-sm font-normal text-slate-700">
                    100% Unique leads (Never recirculated or shared between users)
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <div className="h-7 w-7 rounded-lg bg-[#eef7ee] text-[#0c4731] flex items-center justify-center shrink-0">
                    <Zap size={15} />
                  </div>
                  <span className="text-xs sm:text-sm font-normal text-slate-700">
                    Instant CSV export generation right inside your Downloads dashboard
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <div className="h-7 w-7 rounded-lg bg-[#eef7ee] text-[#0c4731] flex items-center justify-center shrink-0">
                    <ShieldCheck size={15} />
                  </div>
                  <span className="text-xs sm:text-sm font-normal text-slate-700">
                    Full customer contact profile: name, mobile number, state & platform source
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Widget */}
        <div className="rounded-[28px] border border-slate-200/80 bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-5">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base sm:text-lg font-medium text-slate-900 tracking-tight">
              Order Specification
            </h2>
            <p className="text-xs text-slate-400 font-normal mt-0.5">
              Enter target lead volume
            </p>
          </div>

          {/* Quantity Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs sm:text-sm font-medium text-slate-700">
                Number of Leads
              </label>
              <span className="text-[11px] font-medium text-[#0c4731] bg-[#eef7ee] px-2 py-0.5 rounded-lg border border-[#d6ecd6]">
                Cap: {platform.availableLeads.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="relative">
              <input
                type="number"
                min={minimum}
                max={maximum}
                value={quantity}
                disabled={purchasing || !isAvailable}
                onChange={(e) => handleQuantityChange(e.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200/90 bg-[#f8fafc] px-4 text-sm font-medium text-slate-900 outline-none transition-all focus:border-[#0c4731] focus:bg-white focus:ring-4 focus:ring-emerald-900/5 disabled:opacity-60"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                Units
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-normal">
              <span>Min limit: {minimum}</span>
              <span>Available: {platform.availableLeads.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Real-Time Price Calculation Summary */}
          <div className="rounded-2xl border border-slate-100 bg-[#fbfdfb] p-3.5 sm:p-4">
            <PurchaseSummary
              quantity={quantity}
              pricePerLead={platform.pricePerLead}
            />
          </div>

          {/* Purchase CTA */}
          <button
            type="button"
            disabled={
              purchasing ||
              !isAvailable ||
              quantity < minimum ||
              quantity > platform.availableLeads
            }
            onClick={handlePurchase}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#0c4731] hover:bg-[#083021] py-3.5 text-xs sm:text-sm font-medium text-white transition-all active:scale-95 shadow-md shadow-emerald-950/20 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed cursor-pointer"
          >
            <Zap size={16} className="text-[#a3e635]" />
            <span>{purchasing ? "Processing Order..." : "Confirm & Purchase"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}