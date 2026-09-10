"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, AlertCircle, ShoppingBag, RefreshCw } from "lucide-react";

import DownloadHeader from "@/components/user/downloads/DownloadHeader";
import DownloadCard from "@/components/user/downloads/DownloadCard";
import { getMyDownloads } from "@/services/downloadApi";
import { Download as DownloadType } from "@/types/download";

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<DownloadType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadDownloads = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getMyDownloads();
      setDownloads(data.downloads || []);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Failed to load downloads. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDownloads();
  }, [loadDownloads]);

  const filteredDownloads = downloads.filter((item) => {
    const platformName = item.platform?.name?.toLowerCase() || "";
    const orderId = item.order?._id?.toLowerCase() || "";
    return (
      platformName.includes(search.trim().toLowerCase()) ||
      orderId.includes(search.trim().toLowerCase())
    );
  });

  return (
    <div className="relative w-full max-w-7xl mx-auto space-y-6 pb-14">
      {/* Background Soft Glow Ambient Accents */}
      <div className="pointer-events-none absolute -top-10 right-0 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="pointer-events-none absolute top-48 left-6 h-64 w-64 rounded-full bg-[#a3e635]/5 blur-3xl" />

      {/* Header */}
      <DownloadHeader search={search} setSearch={setSearch} />

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3 rounded-[20px] border border-red-200/80 bg-red-50/90 p-4 text-xs sm:text-sm text-red-800 shadow-sm backdrop-blur-sm">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
          <div className="flex-1 leading-relaxed">
            <p className="font-normal text-red-900">Something went wrong</p>
            <p className="mt-0.5 text-red-700 font-normal">{error}</p>
          </div>
          <button
            type="button"
            onClick={loadDownloads}
            className="inline-flex items-center gap-1 font-normal text-red-900 underline hover:no-underline cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Skeletons Loading State */}
      {loading && (
        <div className="space-y-4 pt-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 w-full animate-pulse rounded-[26px] bg-slate-200/60 border border-slate-100"
            />
          ))}
        </div>
      )}

      {/* Downloads List */}
      {!loading && filteredDownloads.length > 0 && (
        <div className="space-y-4">
          {filteredDownloads.map((item) => (
            <DownloadCard key={item._id} item={item} />
          ))}
        </div>
      )}

      {/* Empty State Card */}
      {!loading && filteredDownloads.length === 0 && !error && (
        <div className="rounded-[28px] border border-slate-200/80 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eef7ee] text-[#0c4731]">
            <ShoppingBag size={28} />
          </div>
          <h2 className="mt-4 text-lg sm:text-xl font-normal text-slate-900">
            {search ? "No Matching Downloads" : "No Downloads Available Yet"}
          </h2>
          <p className="mx-auto mt-1.5 max-w-md text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
            {search
              ? "Try adjusting your search query to find your download files."
              : "You haven't purchased any leads yet. Browse available platforms to buy your verified leads."}
          </p>
          <Link
            href="/browse-leads"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0c4731] hover:bg-[#083021] active:scale-95 px-5 py-2.5 text-xs sm:text-sm font-normal text-white transition-all shadow-sm"
          >
            <span>Browse Leads</span>
            <ArrowRight size={15} className="text-[#a3e635]" />
          </Link>
        </div>
      )}
    </div>
  );
}