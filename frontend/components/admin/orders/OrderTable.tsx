"use client";

import { getOrders } from "@/services/orderApi";
import { useState } from "react";

import OrderRow from "./OrderRow";

interface Props {
  orders: any[];
}

export default function OrderTable({
  orders: initialOrders,
}: Props) {

  const [orders, setOrders] =
    useState(initialOrders);

  const refresh =
    async () => {
      const res =
        await getOrders();

      setOrders(
        res.orders
      );
    };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4 text-left">
              Customer
            </th>

            <th className="text-left">
              Platform
            </th>

            <th className="text-left">
              Quantity
            </th>

            <th className="text-left">
              Amount
            </th>

            <th className="text-left">
              Status
            </th>

            <th className="text-left">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {orders.map(
            (order: any) => (
              <OrderRow
                key={order._id}
                order={order}
                refresh={refresh}
              />
            )
          )}

        </tbody>

      </table>

    </div>
  );
}