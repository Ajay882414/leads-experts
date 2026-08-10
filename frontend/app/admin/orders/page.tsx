"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getOrders,
  getOrderStats,
} from "@/services/orderApi";

import OrderStats from "@/components/admin/orders/OrderStats";
import OrderTable from "@/components/admin/orders/OrderTable";
import OrderSearch from "@/components/admin/orders/OrderSearch";
import OrderFilters from "@/components/admin/orders/OrderFilters";
import OrderEmpty from "@/components/admin/orders/OrderEmpty";

export default function OrdersPage() {
  const [orders, setOrders] =
    useState<any[]>([]);

  const [stats, setStats] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [orderRes, statsRes] =
        await Promise.all([
          getOrders(),
          getOrderStats(),
        ]);

      setOrders(orderRes.orders);

      setStats(statsRes.stats);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders =
    useMemo(() => {
      return orders.filter(
        (item: any) => {
          const matchSearch =
            item.user?.fullName
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            item.user?.email
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchStatus =
            !status ||
            item.status === status;

          return (
            matchSearch &&
            matchStatus
          );
        }
      );
    }, [
      orders,
      search,
      status,
    ]);

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Orders
        </h1>

        <p className="text-gray-500 mt-2">
          Manage customer purchases
        </p>

      </div>

      {stats && (
        <OrderStats stats={stats} />
      )}

      <div className="grid md:grid-cols-2 gap-4">

        <OrderSearch
          search={search}
          setSearch={setSearch}
        />

        <OrderFilters
          status={status}
          setStatus={setStatus}
        />

      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          Loading Orders...
        </div>
      ) : filteredOrders.length ===
        0 ? (
        <OrderEmpty />
      ) : (
        <OrderTable
          orders={
            filteredOrders
          }
        />
      )}

    </div>
  );
}