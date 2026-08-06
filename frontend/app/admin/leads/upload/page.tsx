"use client";

import UploadLeadForm from "@/components/admin/lead/UploadLeadForm";

export default function UploadLeadPage() {
  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Upload Leads
        </h1>

        <p className="text-gray-500 mt-2">
          Upload CSV or Excel file
        </p>

      </div>

      <UploadLeadForm />

    </div>
  );
}