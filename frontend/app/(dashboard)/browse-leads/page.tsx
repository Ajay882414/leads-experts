"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

import BrowseLeadsHeader from "@/components/user/browse-leads/BrowseLeadsHeader";
import PlatformGrid from "@/components/user/browse-leads/PlatformGrid";
import EmptyLeads from "@/components/user/browse-leads/EmptyLeads";
import BrowseLeadsLoading from "@/components/user/browse-leads/BrowseLeadsLoading";

import { getBrowsePlatforms } from "@/services/browseLeadsApi";
import type { BrowsePlatform } from "@/types/browseLead";

// Custom sequence order mapping: Instagram -> Snapchat -> Facebook -> Practice
const PLATFORM_ORDER: Record<string, number> = {
  instagram: 1,
  snapchat: 2,
  facebook: 3,
  practice: 4,
};

export default function BrowseLeadsPage() {
  const [platforms, setPlatforms] = useState<BrowsePlatform[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const loadPlatforms = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getBrowsePlatforms();
      const activePlatforms = data.filter((p: BrowsePlatform) => p.status === "ACTIVE");

      // Sort platforms in specified order
      const sortedPlatforms = activePlatforms.sort((a: BrowsePlatform, b: BrowsePlatform) => {
        const orderA = PLATFORM_ORDER[a.name.toLowerCase().trim()] ?? 99;
        const orderB = PLATFORM_ORDER[b.name.toLowerCase().trim()] ?? 99;
        return orderA - orderB;
      });

      setPlatforms(sortedPlatforms);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to load platforms. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPlatforms();
  }, [loadPlatforms]);

  const filteredPlatforms = platforms.filter((p) =>
    p.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  if (loading) return <BrowseLeadsLoading />;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pt-2 sm:pt-4 pb-14">
      {/* Header with Search */}
      <BrowseLeadsHeader search={search} setSearch={setSearch} />

      {/* Error Alert Box */}
      {error && (
        <div className="flex items-start gap-3 rounded-[20px] border border-red-200/80 bg-red-50/90 p-4 text-xs sm:text-sm text-red-800 shadow-sm backdrop-blur-sm">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
          <div className="flex-1 leading-relaxed">
            <p className="font-bold">Error Notice</p>
            <p className="mt-0.5 text-red-700">{error}</p>
          </div>
          <button
            type="button"
            onClick={loadPlatforms}
            className="inline-flex items-center gap-1 font-bold text-red-900 underline hover:no-underline cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Main Section */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Choose a Platform</span>
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-[#eef7ee] text-[#0c4731] text-[11px] font-bold border border-[#d6ecd6]">
                {filteredPlatforms.length} Active
              </span>
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 font-medium">
              Select a channel to explore category-filtered lead packages.
            </p>
          </div>
        </div>

        {/* Dynamic Grid / Empty States */}
        {filteredPlatforms.length > 0 ? (
          <PlatformGrid platforms={filteredPlatforms} />
        ) : (
          <EmptyLeads
            title="No Platforms Found"
            message={
              search
                ? `No platform found matching "${search}".`
                : "No platforms are currently online."
            }
            onReset={() => setSearch("")}
          />
        )}
      </section>
    </div>
  );
}