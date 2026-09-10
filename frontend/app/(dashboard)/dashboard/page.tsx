"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Users,
  ShoppingBag,
  DownloadCloud,
  CreditCard,
  Layers,
  Sparkles,
} from "lucide-react";

import StatsCard from "@/components/dashboard/StatsCard";
import QuickAction from "@/components/dashboard/QuickAction";
import RecentOrders from "@/components/dashboard/RecentOrders";
import UserCard from "@/components/dashboard/UserCard";

import { getProfile } from "@/services/authApi";
import { getMyOrders } from "@/services/orderApi";
import { getBrowsePlatforms } from "@/services/browseLeadsApi";

import { UserOrder } from "@/types/order";
import { BrowsePlatform } from "@/types/browseLead";

export default function UserDashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [platforms, setPlatforms] = useState<BrowsePlatform[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const [profileRes, ordersRes, platformsRes] = await Promise.all([
        getProfile(),
        getMyOrders(),
        getBrowsePlatforms(),
      ]);

      setUser(profileRes.user);
      setOrders(ordersRes.orders || []);
      setPlatforms(platformsRes || []);
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Aggregate user statistics
  const totalLeadsPurchased = orders.reduce(
    (acc, curr) => acc + (curr.quantity || 0),
    0
  );
  const totalSpent = orders.reduce(
    (acc, curr) => acc + (curr.totalAmount || 0),
    0
  );
  const activePlatformsCount = platforms.filter(
    (p) => p.status === "ACTIVE"
  ).length;

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto space-y-6 pt-4 sm:pt-6 pb-12 animate-pulse">
        <div className="h-32 sm:h-40 rounded-3xl bg-slate-200/70" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-3xl bg-slate-200/70" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80 rounded-3xl bg-slate-200/70" />
          <div className="h-80 rounded-3xl bg-slate-200/70" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pt-18 sm:pt-20 pb-12">
      {/* Welcome Banner */}
      <UserCard user={user} />

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatsCard
          title="Total Leads Bought"
          value={totalLeadsPurchased.toLocaleString("en-IN")}
          icon={Users}
          color="#3B82F6"
          subtitle="Allocated to your account"
        />
        <StatsCard
          title="Total Orders"
          value={orders.length}
          icon={ShoppingBag}
          color="#10B981"
          subtitle="Successful purchases"
        />
        <StatsCard
          title="Total Investment"
          value={`₹${totalSpent.toLocaleString("en-IN")}`}
          icon={CreditCard}
          color="#8B5CF6"
          subtitle="Total spent on leads"
        />
        <StatsCard
          title="Live Platforms"
          value={activePlatformsCount}
          icon={Layers}
          color="#F59E0B"
          subtitle="Channels ready to order"
        />
      </div>

      {/* Quick Actions & Recent Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <RecentOrders orders={orders} />
        </div>

        {/* Right: Quick Access Shortcuts */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
            Quick Shortcuts
          </h3>
          <div className="space-y-3">
            <QuickAction
              title="Browse Lead Markets"
              description="Purchase fresh verified leads"
              href="/browse-leads"
              icon={Sparkles}
              badge="Hot"
            />
            <QuickAction
              title="Download CSV Files"
              description="Export your bought lead batches"
              href="/downloads"
              icon={DownloadCloud}
            />
            <QuickAction
              title="Manage Orders"
              description="Review past invoice details"
              href="/orders"
              icon={ShoppingBag}
            />
          </div>
        </div>
      </div>
    </div>
  );
}