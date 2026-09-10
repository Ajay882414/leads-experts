"use client";

import PlatformCard from "./PlatformCard";
import { BrowsePlatform } from "@/types/browseLead";

interface PlatformGridProps {
  platforms: BrowsePlatform[];
  onQuickBuy?: (platform: BrowsePlatform) => void;
}

export default function PlatformGrid({
  platforms,
  onQuickBuy,
}: PlatformGridProps) {
  if (!platforms.length) return null;

  return (
    <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 items-stretch">
      {platforms.map((platform) => (
        <PlatformCard
          key={platform._id}
          platform={platform}
          onQuickBuy={onQuickBuy}
        />
      ))}
    </div>
  );
}