"use client";

interface Props {
  status: string;
  setStatus: (value: string) => void;
}

export default function OrderFilters({
  status,
  setStatus,
}: Props) {
  return (
    <div className="flex gap-4 mb-5">

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="border rounded-lg px-4 py-2"
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