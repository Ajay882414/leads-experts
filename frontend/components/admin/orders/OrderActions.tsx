"use client";

import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { deleteOrder } from "@/services/orderApi";

interface OrderActionsProps {
  orderId: string;
  refresh: () => void;
}

export default function OrderActions({
  orderId,
  refresh,
}: OrderActionsProps) {
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) return;

    try {
      await deleteOrder(orderId);

      alert("Order deleted successfully");

      refresh();
    } catch (error) {
      console.error("Delete order error:", error);

      alert("Failed to delete order");
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* VIEW */}
      <Link
        href={`/admin/orders/${orderId}`}
        title="View Order"
        className="inline-flex items-center justify-center rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
      >
        <Eye size={18} />
      </Link>

      {/* EDIT */}
      <Link
        href={`/admin/orders/edit/${orderId}`}
        title="Edit Order"
        className="inline-flex items-center justify-center rounded-lg p-2 text-green-600 transition hover:bg-green-50"
      >
        <Pencil size={18} />
      </Link>

      {/* DELETE */}
      <button
        type="button"
        onClick={handleDelete}
        title="Delete Order"
        className="inline-flex items-center justify-center rounded-lg p-2 text-red-600 transition hover:bg-red-50"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}