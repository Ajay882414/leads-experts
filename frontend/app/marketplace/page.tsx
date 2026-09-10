"use client";

import { useState } from "react";
import MarketplaceHero from "@/components/marketplace/MarketplaceHero";
import MarketplaceFilters from "@/components/marketplace/MarketplaceFilters";
import PlatformGrid, { PlatformItem } from "@/components/marketplace/PlatformGrid";
import LeadAnatomyPreview from "@/components/marketplace/LeadAnatomyPreview";
import QualityPillars from "@/components/marketplace/QualityPillars";
import BulkOrderCTA from "@/components/marketplace/BulkOrderCTA";
import Header from "@/components/common/Header";
import LeadPacks from "@/components/ui/LeadPacks";

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("social");
  const [selectedAudience, setSelectedAudience] = useState("All");

  // Sample Static/Mock Catalog matching your image
  const platformsData: PlatformItem[] = [
    {
      id: "instagram-leads",
      name: "Instagram",
      description: "High-intent leads from DMs, Stories & Reels. Filtered by age, gender & location.",
      pricePerLead: 12,
      availableStock: 14200,
      theme: "green",
      iconName: "instagram",
      category: "social",
      targetAudiences: ["Housewife", "Students", "Working Pro"],
    },
    {
      id: "facebook-leads",
      name: "Facebook",
      description: "Targeted leads from Groups, Ads & Marketplace ready for outreach.",
      pricePerLead: 9,
      availableStock: 22000,
      theme: "light",
      iconName: "facebook",
      category: "social",
      targetAudiences: ["Housewife", "Business Owners", "Job Seekers"],
    },
    {
      id: "linkedin-leads",
      name: "LinkedIn",
      description: "B2B professionals & decision makers perfect for high-ticket offers.",
      pricePerLead: 24,
      availableStock: 6800,
      theme: "lime",
      iconName: "linkedin",
      category: "social",
      targetAudiences: ["Working Pro", "Business Owners"],
    },
    {
      id: "youtube-leads",
      name: "YouTube",
      description: "Engaged subscribers & commenters from your niche with high conversion.",
      pricePerLead: 15,
      availableStock: 9500,
      theme: "light",
      iconName: "youtube",
      category: "social",
      targetAudiences: ["Students", "Job Seekers"],
    },
    {
      id: "snapchat-leads",
      name: "Snapchat",
      description: "Gen-Z audience, quick responders for trendy products & courses.",
      pricePerLead: 8,
      availableStock: 11400,
      theme: "light",
      iconName: "snapchat",
      category: "social",
      targetAudiences: ["Students", "Job Seekers"],
    },
  ];

  // Filtering Logic
  const filteredPlatforms = platformsData.filter((p) => {
    const matchesCategory = p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesAudience =
      selectedAudience === "All" || p.targetAudiences.includes(selectedAudience);

    return matchesCategory && matchesSearch && matchesAudience;
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-10 pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
        <Header/>

      {/* 1. Hero */}
      <MarketplaceHero search={search} setSearch={setSearch} />

      {/* 2. Filters */}
      {/* <MarketplaceFilters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedAudience={selectedAudience}
        setSelectedAudience={setSelectedAudience}
        socialCount={5}
        practiceCount={4}
      /> */}
      <LeadPacks/>

      {/* 3. Primary Grid */}
      {/* <PlatformGrid platforms={filteredPlatforms} /> */}

      {/* 4. Anatomy / Sample Preview */}
      <LeadAnatomyPreview />

      {/* 5. Trust / Quality Pillars */}
      <QualityPillars />

      {/* 6. Bulk Order CTA */}
      <BulkOrderCTA />
    </div>
  );
}