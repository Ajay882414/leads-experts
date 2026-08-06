"use client";

import {
  Users,
  Database,
  Layers3,
  CheckCircle,
  ShoppingCart,
  Clock3,
} from "lucide-react";

import { DashboardStats } from "@/types/dashboard";

interface Props {
  stats: DashboardStats;
}

export default function StatsCards({
  stats,
}: Props) {
  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Platforms",
      value: stats.totalPlatforms,
      icon: Layers3,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Leads",
      value: stats.totalLeads,
      icon: Database,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Available",
      value: stats.availableLeads,
      icon: CheckCircle,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Sold",
      value: stats.soldLeads,
      icon: ShoppingCart,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Reserved",
      value: stats.reservedLeads,
      icon: Clock3,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-sm border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>
              </div>

              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.color}`}
              >
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}