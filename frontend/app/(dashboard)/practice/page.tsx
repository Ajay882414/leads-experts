"use client";

import { useEffect, useState, useCallback } from "react";
import { GraduationCap, AlertCircle, RefreshCw } from "lucide-react";

import { getBrowsePlatforms } from "@/services/browseLeadsApi";
import { getPackagesByPlatform } from "@/services/packageApi";
import { Package } from "@/types/package";
import PackageCard from "@/components/user/browse-leads/PackageCard";
import PurchaseLeadModal from "@/components/user/browse-leads/PurchaseLeadModal";

export default function PracticeLeadsPage() {
  const [platform, setPlatform] = useState<any>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchPracticeData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      // 1. Fetch platforms to find Practice Platform ID
      const platformsData = await getBrowsePlatforms();
      const practicePlatform = platformsData.find(
        (p: any) => p.name.toLowerCase().trim() === "practice"
      );

      if (!practicePlatform) {
        throw new Error("Practice platform configuration database me nahi mila.");
      }

      setPlatform(practicePlatform);

      // 2. Fetch packages under Practice platform
      const res = await getPackagesByPlatform(practicePlatform._id);
      setPackages(res.packages || []);
      setCategories(res.categories || ["All"]);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to load practice leads packages"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPracticeData();
  }, [fetchPracticeData]);

  const handleOpenBuy = (pkg: Package) => {
    setSelectedPkg(pkg);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 pt-2 sm:pt-4 pb-12 animate-pulse">
        <div className="h-6 w-36 rounded-lg bg-slate-200" />
        <div className="h-44 rounded-[28px] bg-slate-200" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-9 w-24 rounded-full bg-slate-200" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-72 rounded-[28px] bg-slate-100" />
          <div className="h-72 rounded-[28px] bg-slate-100" />
          <div className="h-72 rounded-[28px] bg-slate-100" />
        </div>
      </div>
    );
  }

  if (error || !platform) {
    return (
      <div className="max-w-xl mx-auto mt-12 rounded-[28px] border border-amber-200/80 bg-amber-50/90 p-8 text-center shadow-sm">
        <AlertCircle className="mx-auto text-amber-600 mb-3" size={36} />
        <h2 className="text-xl font-bold text-amber-900">Practice Arena Not Found</h2>
        <p className="mt-2 text-xs sm:text-sm text-amber-700 font-normal">
          {error || "Practice platform currently offline or not configured."}
        </p>
        <button
          type="button"
          onClick={fetchPracticeData}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0c4731] hover:bg-[#083021] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all shadow-sm cursor-pointer"
        >
          <RefreshCw size={15} /> Retry Loading
        </button>
      </div>
    );
  }

  const filteredPackages =
    selectedCategory === "All"
      ? packages
      : packages.filter(
          (pkg) => pkg.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="max-w-7xl mx-auto space-y-7 pt-28 pb-16">
      {/* Header Showcase Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 border-b border-slate-200/60 pb-6">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl text-white font-bold text-xl shadow-sm shrink-0"
          style={{ backgroundColor: platform.color || "#0c4731" }}
        >
          {platform.icon ? (
            <img
              src={platform.icon}
              alt="Practice"
              className="h-full w-full rounded-2xl object-cover"
            />
          ) : (
            <GraduationCap size={32} />
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {platform.name} Leads
            </h1>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-[#0c4731] border border-emerald-200">
              Training & Practice Mode
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            {platform.description ||
              "Mock & verified practice leads to train tele-callers and test closing scripts."}
          </p>
        </div>
      </div>

      {/* Audience Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {categories.map((cat) => {
          const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-bold transition cursor-pointer ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Dynamic Package Cards Grid */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg._id} pkg={pkg} onBuy={handleOpenBuy} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-base font-bold text-slate-800">
            No Practice Package Cards Added Yet
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Admin can add practice packages for {selectedCategory} from Admin Dashboard.
          </p>
        </div>
      )}

      {/* Purchase / Claim Modal */}
      <PurchaseLeadModal
        open={modalOpen}
        pkg={selectedPkg}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          setModalOpen(false);
          fetchPracticeData();
        }}
      />
    </div>
  );
}