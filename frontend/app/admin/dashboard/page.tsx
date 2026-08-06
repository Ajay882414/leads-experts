"use client";

import { useEffect, useState } from "react";

import DashboardOverview from "@/components/admin/dashboard/DashboardOverview";
import DashboardCharts from "@/components/admin/dashboard/DashboardCharts";
import DashboardTables from "@/components/admin/dashboard/DashboardTables";
import DashboardActions from "@/components/admin/dashboard/DashboardActions";

import {
  getDashboardStats,
  getRecentUsers,
  getRecentLeads,
  getLeadChart,
  getPlatformChart,
} from "@/services/adminApi";

import { DashboardStats } from "@/types/dashboard";

export default function AdminDashboardPage() {
  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState<DashboardStats>({
      totalUsers: 0,
      totalPlatforms: 0,
      totalLeads: 0,
      availableLeads: 0,
      soldLeads: 0,
      reservedLeads: 0,
    });

  const [users, setUsers] =
    useState<any[]>([]);

  const [leads, setLeads] =
    useState<any[]>([]);

  const [leadChart, setLeadChart] =
    useState<any[]>([]);

  const [
    platformChart,
    setPlatformChart,
  ] = useState<any[]>([]);

  const fetchDashboard =
    async () => {
      try {
        const [
          statsRes,
          usersRes,
          leadsRes,
          leadChartRes,
          platformChartRes,
        ] = await Promise.all([
          getDashboardStats(),
          getRecentUsers(),
          getRecentLeads(),
          getLeadChart(),
          getPlatformChart(),
        ]);

        setStats(statsRes.stats);

        setUsers(usersRes.users);

        setLeads(leadsRes.leads);

        setLeadChart(
          leadChartRes.chart
        );

        setPlatformChart(
          platformChartRes.platforms
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-10">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <DashboardOverview
        stats={stats}
      />

      <DashboardCharts
        leadChart={leadChart}
        platformChart={platformChart}
      />

      <DashboardTables
        users={users}
        leads={leads}
      />

      <DashboardActions />

    </div>
  );
}