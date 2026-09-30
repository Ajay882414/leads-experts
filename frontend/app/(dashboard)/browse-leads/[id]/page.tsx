"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users, AlertCircle } from "lucide-react";

import { getPackagesByPlatform } from "@/services/packageApi";
import { Package } from "@/types/package";
import PackageCard from "@/components/user/browse-leads/PackageCard";
import PurchaseLeadModal from "@/components/user/browse-leads/PurchaseLeadModal";

export default function PlatformDetailPage() {
  const params = useParams();
  const router = useRouter();
  const platformId = params?.id as string;

  const [platform, setPlatform] = useState<any>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchPlatformData = async () => {
    if (!platformId) return;
    try {
      setLoading(true);
      setError("");
      const res = await getPackagesByPlatform(platformId);
      setPlatform(res.platform);
      setPackages(res.packages || []);
      setCategories(res.categories || ["All"]);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Failed to load platform packages"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlatformData();
  }, [platformId]);

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
      <div className="max-w-xl mx-auto mt-12 rounded-[28px] border border-red-200/80 bg-red-50/90 p-8 text-center shadow-sm">
        <AlertCircle className="mx-auto text-red-500 mb-3" size={36} />
        <h2 className="text-xl font-bold text-red-800">Platform Not Found</h2>
        <p className="mt-2 text-xs sm:text-sm text-red-600 font-normal">
          {error || "Platform details not accessible or currently offline."}
        </p>
        <Link
          href="/browse-leads"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0c4731] hover:bg-[#093625] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all shadow-sm"
        >
          <ArrowLeft size={16} /> Back to Platforms
        </Link>
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
    <div className="max-w-7xl mx-auto space-y-7 pt-20 pb-16">
      {/* Back Navigation */}
      <Link
        href="/browse-leads"
        className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-[#0c4731] transition-colors"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-200 group-hover:border-[#0c4731] transition-colors">
          <ArrowLeft size={14} />
        </div>
        <span>Back to Platforms</span>
      </Link>

      {/* Header Showcase Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl text-white font-bold text-xl shadow-sm shrink-0"
          style={{ backgroundColor: platform.color || "#0c4731" }}
        >
          {platform.icon ? (
            <img
              src={platform.icon}
              alt=""
              className="h-full w-full rounded-2xl object-cover"
            />
          ) : (
            <Users size={28} />
          )}
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {platform.name} Leads
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            {platform.description ||
              `High-intent leads from ${platform.name}. Filtered by audience category & location.`}
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
            No Package Cards Active Yet
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Admin has not added package cards for {selectedCategory} under {platform.name}.
          </p>
        </div>
      )}

      {/* Package Purchase Modal with Correct Props */}
      <PurchaseLeadModal
        open={modalOpen}
        pkg={selectedPkg}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          setModalOpen(false);
          fetchPlatformData();
        }}
      />
    </div>
  );
}