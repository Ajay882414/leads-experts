"use client";

import { useState } from "react";
import Link from "next/link";
import { Layers } from "lucide-react";
import { Platform } from "@/types/platform";
import { Package } from "@/types/package";
import { deletePlatform } from "@/services/platformApi";
import { getPackagesByPlatform } from "@/services/packageApi";
import PackageModal from "./PackageModal";

interface Props {
  platforms: Platform[];
  refresh: () => void;
}

export default function PlatformTable({ platforms, refresh }: Props) {
  const [selectedPlatform, setSelectedPlatform] = useState<{
    _id: string;
    name: string;
  } | null>(null);
  const [platformPackages, setPlatformPackages] = useState<Package[]>([]);

  const handleOpenPackages = async (platform: Platform) => {
    setSelectedPlatform({ _id: platform._id, name: platform.name });
    try {
      const res = await getPackagesByPlatform(platform._id);
      setPlatformPackages(res.packages || []);
    } catch {
      setPlatformPackages([]);
    }
  };

  const handleRefreshPackages = async () => {
    if (!selectedPlatform) return;
    try {
      const res = await getPackagesByPlatform(selectedPlatform._id);
      setPlatformPackages(res.packages || []);
      refresh();
    } catch {
      setPlatformPackages([]);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this platform?")) return;
    try {
      await deletePlatform(id);
      alert("Platform deleted successfully");
      refresh();
    } catch (error: any) {
      alert(error?.response?.data?.message || "Unable to delete platform");
    }
  };

  if (platforms.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center">
        <h3 className="text-lg font-semibold">No Platforms Found</h3>
        <p className="text-gray-500 mt-2">Create your first lead platform.</p>
        <Link
          href="/admin/platforms/create"
          className="inline-block mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          Add Platform
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 text-left text-sm font-semibold">Platform</th>
                <th className="p-4 text-left text-sm font-semibold">Price / Lead</th>
                <th className="p-4 text-left text-sm font-semibold">Total Leads</th>
                <th className="p-4 text-left text-sm font-semibold">Available</th>
                <th className="p-4 text-left text-sm font-semibold">Status</th>
                <th className="p-4 text-center text-sm font-semibold">Packages</th>
                <th className="p-4 text-center text-sm font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {platforms.map((platform) => (
                <tr
                  key={platform._id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {platform.icon ? (
                        <img
                          src={platform.icon}
                          alt={platform.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: platform.color }}
                        >
                          {platform.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">
                          {platform.name}
                        </p>
                        <p className="text-xs text-gray-500">/{platform.slug}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 font-semibold text-gray-900">
                    ₹{platform.pricePerLead}
                  </td>
                  <td className="p-4 text-gray-700">{platform.totalLeads}</td>
                  <td className="p-4 font-semibold text-green-600">
                    {platform.availableLeads}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        platform.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {platform.status}
                    </span>
                  </td>

                  {/* Manage Package Cards Button */}
                  <td className="p-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleOpenPackages(platform)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold transition border border-indigo-200"
                    >
                      <Layers size={14} />
                      Cards / Packages
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <Link
                        href={`/admin/platforms/${platform._id}/edit`}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(platform._id)}
                        className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Package Management Modal */}
      {selectedPlatform && (
        <PackageModal
          platform={selectedPlatform}
          packages={platformPackages}
          onClose={() => setSelectedPlatform(null)}
          onRefresh={handleRefreshPackages}
        />
      )}
    </>
  );
}