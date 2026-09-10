"use client";

import { Lead } from "@/types/lead";

interface Platform {
  _id: string;
  name: string;
}

interface Props {
  search: string;

  platform: string;

  status:
    | ""
    | Lead["status"];

  onSearchChange: (
    value: string
  ) => void;

  onPlatformChange: (
    value: string
  ) => void;

  onStatusChange: (
    value:
      | ""
      | Lead["status"]
  ) => void;

  platforms: Platform[];
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
    <div className="bg-white rounded-2xl shadow p-5">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* =====================================
            SEARCH
        ===================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Search Leads
          </label>

          <input
            type="text"
            placeholder="Name / Phone / Profession / Source"
            value={search}
            onChange={(e) =>
              onSearchChange(
                e.target.value
              )
            }
            className="border border-gray-300 rounded-xl h-12 px-4 w-full outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* =====================================
            PLATFORM
        ===================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Platform
          </label>

          <select
            value={platform}
            onChange={(e) =>
              onPlatformChange(
                e.target.value
              )
            }
            className="border border-gray-300 rounded-xl h-12 px-4 w-full outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          >
            <option value="">
              All Platforms
            </option>

            {platforms.map(
              (item) => (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </option>
              )
            )}
          </select>
        </div>

        {/* =====================================
            STATUS
        ===================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Status
          </label>

          <select
            value={status}
            onChange={(e) => {
              const value =
                e.target.value;

              if (
                value === "" ||
                value ===
                  "AVAILABLE" ||
                value ===
                  "RESERVED" ||
                value === "SOLD"
              ) {
                onStatusChange(
                  value
                );
              }
            }}
            className="border border-gray-300 rounded-xl h-12 px-4 w-full outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          >
            <option value="">
              All Status
            </option>

            <option value="AVAILABLE">
              Available
            </option>

            <option value="RESERVED">
              Reserved
            </option>

            <option value="SOLD">
              Sold
            </option>
          </select>
        </div>

      </div>

    </div>
  );
}