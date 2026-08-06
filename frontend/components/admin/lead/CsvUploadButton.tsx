"use client";

import Link from "next/link";
import { Upload, Download } from "lucide-react";

export default function CsvUploadButtons() {
  const downloadSample = () => {
    const csv = `Full Name,Email,Phone,Country,State,City,Business,Category,Price
Ajay Sharma,ajay@gmail.com,9876543210,India,Rajasthan,Jaipur,Ecommerce,Instagram,150
Rahul Sharma,rahul@gmail.com,9999999999,India,Delhi,Delhi,Education,Facebook,200`;

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = "sample-leads.csv";

    link.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-4">

      <Link
        href="/admin/leads/upload"
        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
      >
        <Upload size={18} />
        Upload CSV
      </Link>

      <button
        onClick={downloadSample}
        className="flex items-center gap-2 border border-gray-300 px-5 py-3 rounded-xl hover:bg-gray-100"
      >
        <Download size={18} />
        Download Sample CSV
      </button>

    </div>
  );
}