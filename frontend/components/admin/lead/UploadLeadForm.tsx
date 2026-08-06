"use client";

import { useEffect, useState } from "react";

import { uploadLeads } from "@/services/leadApi";
import { getPlatforms } from "@/services/platformApi";

export default function UploadLeadForm() {
  const [platforms, setPlatforms] =
    useState<any[]>([]);

  const [platform, setPlatform] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState<any>(null);

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const fetchPlatforms =
    async () => {
      try {
        const res =
          await getPlatforms();

        setPlatforms(
          res.platforms
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleUpload =
    async () => {
      if (!platform) {
        return alert(
          "Select Platform"
        );
      }

      if (!file) {
        return alert(
          "Choose CSV or Excel File"
        );
      }

      try {
        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "platform",
          platform
        );

        formData.append(
          "file",
          file
        );

        const res =
          await uploadLeads(
            formData
          );

        setResult(res);

        alert(
          "Upload Successful"
        );
      } catch (error: any) {
        alert(
          error?.response?.data
            ?.message ||
            "Upload Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="bg-white rounded-2xl shadow p-8">

      <div className="space-y-6">

        {/* Platform */}

        <div>

          <label className="font-semibold block mb-2">
            Platform
          </label>

          <select
            value={platform}
            onChange={(e) =>
              setPlatform(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-3"
          >
            <option value="">
              Select Platform
            </option>

            {platforms.map(
              (item: any) => (
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

        {/* File */}

        <div>

          <label className="font-semibold block mb-2">
            CSV / Excel File
          </label>

          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={(e) =>
              setFile(
                e.target
                  .files?.[0] ||
                  null
              )
            }
            className="w-full border rounded-xl p-3"
          />

        </div>

        {/* Button */}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
        >
          {loading
            ? "Uploading..."
            : "Upload Leads"}
        </button>

        {/* Result */}

        {result && (
          <div className="rounded-xl bg-green-50 border border-green-300 p-5">

            <h3 className="font-bold text-lg mb-3">
              Upload Report
            </h3>

            <div className="space-y-2">

              <p>
                ✅ Total Rows :
                {" "}
                {result.totalRows}
              </p>

              <p>
                ✅ Inserted :
                {" "}
                {result.inserted}
              </p>

              <p>
                ⚠️ Duplicates :
                {" "}
                {result.duplicates}
              </p>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}