"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  getOrders,
  getOrderStats,
} from "@/services/orderApi";

import type {
  Order,
  OrderStats,
  OrderStatus,
} from "@/types/order";

import OrderStatsComponent from "@/components/admin/orders/OrderStats";
import OrderTable from "@/components/admin/orders/OrderTable";
import OrderSearch from "@/components/admin/orders/OrderSearch";
import OrderFilters from "@/components/admin/orders/OrderFilters";
import OrderEmpty from "@/components/admin/orders/OrderEmpty";
import OrderLoading from "@/components/admin/orders/OrderLoading";

export default function OrdersPage() {
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [stats, setStats] =
    useState<OrderStats | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState<OrderStatus | "">("");

  // ========================================
  // FETCH ORDERS
  // ========================================

  const fetchOrders =
    useCallback(async () => {
      try {
        setError("");

        const response =
          await getOrders();

        setOrders(
          response.orders || []
        );
      } catch (error) {
        console.error(
          "Failed to fetch orders:",
          error
        );

        setError(
          "Failed to load orders. Please try again."
        );

        setOrders([]);
      }
    }, []);

  // ========================================
  // FETCH STATS
  // ========================================

  const fetchStats =
    useCallback(async () => {
      try {
        const response =
          await getOrderStats();

        setStats(
          response.stats
        );
      } catch (error) {
        console.error(
          "Failed to fetch order stats:",
          error
        );
      }
    }, []);

  // ========================================
  // FETCH ALL DATA
  // ========================================

  const fetchData =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        await Promise.all([
          fetchOrders(),
          fetchStats(),
        ]);
      } finally {
        setLoading(false);
      }
    }, [
      fetchOrders,
      fetchStats,
    ]);

  // ========================================
  // INITIAL LOAD
  // ========================================

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ========================================
  // FILTER ORDERS
  // ========================================

  const filteredOrders =
    useMemo(() => {
      const searchValue =
        search
          .trim()
          .toLowerCase();

      return orders.filter(
        (order) => {
          const customerName =
            order.user?.fullName
              ?.toLowerCase() || "";

          const customerEmail =
            order.user?.email
              ?.toLowerCase() || "";

          const platformName =
            order.platform?.name
              ?.toLowerCase() || "";

          const orderId =
            order._id
              ?.toLowerCase() || "";

          const matchesSearch =
            !searchValue ||
            customerName.includes(
              searchValue
            ) ||
            customerEmail.includes(
              searchValue
            ) ||
            platformName.includes(
              searchValue
            ) ||
            orderId.includes(
              searchValue
            );

          const matchesStatus =
            !status ||
            order.status === status;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      orders,
      search,
      status,
    ]);

  // ========================================
  // REFRESH
  // ========================================

  const refreshOrders =
    async () => {
      await Promise.all([
        fetchOrders(),
        fetchStats(),
      ]);
    };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
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

        <OrderLoading />

      </div>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (error && orders.length === 0) {
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

        <div className="bg-white rounded-xl shadow p-10 text-center">

          <p className="text-red-600 font-medium">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchData}
            className="mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }

  // ========================================
  // UI
  // ========================================

  return (
    <div className="space-y-6">

      {/* ====================================
          HEADER
      ==================================== */}

      <div>
        <h1 className="text-3xl font-bold">
          Orders
        </h1>

        <p className="text-gray-500 mt-2">
          Manage customer purchases
        </p>
      </div>

      {/* ====================================
          STATS
      ==================================== */}

      {stats && (
        <OrderStatsComponent
          stats={stats}
        />
      )}

      {/* ====================================
          SEARCH + FILTER
      ==================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <OrderSearch
          search={search}
          setSearch={setSearch}
        />

        <OrderFilters
          status={status}
          setStatus={setStatus}
        />

      </div>

      {/* ====================================
          SEARCH RESULT INFO
      ==================================== */}

      {(search || status) && (
        <div className="flex items-center justify-between">

          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {filteredOrders.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-700">
              {orders.length}
            </span>{" "}
            orders
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatus("");
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            Clear Filters
          </button>

        </div>
      )}

      {/* ====================================
          ORDERS
      ==================================== */}

      {filteredOrders.length === 0 ? (
        <OrderEmpty />
      ) : (
        <OrderTable
          orders={filteredOrders}
          onRefresh={refreshOrders}
        />
      )}

    </div>
  );
}