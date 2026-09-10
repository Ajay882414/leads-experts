"use client";

import { useEffect, useState } from "react";

import { Lead } from "@/types/lead";

import LeadTable from "@/components/admin/lead/LeadTable";
import LeadStats from "@/components/admin/lead/LeadStats";
import LeadFilters from "@/components/admin/lead/LeadFilters";
import CsvUploadButtons from "@/components/admin/lead/CsvUploadButton";

import {
  getLeads,
  getLeadStats,
} from "@/services/leadApi";

import { getPlatforms } from "@/services/platformApi";

// ==========================================
// PLATFORM TYPE
// ==========================================

interface Platform {
  _id: string;
  name: string;
}

// ==========================================
// LEAD STATS TYPE
// ==========================================

interface LeadStatsData {
  totalLeads: number;
  availableLeads: number;
  soldLeads: number;
  reservedLeads: number;
}

// ==========================================
// PAGE
// ==========================================

export default function LeadsPage() {
  // ========================================
  // LEADS
  // ========================================

  const [leads, setLeads] = useState<Lead[]>([]);

  // ========================================
  // PLATFORMS
  // ========================================

  const [platforms, setPlatforms] =
    useState<Platform[]>([]);

  // ========================================
  // LOADING
  // ========================================

  const [loading, setLoading] =
    useState(true);

  const [statsLoading, setStatsLoading] =
    useState(true);

  // ========================================
  // FILTERS
  // ========================================

  const [search, setSearch] =
    useState("");

  const [platform, setPlatform] =
    useState("");

  const [status, setStatus] =
    useState<"" | Lead["status"]>("");

  // ========================================
  // STATS
  // ========================================

  const [stats, setStats] =
    useState<LeadStatsData>({
      totalLeads: 0,
      availableLeads: 0,
      soldLeads: 0,
      reservedLeads: 0,
    });

  // ==========================================
  // FETCH LEADS
  // ==========================================

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const response = await getLeads({
        search:
          search.trim() || undefined,

        platform:
          platform || undefined,

        status:
          status || undefined,
      });

      setLeads(
        response?.leads || []
      );
    } catch (error) {
      console.error(
        "Failed to fetch leads:",
        error
      );

      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FETCH PLATFORMS
  // ==========================================

  const fetchPlatforms = async () => {
    try {
      const response =
        await getPlatforms();

      setPlatforms(
        response?.platforms || []
      );
    } catch (error) {
      console.error(
        "Failed to fetch platforms:",
        error
      );

      setPlatforms([]);
    }
  };

  // ==========================================
  // FETCH LEAD STATS
  // ==========================================

  const fetchStats = async () => {
    try {
      setStatsLoading(true);

      const response =
        await getLeadStats();

      setStats(
        response?.stats || {
          totalLeads: 0,
          availableLeads: 0,
          soldLeads: 0,
          reservedLeads: 0,
        }
      );
    } catch (error) {
      console.error(
        "Failed to fetch lead stats:",
        error
      );
    } finally {
      setStatsLoading(false);
    }
  };

  // ==========================================
  // STATUS CHANGE
  // ==========================================

  const handleStatusChange = (
    value: "" | Lead["status"]
  ) => {
    setStatus(value);
  };

  // ==========================================
  // INITIAL DATA
  // ==========================================

  useEffect(() => {
    fetchPlatforms();
    fetchStats();
  }, []);

  // ==========================================
  // FILTER DATA
  // ==========================================

  useEffect(() => {
    fetchLeads();
  }, [
    search,
    platform,
    status,
  ]);

  // ==========================================
  // REFRESH LEADS
  // ==========================================

  const refreshLeads = async () => {
    await Promise.all([
      fetchLeads(),
      fetchStats(),
    ]);
  };

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (
    loading &&
    leads.length === 0
  ) {
    return (
      <div className="space-y-8">

        {/* HEADER */}

        <div>
          <h1 className="text-3xl font-bold">
            Leads
          </h1>

          <p className="text-gray-500 mt-1">
            Manage uploaded leads and inventory
          </p>
        </div>

        {/* LOADING */}

        <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
          Loading leads...
        </div>

      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="space-y-8">

      {/* ======================================
          HEADER
      ====================================== */}

      <div>

        <h1 className="text-3xl font-bold">
          Leads
        </h1>

        <p className="text-gray-500 mt-1">
          Manage uploaded leads and inventory
        </p>

      </div>

      {/* ======================================
          CSV UPLOAD
      ====================================== */}

      <CsvUploadButtons />

      {/* ======================================
          STATISTICS
      ====================================== */}

      <LeadStats
        stats={stats}
        loading={statsLoading}
      />

      {/* ======================================
          FILTERS
      ====================================== */}

      <LeadFilters
        search={search}
        platform={platform}
        status={status}
        platforms={platforms}
        onSearchChange={setSearch}
        onPlatformChange={setPlatform}
        onStatusChange={
          (value: string) => {
            setStatus(
              value as
                | ""
                | Lead["status"]
            );
          }
        }
      />

      {/* ======================================
          LEADS TABLE
      ====================================== */}

      <LeadTable
        leads={leads}
        onRefresh={refreshLeads}
      />

    </div>
  );
}