"use client";

import {
  updateOrderStatus,
  deleteOrder,
} from "@/services/orderApi";

interface Props {
  order: any;
  refresh: () => void;
}

export default function OrderRow({
  order,
  refresh,
}: Props) {
  const handleStatus = async (
    status: string
  ) => {
    await updateOrderStatus(
      order._id,
      status
    );

    refresh();
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Delete this order?"
      )
    )
      return;

    await deleteOrder(order._id);

    refresh();
  };

  return (
    <tr className="border-b">

      <td className="p-4">
        {order.user?.fullName}
      </td>

      <td>
        {order.platform?.name}
      </td>

      <td>
        {order.quantity}
      </td>

      <td>
        ₹{order.totalAmount}
      </td>

      <td>

        <select
          value={order.status}
          onChange={(e) =>
            handleStatus(
              e.target.value
            )
          }
          className="border rounded-lg px-2 py-1"
        >
          <option>
            Pending
          </option>

          <option>
            Completed
          </option>

          <option>
            Cancelled
          </option>

        </select>

      </td>

      <td>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-3 py-1 rounded-lg"
        >
          Delete
        </button>

      </td>

    </tr>
  );
}