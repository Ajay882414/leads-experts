"use client";

interface Props {
  search: string;
  status: string;
  onSearchChange: (
    value: string
  ) => void;
  onStatusChange: (
    value: string
  ) => void;
}

export default function UserFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="grid md:grid-cols-2 gap-5">

        <input
          type="text"
          placeholder="Search User..."
          value={search}
          onChange={(e) =>
            onSearchChange(
              e.target.value
            )
          }
          className="border rounded-xl p-3"
        />

        <select
          value={status}
          onChange={(e) =>
            onStatusChange(
              e.target.value
            )
          }
          className="border rounded-xl p-3"
        >
          <option value="">
            All Status
          </option>

          <option value="ACTIVE">
            Active
          </option>

          <option value="BLOCKED">
            Blocked
          </option>

        </select>

      </div>

    </div>
  );
}