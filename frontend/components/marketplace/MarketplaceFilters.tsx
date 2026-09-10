"use client";

interface MarketplaceFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedAudience: string;
  setSelectedAudience: (val: string) => void;
  socialCount: number;
  practiceCount: number;
}

export default function MarketplaceFilters({
  selectedCategory,
  setSelectedCategory,
  selectedAudience,
  setSelectedAudience,
  socialCount,
  practiceCount,
}: MarketplaceFiltersProps) {
  const audiences = [
    "All",
    "Housewife",
    "Working Pro",
    "Students",
    "Business Owners",
    "Job Seekers",
  ];

  return (
    <div className="space-y-4 pt-2">
      {/* Category Toggle (Image Styled) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
            Lead Packs
          </h2>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Choose your platform, pick your audience, and start converting today.
          </p>
        </div>

        {/* Capsule Toggle */}
        <div className="inline-flex p-1 rounded-full bg-slate-900/90 text-white self-start sm:self-auto border border-slate-800 shadow-sm">
          <button
            type="button"
            onClick={() => setSelectedCategory("social")}
            className={`px-4 py-1.5 rounded-full text-xs font-normal transition-all ${
              selectedCategory === "social"
                ? "bg-[#0c4731] text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Social Platforms ({socialCount})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory("practice")}
            className={`px-4 py-1.5 rounded-full text-xs font-normal transition-all ${
              selectedCategory === "practice"
                ? "bg-[#0c4731] text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Practice Leads ({practiceCount})
          </button>
        </div>
      </div>

      {/* Audience Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="text-xs text-slate-400 font-normal whitespace-nowrap mr-1">
          Filter by Audience:
        </span>
        {audiences.map((aud) => {
          const isSelected = selectedAudience === aud;
          return (
            <button
              key={aud}
              type="button"
              onClick={() => setSelectedAudience(aud)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-normal transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {aud}
            </button>
          );
        })}
      </div>
    </div>
  );
}