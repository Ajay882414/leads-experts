"use client";

import Link from "next/link";
import { Trash2, Pencil, Eye } from "lucide-react";
import { deleteOrder } from "@/services/orderApi";

interface Props {
  orderId: string;
  refresh: () => void;
}

export default function OrderActions({
  orderId,
  refresh,
}: Props) {
  const handleDelete = async () => {
    const ok = confirm(
      "Delete this order?"
    );

    if (!ok) return;

    try {
      await deleteOrder(orderId);

      alert(
        "Order Deleted Successfully"
      );

      refresh();
    } catch {
      alert("Delete Failed");
    }
  };

  return (
    <div className="flex gap-3">

      <Link
        href={`/admin/orders/${orderId}`}
        className="text-blue-600"
      >
        <Eye size={18} />
      </Link>

      <Link
        href={`/admin/orders/edit/${orderId}`}
        className="text-green-600"
      >
        <Pencil size={18} />
      </Link>

      <button
        onClick={handleDelete}
        className="text-red-600"
      >
        <Trash2 size={18} />
      </button>

    </div>
  );
}