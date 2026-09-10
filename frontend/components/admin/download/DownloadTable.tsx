"use client";

import { useState } from "react";
import { Download, Trash2 } from "lucide-react";

import {
  deleteDownload,
  downloadLeadFile,
} from "@/services/downloadApi";

import DownloadActions from "./DownloadActions";

import type {
  Download as DownloadType,
} from "@/types/download";

type CsvLead = {
  fullName?: unknown;
  phone?: unknown;
  age?: unknown;
  gender?: unknown;
  profession?: unknown;
  source?: unknown;
  status?: unknown;
};

interface Props {
  downloads: DownloadType[];

  onDeleted?: (id: string) => void;
}

/* =====================================================
   ESCAPE CSV VALUE
===================================================== */

const escapeCsvValue = (
  value: unknown
): string => {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  const stringValue = String(value);

  return `"${stringValue.replace(
    /"/g,
    '""'
  )}"`;
};

/* =====================================================
   CREATE CSV
===================================================== */

const createCsv = (
  leads: CsvLead[]
): string => {
  const headers = [
    "Full Name",
    "Phone",
    "Age",
    "Gender",
    "Profession",
    "Source",
    "Status",
  ];

  const rows = leads.map((lead) => [
    escapeCsvValue(lead.fullName),
    escapeCsvValue(lead.phone),
    escapeCsvValue(lead.age),
    escapeCsvValue(lead.gender),
    escapeCsvValue(lead.profession),
    escapeCsvValue(lead.source),
    escapeCsvValue(lead.status),
  ]);

  return [
    headers.map(escapeCsvValue).join(","),
    ...rows.map((row) =>
      row.join(",")
    ),
  ].join("\n");
};

/* =====================================================
   DOWNLOAD CSV FILE
===================================================== */

const saveCsvFile = (
  csv: string,
  fileName: string
) => {
  const blob = new Blob(
    [csv],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download = fileName;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
};

/* =====================================================
   COMPONENT
===================================================== */

export default function DownloadTable({
  downloads,
  onDeleted,
}: Props) {
  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [downloadingId, setDownloadingId] =
    useState<string | null>(null);

  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = async (
    id: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this download record?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await deleteDownload(id);

      onDeleted?.(id);

    } catch (error) {
      console.error(
        "Delete download error:",
        error
      );

      alert(
        "Failed to delete download record."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =====================================================
     DOWNLOAD
  ===================================================== */

  const handleDownload = async (
    item: DownloadType
  ) => {
    if (!item.order?._id) {
      alert(
        "Order information not available."
      );

      return;
    }

    try {
      setDownloadingId(item._id);

      const response =
        await downloadLeadFile(
          item.order._id
        );

      const leads =
        response?.leads || [];

      if (!leads.length) {
        alert(
          "No leads found for this order."
        );

        return;
      }

      const csv =
        createCsv(leads);

      const originalName =
        item.fileName ||
        `order-${item.order._id}.csv`;

      const fileName =
        originalName.toLowerCase().endsWith(
          ".csv"
        )
          ? originalName
          : `${originalName}.csv`;

      saveCsvFile(
        csv,
        fileName
      );

    } catch (error) {
      console.error(
        "Download leads error:",
        error
      );

      alert(
        "Failed to download lead file."
      );
    } finally {
      setDownloadingId(null);
    }
  };

  /* =====================================================
     EMPTY
  ===================================================== */

  if (!downloads.length) {
    return null;
  }

  /* =====================================================
     TABLE
  ===================================================== */

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                User
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Platform
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Leads
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Amount
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                File
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Date
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {downloads.map(
              (item) => {
                const isDeleting =
                  deletingId ===
                  item._id;

                const isDownloading =
                  downloadingId ===
                  item._id;

                return (
                  <tr
                    key={item._id}
                    className="border-t border-gray-100 transition hover:bg-gray-50"
                  >
                    {/* USER */}

                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {typeof item.user === "object" &&
                          item.user?.fullName
                            ? item.user.fullName
                            : "-"}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {typeof item.user === "object" &&
                          item.user?.email
                            ? item.user.email
                            : "-"}
                        </p>
                      </div>
                    </td>

                    {/* PLATFORM */}

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                        {item.platform
                          ?.name ||
                          "-"}
                      </span>
                    </td>

                    {/* LEADS */}

                    <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                      {item.totalLeads}
                    </td>

                    {/* AMOUNT */}

                    <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                      ₹
                      {(
                        item.order
                          ?.totalAmount ||
                        0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    {/* FILE */}

                    <td className="px-5 py-4">
                      <span className="text-sm text-gray-600">
                        {item.fileName ||
                          "-"}
                      </span>
                    </td>

                    {/* DATE */}

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {item.downloadedAt
                        ? new Date(
                            item.downloadedAt
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : "-"}
                    </td>

                    {/* ACTIONS */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          disabled={
                            isDownloading ||
                            isDeleting
                          }
                          onClick={() =>
                            handleDownload(
                              item
                            )
                          }
                          title="Download CSV"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-blue-600 transition hover:bg-blue-50 hover:text-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Download
                            size={18}
                            className={
                              isDownloading
                                ? "animate-pulse"
                                : ""
                            }
                          />
                        </button>

                        <button
                          type="button"
                          disabled={
                            isDeleting ||
                            isDownloading
                          }
                          onClick={() =>
                            handleDelete(
                              item._id
                            )
                          }
                          title="Delete"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-red-600 transition hover:bg-red-50 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2
                            size={18}
                            className={
                              isDeleting
                                ? "animate-pulse"
                                : ""
                            }
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}