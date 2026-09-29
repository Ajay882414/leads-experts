"use client";

import { useEffect, useState } from "react";
import { uploadLeads } from "@/services/leadApi";
import { getPlatforms } from "@/services/platformApi";
import { getPackagesByPlatform } from "@/services/packageApi";
import { Package } from "@/types/package";

interface Platform {
  _id: string;
  name: string;
  status?: "ACTIVE" | "INACTIVE";
}

interface UploadResult {
  success?: boolean;
  message?: string;
  inserted?: number;
  duplicates?: number;
  invalid?: number;
  totalRows?: number;
  package?: {
    id: string;
    name: string;
    platform: string;
  };
}

export default function UploadLeadForm() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [platform, setPlatform] = useState("");
  const [packages, setPackages] = useState<Package[]>([]);
  const [packageId, setPackageId] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [platformLoading, setPlatformLoading] = useState(true);
  const [packagesLoading, setPackagesLoading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const fetchPlatforms = async () => {
    try {
      setPlatformLoading(true);
      const response = await getPlatforms();
      const activePlatforms = (response?.platforms || []).filter(
        (item: Platform) =>
          item.status === undefined || item.status === "ACTIVE"
      );
      setPlatforms(activePlatforms);
    } catch (error) {
      console.error("Failed to fetch platforms:", error);
      setPlatforms([]);
    } finally {
      setPlatformLoading(false);
    }
  };

  // Jab bhi platform change ho, uske packages fetch karo
  const handlePlatformChange = async (selectedId: string) => {
    setPlatform(selectedId);
    setPackageId("");
    setPackages([]);

    if (!selectedId) return;

    try {
      setPackagesLoading(true);
      const res = await getPackagesByPlatform(selectedId);
      setPackages(res.packages || []);
    } catch {
      setPackages([]);
    } finally {
      setPackagesLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setResult(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const allowedExtensions = [".csv", ".xlsx", ".xls"];
    const fileName = selectedFile.name.toLowerCase();
    const isAllowed = allowedExtensions.some((ext) => fileName.endsWith(ext));

    if (!isAllowed) {
      alert("Please select a CSV or Excel file.");
      e.target.value = "";
      setFile(null);
      return;
    }

    if (selectedFile.size > 20 * 1024 * 1024) {
      alert("File size must be less than 20 MB.");
      e.target.value = "";
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!platform) {
      alert("Please select a platform.");
      return;
    }

    if (!packageId) {
      alert("Please select a specific package card for this CSV.");
      return;
    }

    if (!file) {
      alert("Please select a CSV or Excel file.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const formData = new FormData();
      formData.append("packageId", packageId);
      formData.append("file", file);

      const response = await uploadLeads(formData);
      setResult(response);
      alert(response?.message || "Leads uploaded successfully to this card.");

      setFile(null);
      const fileInput = document.getElementById(
        "lead-file"
      ) as HTMLInputElement | null;
      if (fileInput) fileInput.value = "";
    } catch (error: any) {
      alert(
        error?.response?.data?.message || "Lead upload failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadSample = () => {
    const csv = `Timestamp,Name,Phone,Age,Gender,Profession,Source
2026-08-20 10:30:00,Ajay Sharma,9876543210,28,Male,Business Owner,Instagram
2026-08-20 11:00:00,Rahul Sharma,9876543211,32,Male,Teacher,Facebook
2026-08-20 11:30:00,Priya Sharma,9876543212,26,Female,Designer,Instagram`;

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sample-leads.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Step 1: Select Platform */}
        <div>
          <label className="font-semibold block mb-2 text-sm text-gray-700">
            1. Select Platform *
          </label>
          <select
            value={platform}
            onChange={(e) => handlePlatformChange(e.target.value)}
            disabled={platformLoading || loading}
            className="w-full border border-gray-300 rounded-xl p-3 text-sm outline-none focus:border-blue-600 disabled:bg-gray-100"
          >
            <option value="">
              {platformLoading ? "Loading platforms..." : "Select Platform"}
            </option>
            {platforms.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Step 2: Select Package Card */}
        <div>
          <label className="font-semibold block mb-2 text-sm text-gray-700">
            2. Select Package Card / Sub-Platform *
          </label>
          <select
            value={packageId}
            onChange={(e) => setPackageId(e.target.value)}
            disabled={packagesLoading || !platform || loading}
            className="w-full border border-gray-300 rounded-xl p-3 text-sm outline-none focus:border-blue-600 disabled:bg-gray-100"
          >
            <option value="">
              {packagesLoading
                ? "Loading package cards..."
                : !platform
                ? "Select a platform first"
                : packages.length === 0
                ? "No package cards found. Create one in Platforms!"
                : "Select Package Card"}
            </option>
            {packages.map((pkg) => (
              <option key={pkg._id} value={pkg._id}>
                {pkg.name} ({pkg.category}) — ₹{pkg.pricePerLead}/lead
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Step 3: File Input */}
      <div>
        <label className="font-semibold block mb-2 text-sm text-gray-700">
          3. Upload CSV File *
        </label>
        <input
          id="lead-file"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          disabled={loading}
          className="w-full border border-gray-300 rounded-xl p-3 text-sm cursor-pointer disabled:bg-gray-100"
        />
        <p className="text-xs text-gray-500 mt-2">
          Leads inside this CSV will be strictly assigned to the selected Package Card.
        </p>
      </div>

      {file && (
        <div className="border border-blue-200 bg-blue-50 rounded-xl p-3 text-xs text-blue-900 font-semibold">
          Selected: {file.name}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={downloadSample}
          disabled={loading}
          className="border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2.5 rounded-xl text-xs font-semibold"
        >
          Download Sample CSV
        </button>
      </div>

      {/* Upload CTA */}
      <button
        type="button"
        onClick={handleUpload}
        disabled={loading || !platform || !packageId || !file}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {loading ? "Uploading Leads to Package..." : "Upload Leads"}
      </button>

      {/* Results Box */}
      {result && (
        <div className="rounded-2xl border border-green-300 bg-green-50 p-6 space-y-3">
          <h4 className="font-bold text-green-900 text-base">
            Upload Report: {result.package?.name} ({result.package?.platform})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-white p-3 rounded-xl border">
              <span className="text-xs text-gray-500">Total Rows</span>
              <p className="text-lg font-bold">{result.totalRows ?? 0}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border">
              <span className="text-xs text-gray-500">Inserted</span>
              <p className="text-lg font-bold text-green-600">
                {result.inserted ?? 0}
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl border">
              <span className="text-xs text-gray-500">Duplicates</span>
              <p className="text-lg font-bold text-amber-600">
                {result.duplicates ?? 0}
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl border">
              <span className="text-xs text-gray-500">Invalid</span>
              <p className="text-lg font-bold text-red-600">
                {result.invalid ?? 0}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}