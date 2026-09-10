"use client";

import type { OrderStatus } from "@/types/order";

interface Props {
  status: OrderStatus | "";
  setStatus: (
    value: OrderStatus | ""
  ) => void;
}

export default function OrderFilters({
  status,
  setStatus,
}: Props) {
  return (
    <div className="w-full">

      <select
        value={status}
        onChange={(event) =>
          setStatus(
            event.target.value as
              | OrderStatus
              | ""
          )
        }
        className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">
          All Orders
        </option>

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
  );
}