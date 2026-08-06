"use client";

interface Props {
  search: string;
  platform: string;
  status: string;

  onSearchChange: (
    value: string
  ) => void;

  onPlatformChange: (
    value: string
  ) => void;

  onStatusChange: (
    value: string
  ) => void;

  platforms: any[];
}

export default function LeadFilters({
  search,
  platform,
  status,
  onSearchChange,
  onPlatformChange,
  onStatusChange,
  platforms,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-5">

      <div className="grid lg:grid-cols-3 gap-5">

        {/* Search */}

        <input
          type="text"
          placeholder="Search Name / Email / Phone"
          value={search}
          onChange={(e) =>
            onSearchChange(
              e.target.value
            )
          }
          className="border rounded-lg h-12 px-4 outline-none focus:border-blue-600"
        />

        {/* Platform */}

        <select
          value={platform}
          onChange={(e) =>
            onPlatformChange(
              e.target.value
            )
          }
          className="border rounded-lg h-12 px-4 outline-none focus:border-blue-600"
        >
          <option value="">
            All Platforms
          </option>

          {platforms.map((item) => (
            <option
              key={item._id}
              value={item._id}
            >
              {item.name}
            </option>
          ))}
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) =>
            onStatusChange(
              e.target.value
            )
          }
          className="border rounded-lg h-12 px-4 outline-none focus:border-blue-600"
        >
          <option value="">
            All Status
          </option>

          <option value="AVAILABLE">
            Available
          </option>

          <option value="SOLD">
            Sold
          </option>

          <option value="RESERVED">
            Reserved
          </option>

        </select>

      </div>

    </div>
  );
}