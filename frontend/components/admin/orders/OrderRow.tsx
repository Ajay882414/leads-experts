"use client";

import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import {
  deleteOrder,
  updateOrderStatus,
} from "@/services/orderApi";

import type {
  Order,
  OrderStatus,
} from "@/types/order";

import OrderStatusBadge from "./OrderStatusBadge";

interface Props {
  order: Order;
  refresh: () => void | Promise<void>;
}

export default function OrderRow({
  order,
  refresh,
}: Props) {
  const [updating, setUpdating] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  // ========================================
  // UPDATE STATUS
  // ========================================

  const handleStatusChange = async (
    status: OrderStatus
  ) => {
    if (status === order.status) {
      return;
    }

    try {
      setUpdating(true);

      await updateOrderStatus(
        order._id,
        status
      );

      await refresh();
    } catch (error) {
      console.error(
        "Failed to update order status:",
        error
      );

      alert(
        "Failed to update order status"
      );
    } finally {
      setUpdating(false);
    }
  };

  // ========================================
  // DELETE ORDER
  // ========================================

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete order ${order._id}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      await deleteOrder(order._id);

      await refresh();
    } catch (error) {
      console.error(
        "Failed to delete order:",
        error
      );

      alert(
        "Failed to delete order"
      );
    } finally {
      setDeleting(false);
    }
  };

  // ========================================
  // DATE
  // ========================================

  const formattedDate =
    order.createdAt
      ? new Date(
          order.createdAt
        ).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "-";

  return (
    <tr className="border-b last:border-b-0 hover:bg-gray-50 transition">

      {/* ====================================
          CUSTOMER
      ==================================== */}

      <td className="px-5 py-4">

        <div>
          <p className="font-semibold text-gray-900">
            {order.user?.fullName || "Unknown User"}
          </p>

          <p className="text-sm text-gray-500 mt-1">
            {order.user?.email || "-"}
          </p>
        </div>

      </td>

      {/* ====================================
          PLATFORM
      ==================================== */}

      <td className="px-5 py-4">

        <span className="font-medium text-gray-800">
          {order.platform?.name || "-"}
        </span>

      </td>

      {/* ====================================
          QUANTITY
      ==================================== */}

      <td className="px-5 py-4">

        <span className="font-medium">
          {order.quantity}
        </span>

      </td>

      {/* ====================================
          AMOUNT
      ==================================== */}

      <td className="px-5 py-4">

        <div>
          <p className="font-semibold text-gray-900">
            ₹
            {Number(
              order.totalAmount || 0
            ).toLocaleString("en-IN")}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            ₹
            {Number(
              order.pricePerLead || 0
            ).toLocaleString("en-IN")}
            {" / lead"}
          </p>
        </div>

      </td>

      {/* ====================================
          STATUS
      ==================================== */}

      <td className="px-5 py-4">

        <div className="flex flex-col gap-2">

          <OrderStatusBadge
            status={order.status}
          />

          <select
            value={order.status}
            disabled={
              updating ||
              deleting
            }
            onChange={(event) =>
              handleStatusChange(
                event.target.value as OrderStatus
              )
            }
            className="border border-gray-200 rounded-lg px-2 py-1 text-xs bg-white outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value="Pending">
              Pending
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="Cancelled">
              Cancelled
            </option>
          </select>

        </div>

      </td>

      {/* ====================================
          ACTIONS
      ==================================== */}

      <td className="px-5 py-4">

        <div className="flex items-center gap-3">

          {/* VIEW */}

          <Link
            href={`/admin/orders/${order._id}`}
            title="View Order"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-blue-600 hover:bg-blue-50 transition"
          >
            <Eye size={18} />
          </Link>

          {/* EDIT */}

          <Link
            href={`/admin/orders/edit/${order._id}`}
            title="Edit Order"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-green-600 hover:bg-green-50 transition"
          >
            <Pencil size={18} />
          </Link>

          {/* DELETE */}

          <button
            type="button"
            title="Delete Order"
            disabled={
              deleting ||
              updating
            }
            onClick={
              handleDelete
            }
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-red-600 hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2
              size={18}
              className={
                deleting
                  ? "animate-pulse"
                  : ""
              }
            />
          </button>

        </div>

        {/* DATE */}

        <p className="text-xs text-gray-400 mt-2">
          {formattedDate}
        </p>

      </td>

    </tr>
  );
}