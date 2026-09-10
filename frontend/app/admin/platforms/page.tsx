"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  getPlatforms,
} from "@/services/platformApi";

import PlatformTable from "@/components/admin/platform/PlatformTable";

import {
  Platform,
} from "@/types/platform";

export default function PlatformsPage() {
  const [platforms, setPlatforms] =
    useState<Platform[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchPlatforms = async () => {
    try {
      setError("");

      const res =
        await getPlatforms();

      setPlatforms(
        res?.platforms ?? []
      );
    } catch (error: any) {
      console.error(
        "Get platforms error:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Unable to load platforms"
      );
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
      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Platforms
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all lead platforms
          </p>
        </div>

        <Link
          href="/admin/platforms/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold"
        >
          Add Platform
        </Link>
      </div>

      {/* ================================= */}
      {/* ERROR */}
      {/* ================================= */}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* ================================= */}
      {/* TABLE */}
      {/* ================================= */}

      <PlatformTable
        platforms={platforms}
        refresh={fetchPlatforms}
      />
    </div>
  );
}