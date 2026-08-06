"use client";

import StatsCards from "./StatsCards";

import { DashboardStats } from "@/types/dashboard";

interface Props {
  stats: DashboardStats;
}

export default function DashboardOverview({
  stats}: Props) {
  return (
    <div className="space-y-8">

      <StatsCards stats={stats} />

      

    </div>
  );
}