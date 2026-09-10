"use client";

import Link from "next/link";

import {
  Upload,
  Download,
} from "lucide-react";

export default function CsvUploadButtons() {

  // ==========================================
  // DOWNLOAD SAMPLE CSV
  // ==========================================

  const downloadSample = () => {
    const csv = `Timestamp,Name,Phone,Age,Gender,Profession,Source
2026-08-20 10:30:00,Ajay Sharma,9876543210,28,Male,Business Owner,Instagram
2026-08-20 11:00:00,Rahul Sharma,9876543211,32,Male,Teacher,Facebook
2026-08-20 11:30:00,Priya Sharma,9876543212,26,Female,Designer,Instagram`;

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
    link.download =
      "sample-leads.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-4">

      {/* =====================================
          UPLOAD
      ===================================== */}

      <Link
        href="/admin/leads/upload"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition"
      >
        <Upload size={18} />

        Upload Leads
      </Link>

      {/* =====================================
          SAMPLE
      ===================================== */}

      <button
        type="button"
        onClick={downloadSample}
        className="inline-flex items-center gap-2 border border-gray-300 hover:bg-gray-100 px-5 py-3 rounded-xl font-semibold transition"
      >
        <Download size={18} />

        Download Sample CSV
      </button>

    </div>
  );
}