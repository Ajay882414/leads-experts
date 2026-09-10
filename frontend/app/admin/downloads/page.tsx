"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

import {
  getDownloads,
  getDownloadStats,
} from "@/services/downloadApi";

import DownloadTable from "@/components/admin/download/DownloadTable";
import DownloadLoading from "@/components/admin/download/DownloadLoading";
import DownloadEmpty from "@/components/admin/download/DownloadEmpty";
import DownloadStats from "@/components/admin/download/DownloadStats";

import type {
  Download,
} from "@/types/download";

type DownloadStatsType = {
  totalDownloads: number;
  totalLeads: number;
};

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<
    Download[]
  >([]);

  const [stats, setStats] =
    useState<DownloadStatsType>({
      totalDownloads: 0,
      totalLeads: 0,
    });

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =====================================================
     FETCH DOWNLOADS
  ===================================================== */

  const fetchDownloads = async (
    showLoader = true
  ) => {
    try {
      if (showLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      setError("");

      const [
        downloadsResponse,
        statsResponse,
      ] = await Promise.all([
        getDownloads(),
        getDownloadStats(),
      ]);

      setDownloads(
        downloadsResponse?.downloads || []
      );

      setStats(
        statsResponse?.stats || {
          totalDownloads: 0,
          totalLeads: 0,
        }
      );
    } catch (error) {
      console.error(
        "Fetch downloads error:",
        error
      );

      setError(
        "Failed to load download data. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /* =====================================================
     INITIAL LOAD
  ===================================================== */

  useEffect(() => {
    fetchDownloads();
  }, []);

  /* =====================================================
     DELETE FROM LOCAL STATE
  ===================================================== */

  const handleDeleted = (
    deletedId: string
  ) => {
    setDownloads((previous) =>
      previous.filter(
        (item) =>
          item._id !== deletedId
      )
    );

    setStats((previous: DownloadStatsType) => ({
      ...previous,

      totalDownloads: Math.max(
        0,
        previous.totalDownloads - 1
      ),
    }));
  };

  /* =====================================================
     RETRY
  ===================================================== */

  const handleRetry = () => {
    fetchDownloads();
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Downloads
          </h1>

          <p className="mt-1 text-gray-500">
            Manage and view download history.
          </p>
        </div>

        <DownloadLoading />
      </div>
    );
  }

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div className="space-y-6">
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Downloads
          </h1>

          <p className="mt-1 text-gray-500">
            Manage and view download history.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            fetchDownloads(false)
          }
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={17}
            className={
              refreshing
                ? "animate-spin"
                : ""
            }
          />

          {refreshing
            ? "Refreshing..."
            : "Refresh"}
        </button>
      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="w-fit rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* =================================================
          STATS
      ================================================= */}

      <DownloadStats
        stats={stats}
      />

      {/* =================================================
          DOWNLOAD TABLE
      ================================================= */}

      {downloads.length === 0 ? (
        <DownloadEmpty />
      ) : (
        <DownloadTable
          downloads={downloads}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
}