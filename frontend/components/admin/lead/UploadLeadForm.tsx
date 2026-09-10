"use client";

import { useEffect, useState } from "react";

import { uploadLeads } from "@/services/leadApi";
import { getPlatforms } from "@/services/platformApi";

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
  availableLeads?: number;
  totalLeads?: number;
  platform?: {
    id: string;
    name: string;
  };
}

export default function UploadLeadForm() {
  // ==========================================
  // STATES
  // ==========================================

  const [platforms, setPlatforms] = useState<Platform[]>(
    []
  );

  const [platform, setPlatform] = useState("");

  const [file, setFile] = useState<File | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  const [platformLoading, setPlatformLoading] =
    useState(true);

  const [result, setResult] =
    useState<UploadResult | null>(null);

  // ==========================================
  // FETCH PLATFORMS
  // ==========================================

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const fetchPlatforms = async () => {
    try {
      setPlatformLoading(true);

      const response = await getPlatforms();

      const activePlatforms = (
        response?.platforms || []
      ).filter(
        (item: Platform) =>
          item.status === undefined ||
          item.status === "ACTIVE"
      );

      setPlatforms(activePlatforms);
    } catch (error) {
      console.error(
        "Failed to fetch platforms:",
        error
      );

      setPlatforms([]);
    } finally {
      setPlatformLoading(false);
    }
  };

  // ==========================================
  // FILE SELECT
  // ==========================================

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile =
      e.target.files?.[0] || null;

    setResult(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    // ========================================
    // FILE TYPE CHECK
    // ========================================

    const allowedExtensions = [
      ".csv",
      ".xlsx",
      ".xls",
    ];

    const fileName =
      selectedFile.name.toLowerCase();

    const isAllowed = allowedExtensions.some(
      (extension) =>
        fileName.endsWith(extension)
    );

    if (!isAllowed) {
      alert(
        "Please select a CSV or Excel file."
      );

      e.target.value = "";
      setFile(null);

      return;
    }

    // ========================================
    // FILE SIZE CHECK
    // Backend limit = 20 MB
    // ========================================

    const maxSize =
      20 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
      alert(
        "File size must be less than 20 MB."
      );

      e.target.value = "";
      setFile(null);

      return;
    }

    setFile(selectedFile);
  };

  // ==========================================
  // UPLOAD
  // ==========================================

  const handleUpload = async () => {
    // ========================================
    // PLATFORM VALIDATION
    // ========================================

    if (!platform) {
      alert("Please select a platform.");
      return;
    }

    // ========================================
    // FILE VALIDATION
    // ========================================

    if (!file) {
      alert(
        "Please select a CSV or Excel file."
      );

      return;
    }

    try {
      setLoading(true);
      setResult(null);

      // ======================================
      // FORM DATA
      // ======================================

      const formData = new FormData();

      formData.append(
        "platform",
        platform
      );

      formData.append(
        "file",
        file
      );

      // ======================================
      // API
      // ======================================

      const response =
        await uploadLeads(formData);

      // ======================================
      // RESULT
      // ======================================

      setResult(response);

      // ======================================
      // SUCCESS MESSAGE
      // ======================================

      alert(
        response?.message ||
          "Leads uploaded successfully."
      );

      // ======================================
      // RESET FILE
      // ======================================

      setFile(null);

      const fileInput =
        document.getElementById(
          "lead-file"
        ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error: any) {
      console.error(
        "Lead upload failed:",
        error
      );

      const message =
        error?.response?.data?.message ||
        "Lead upload failed. Please try again.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

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
      window.URL.createObjectURL(
        blob
      );

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

  // ==========================================
  // FORMAT FILE SIZE
  // ==========================================

  const formatFileSize = (
    bytes: number
  ) => {
    if (bytes < 1024) {
      return `${bytes} Bytes`;
    }

    if (bytes < 1024 * 1024) {
      return `${(
        bytes / 1024
      ).toFixed(1)} KB`;
    }

    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(1)} MB`;
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="bg-white rounded-2xl shadow p-8">

      <div className="space-y-7">

        {/* =====================================
            PLATFORM
        ===================================== */}

        <div>
          <label
            htmlFor="lead-platform"
            className="font-semibold block mb-2"
          >
            Select Platform
          </label>

          <select
            id="lead-platform"
            value={platform}
            onChange={(e) =>
              setPlatform(
                e.target.value
              )
            }
            disabled={
              platformLoading ||
              loading
            }
            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-blue-600 disabled:bg-gray-100"
          >
            <option value="">
              {platformLoading
                ? "Loading platforms..."
                : "Select Platform"}
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

          {!platformLoading &&
            platforms.length === 0 && (
              <p className="text-sm text-red-500 mt-2">
                No active platforms found.
                Please create/activate a
                platform first.
              </p>
            )}
        </div>

        {/* =====================================
            FILE
        ===================================== */}

        <div>
          <label
            htmlFor="lead-file"
            className="font-semibold block mb-2"
          >
            Upload CSV / Excel File
          </label>

          <input
            id="lead-file"
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={
              handleFileChange
            }
            disabled={loading}
            className="w-full border border-gray-300 rounded-xl p-3 cursor-pointer disabled:bg-gray-100"
          />

          <p className="text-sm text-gray-500 mt-2">
            Supported formats: CSV,
            XLS, XLSX. Maximum file size:
            20 MB.
          </p>
        </div>

        {/* =====================================
            SELECTED FILE
        ===================================== */}

        {file && (
          <div className="border border-blue-200 bg-blue-50 rounded-xl p-4">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>
                <p className="font-semibold text-blue-900">
                  Selected File
                </p>

                <p className="text-sm text-blue-700 mt-1 break-all">
                  {file.name}
                </p>
              </div>

              <p className="text-sm text-blue-700">
                {formatFileSize(
                  file.size
                )}
              </p>

            </div>

          </div>
        )}

        {/* =====================================
            CSV FORMAT INFORMATION
        ===================================== */}

        <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">

          <h3 className="font-bold text-lg mb-3">
            Required CSV Columns
          </h3>

          <div className="flex flex-wrap gap-2">

            {[
              "Timestamp",
              "Name",
              "Phone",
              "Age",
              "Gender",
              "Profession",
              "Source",
            ].map(
              (column) => (
                <span
                  key={column}
                  className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                >
                  {column}
                </span>
              )
            )}

          </div>

          <p className="text-sm text-gray-500 mt-4">
            Name, Phone and Age are required.
            Duplicate phone numbers for the
            same platform will not be imported.
          </p>

        </div>

        {/* =====================================
            SAMPLE CSV
        ===================================== */}

        <div className="flex flex-col sm:flex-row gap-4">

          <button
            type="button"
            onClick={downloadSample}
            disabled={loading}
            className="border border-gray-300 hover:bg-gray-100 text-gray-800 px-5 py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            Download Sample CSV
          </button>

        </div>

        {/* =====================================
            UPLOAD BUTTON
        ===================================== */}

        <button
          type="button"
          onClick={handleUpload}
          disabled={
            loading ||
            platformLoading ||
            !platform ||
            !file
          }
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? "Uploading Leads..."
            : "Upload Leads"}
        </button>

        {/* =====================================
            UPLOAD RESULT
        ===================================== */}

        {result && (
          <div className="rounded-2xl border border-green-300 bg-green-50 p-6">

            <h3 className="font-bold text-xl text-green-800 mb-5">
              Upload Report
            </h3>

            {/* PLATFORM */}

            {result.platform?.name && (
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Platform
                </p>

                <p className="font-semibold">
                  {result.platform.name}
                </p>
              </div>
            )}

            {/* STATS */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              <div className="bg-white rounded-xl p-4 border">
                <p className="text-sm text-gray-500">
                  Total Rows
                </p>

                <p className="text-2xl font-bold mt-1">
                  {result.totalRows ??
                    0}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border">
                <p className="text-sm text-gray-500">
                  Inserted
                </p>

                <p className="text-2xl font-bold text-green-600 mt-1">
                  {result.inserted ??
                    0}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border">
                <p className="text-sm text-gray-500">
                  Duplicates
                </p>

                <p className="text-2xl font-bold text-orange-600 mt-1">
                  {result.duplicates ??
                    0}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border">
                <p className="text-sm text-gray-500">
                  Invalid
                </p>

                <p className="text-2xl font-bold text-red-600 mt-1">
                  {result.invalid ??
                    0}
                </p>
              </div>

            </div>

            {/* MESSAGE */}

            {result.message && (
              <p className="text-green-700 mt-5">
                {result.message}
              </p>
            )}

          </div>
        )}

      </div>
    </div>
  );
}