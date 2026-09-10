"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import UploadLeadForm from "@/components/admin/lead/UploadLeadForm";

export default function UploadLeadPage() {
  return (
    <div className="space-y-8">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Upload Leads
          </h1>

          <p className="text-gray-500 mt-1">
            Upload bulk leads using CSV or Excel
            file
          </p>
        </div>

        <Link
          href="/admin/leads"
          className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 px-5 py-3 rounded-xl font-semibold w-fit"
        >
          <ArrowLeft size={18} />
          Back to Leads
        </Link>

      </div>

      {/* =====================================
          UPLOAD FORM
      ===================================== */}

      <UploadLeadForm />

      {/* =====================================
          INFORMATION
      ===================================== */}

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">

        <h2 className="font-bold text-lg text-blue-900">
          Bulk Upload Information
        </h2>

        <ul className="mt-4 space-y-2 text-sm text-blue-800">

          <li>
            • Upload CSV, XLS or XLSX files.
          </li>

          <li>
            • Maximum file size is 20 MB.
          </li>

          <li>
            • Name, Phone and Age are required.
          </li>

          <li>
            • Duplicate phone numbers for the
            same platform are automatically
            skipped.
          </li>

          <li>
            • New leads are automatically added
            with AVAILABLE status.
          </li>

          <li>
            • Leads can only be uploaded to an
            active platform.
          </li>

        </ul>

      </div>

    </div>
  );
}