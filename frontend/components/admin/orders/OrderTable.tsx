"use client";

import { useEffect, useState } from "react";

import { getOrders } from "@/services/orderApi";

import OrderRow from "./OrderRow";

interface OrderTableProps {
  orders: any[];
  onRefresh?: () => void;
}

export default function OrderTable({
  orders: initialOrders,
  onRefresh,
}: OrderTableProps) {
  const [orders, setOrders] = useState<any[]>(
    initialOrders || []
  );

  const [refreshing, setRefreshing] =
    useState(false);

  // Keep local table data synced
  // with parent page data
  useEffect(() => {
    setOrders(initialOrders || []);
  }, [initialOrders]);

  // ==========================================
  // REFRESH ORDERS
  // ==========================================

  const refresh = async () => {
    try {
      setRefreshing(true);

      const response = await getOrders();

      const updatedOrders =
        response?.orders || [];

      setOrders(updatedOrders);

      // Also refresh parent page
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error(
        "Failed to refresh orders:",
        error
      );
    } finally {
      setRefreshing(false);
    }
  };

  // ==========================================
  // EMPTY
  // ==========================================

  if (!orders.length) {
    return (
      <div className="bg-white rounded-2xl shadow p-10 text-center">
        <h2 className="text-xl font-semibold">
          No Orders Found
        </h2>

        <p className="text-gray-500 mt-2">
          There are no customer orders available.
        </p>
      </div>
    );
  }

  // ==========================================
  // TABLE
  // ==========================================

  return (
    <div className="relative bg-white rounded-2xl shadow overflow-hidden">
      {/* Refresh Overlay */}

      {refreshing && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="rounded-xl bg-white px-5 py-3 shadow-lg">
            <span className="text-sm font-medium text-gray-700">
              Refreshing orders...
            </span>
          </div>
        </div>
      )}

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[900px]">
          {/* ======================================
              HEADER
          ====================================== */}

          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                Customer
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                Platform
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                Quantity
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                Amount
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                Date
              </th>

              <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          {/* ======================================
              BODY
          ====================================== */}

          <tbody className="divide-y">
            {orders.map((order) => (
              <OrderRow
                key={order._id}
                order={order}
                refresh={refresh}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}