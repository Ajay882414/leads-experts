"use client";

import { useEffect, useState } from "react";

import { getPlatforms } from "@/services/platformApi";

import PlatformTable from "@/components/admin/platform/PlatformTable";

import { Platform } from "@/types/platform";

import Link from "next/link";

export default function PlatformsPage() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchPlatforms = async () => {
    try {
      const res = await getPlatforms();

      setPlatforms(res.platforms || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  if (loading) {
    return (
      <div className="p-10">
        Loading Platforms...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Platforms
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all platforms
          </p>

        </div>

        <Link
          href="/admin/platforms/create"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          Add Platform
        </Link>

      </div>

      <PlatformTable
        platforms={platforms}
        refresh={fetchPlatforms}
      />

    </div>
  );
}