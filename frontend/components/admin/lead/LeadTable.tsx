"use client";

import Link from "next/link";
import { Lead } from "@/types/lead";

interface Props {
  leads: Lead[];
  onRefresh?: () => void | Promise<void>;
}

export default function LeadTable({
  leads,
  onRefresh,
}: Props) {
  // ==========================================
  // GET PLATFORM NAME
  // ==========================================

  const getPlatformName = (
    platform: Lead["platform"]
  ) => {
    if (!platform) {
      return "-";
    }

    // If backend returns populated platform object
    if (
      typeof platform === "object" &&
      "name" in platform
    ) {
      return platform.name || "-";
    }

    // If backend returns only platform ID
    return "-";
  };

  // ==========================================
  // STATUS BADGE
  // ==========================================

  const getStatusClass = (
    status: Lead["status"]
  ) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-700";

      case "RESERVED":
        return "bg-yellow-100 text-yellow-700";

      case "SOLD":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (!leads.length) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <div className="text-gray-400 text-lg">
          No leads found
        </div>

        <p className="text-gray-500 mt-2">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  // ==========================================
  // TABLE
  // ==========================================

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          {/* ======================================
              HEADER
          ====================================== */}

          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Name
              </th>

              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Platform
              </th>

              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Phone
              </th>

              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Age
              </th>

              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Gender
              </th>

              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Profession
              </th>

              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Source
              </th>

              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>

              <th className="p-4 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          {/* ======================================
              BODY
          ====================================== */}

          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="border-b last:border-b-0 hover:bg-gray-50 transition"
              >
                {/* ==================================
                    NAME
                ================================== */}

                <td className="p-4">
                  <div className="font-semibold text-gray-900">
                    {lead.fullName || "-"}
                  </div>
                </td>

                {/* ==================================
                    PLATFORM
                ================================== */}

                <td className="p-4">
                  <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                    {getPlatformName(
                      lead.platform
                    )}
                  </span>
                </td>

                {/* ==================================
                    PHONE
                ================================== */}

                <td className="p-4">
                  <span className="text-gray-700">
                    {lead.phone || "-"}
                  </span>
                </td>

                {/* ==================================
                    AGE
                ================================== */}

                <td className="p-4">
                  <span className="text-gray-700">
                    {lead.age ?? "-"}
                  </span>
                </td>

                {/* ==================================
                    GENDER
                ================================== */}

                <td className="p-4">
                  <span className="text-gray-700">
                    {lead.gender || "-"}
                  </span>
                </td>

                {/* ==================================
                    PROFESSION
                ================================== */}

                <td className="p-4">
                  <span className="text-gray-700">
                    {lead.profession || "-"}
                  </span>
                </td>

                {/* ==================================
                    SOURCE
                ================================== */}

                <td className="p-4">
                  <span className="text-gray-700">
                    {lead.source || "-"}
                  </span>
                </td>

                {/* ==================================
                    STATUS
                ================================== */}

                <td className="p-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </span>
                </td>

                {/* ==================================
                    ACTIONS
                ================================== */}

                <td className="p-4">
                  <div className="flex items-center justify-center gap-3">
                    {/* EDIT */}

                    <Link
                      href={`/admin/leads/${lead._id}/edit`}
                      className="px-3 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50"
                    >
                      Edit
                    </Link>

                    {/* REFRESH */}

                    {onRefresh && (
                      <button
                        type="button"
                        onClick={() =>
                          onRefresh()
                        }
                        className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
                      >
                        Refresh
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ==========================================
          TOTAL
      ========================================== */}

      <div className="border-t bg-gray-50 px-5 py-3">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-700">
            {leads.length}
          </span>{" "}
          leads
        </p>
      </div>
    </div>
  );
}