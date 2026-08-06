"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import LeadTable from "@/components/admin/lead/LeadTable";
import LeadStats from "@/components/admin/lead/LeadStats";
import LeadFilters from "@/components/admin/lead/LeadFilters";
import CsvUploadButtons from "@/components/admin/lead/CsvUploadButton";
import {
  getLeads,
  deleteLead,
  getLeadStats,
} from "@/services/leadApi";

import { getPlatforms } from "@/services/platformApi";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);

  const [platforms, setPlatforms] = useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [platform, setPlatform] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [stats, setStats] =
    useState({
      totalLeads: 0,
      availableLeads: 0,
      soldLeads: 0,
      reservedLeads: 0,
    });

  // ===========================
  // Fetch Leads
  // ===========================

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const res = await getLeads({
        search,
        platform,
        status,
      });

      setLeads(res.leads);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Fetch Platforms
  // ===========================

  const fetchPlatforms =
    async () => {
      try {
        const res =
          await getPlatforms();

        setPlatforms(
          res.platforms
        );
      } catch (error) {
        console.log(error);
      }
    };

  // ===========================
  // Fetch Stats
  // ===========================

  const fetchStats = async () => {
    try {
      const res =
        await getLeadStats();

      setStats(res.stats);
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================
  // Delete Lead
  // ===========================

  const handleDelete = async (
    id: string
  ) => {
    const ok = confirm(
      "Delete this lead?"
    );

    if (!ok) return;

    try {
      await deleteLead(id);

      fetchLeads();

      fetchStats();
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================
  // Effects
  // ===========================

  useEffect(() => {
    fetchPlatforms();

    fetchStats();
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [
    search,
    platform,
    status,
  ]);

  // ===========================
  // Loading
  // ===========================

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  // ===========================
  // UI
  // ===========================

  return (
    <div className="space-y-8">

      {/* Page Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <h1 className="text-3xl font-bold">
            Leads
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all leads
          </p>

        </div>

        <Link
          href="/admin/leads/create"
          className="bg-blue-600 hover:bg-blue-700 w-fit text-white px-6 py-3 rounded-lg"
        >
          + Add Lead
        </Link>

      </div>

      <CsvUploadButtons />

      {/* Statistics */}

      <LeadStats stats={stats} />

      {/* Filters */}

      <LeadFilters
        search={search}
        platform={platform}
        status={status}
        platforms={platforms}
        onSearchChange={
          setSearch
        }
        onPlatformChange={
          setPlatform
        }
        onStatusChange={
          setStatus
        }
      />

      {/* Table */}

      <LeadTable
        leads={leads}
        onDelete={
          handleDelete
        }
      />

    </div>
  );
}