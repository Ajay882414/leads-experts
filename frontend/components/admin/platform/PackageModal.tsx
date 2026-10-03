"use client";

import { useState } from "react";
import { X, Plus, Trash2, Edit2, Check } from "lucide-react";
import { createPackage, deletePackage, updatePackage } from "@/services/packageApi";
import { Package } from "@/types/package";

interface Props {
  platform: {
    _id: string;
    name: string;
  };
  packages: Package[];
  onClose: () => void;
  onRefresh: () => void;
}

export default function PackageModal({
  platform,
  packages,
  onClose,
  onRefresh,
}: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [pricePerLead, setPricePerLead] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  // Edit Mode States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPrice, setEditPrice] = useState<number | "">("");
  const [updating, setUpdating] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || !pricePerLead) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      await createPackage({
        platform: platform._id,
        name: name.trim(),
        category: category.trim(),
        pricePerLead: Number(pricePerLead),
        deliveryTime: "24 hours",
        badges: ["Verified"],
        minimumPurchase: 1,
      });

      alert("Package card created successfully!");
      setName("");
      setCategory("");
      setPricePerLead("");
      onRefresh();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to create package card");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (pkg: Package) => {
    setEditingId(pkg._id);
    setEditName(pkg.name);
    setEditCategory(pkg.category);
    setEditPrice(pkg.pricePerLead);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditCategory("");
    setEditPrice("");
  };

  const handleSaveEdit = async (packageId: string) => {
    if (!editName || !editCategory || !editPrice) {
      alert("Please fill all required fields to update");
      return;
    }

    try {
      setUpdating(true);
      await updatePackage(packageId, {
        name: editName.trim(),
        category: editCategory.trim(),
        pricePerLead: Number(editPrice),
      });

      alert("Package details & price updated successfully!");
      cancelEdit();
      onRefresh();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to update package");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (packageId: string) => {
    if (!confirm("Are you sure? This will delete this package and its leads!")) {
      return;
    }
    try {
      await deletePackage(packageId);
      alert("Package card deleted");
      onRefresh();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to delete package");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Manage Packages — {platform.name}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Create and manage independent package cards under {platform.name}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Create Package Card Form */}
        <form
          onSubmit={handleCreate}
          className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 space-y-3"
        >
          <h3 className="text-sm font-bold text-blue-900">Add New Package Card</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Card Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Housewife Leads"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-xs bg-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Audience Category *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Housewife"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-xs bg-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Price / Lead (₹) *
              </label>
              <input
                type="number"
                required
                min={0.1}
                step="0.01"
                placeholder="e.g. 20"
                value={pricePerLead}
                onChange={(e) => setPricePerLead(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-xs bg-white outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-bold transition disabled:opacity-50 cursor-pointer"
            >
              <Plus size={15} />
              {loading ? "Creating..." : "Add Package Card"}
            </button>
          </div>
        </form>

        {/* Existing Package Cards List */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3">
            Active Package Cards ({packages.length})
          </h3>

          {!packages.length ? (
            <div className="rounded-xl border border-dashed border-gray-200 p-8 text-center text-xs text-gray-500">
              No package cards created yet for this platform. Add your first card above!
            </div>
          ) : (
            <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden">
              {packages.map((pkg) => {
                const isEditing = editingId === pkg._id;

                return (
                  <div
                    key={pkg._id}
                    className="p-4 bg-white hover:bg-gray-50/70 transition space-y-3"
                  >
                    {isEditing ? (
                      /* Inline Edit Form */
                      <div className="rounded-lg bg-blue-50/60 border border-blue-200 p-3 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-900">
                            Edit Package Card & Price
                          </span>
                          <span className="text-[11px] text-gray-400">
                            Stock: {pkg.availableLeads} leads
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div>
                            <label className="text-[11px] font-semibold text-gray-600 block mb-0.5">
                              Title
                            </label>
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="w-full h-8 px-2.5 rounded border border-gray-300 text-xs bg-white outline-none focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-gray-600 block mb-0.5">
                              Category
                            </label>
                            <input
                              type="text"
                              value={editCategory}
                              onChange={(e) => setEditCategory(e.target.value)}
                              className="w-full h-8 px-2.5 rounded border border-gray-300 text-xs bg-white outline-none focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-gray-600 block mb-0.5">
                              Price / Lead (₹) *
                            </label>
                            <input
                              type="number"
                              min={0.1}
                              step="0.01"
                              value={editPrice}
                              onChange={(e) => setEditPrice(Number(e.target.value))}
                              className="w-full h-8 px-2.5 rounded border border-blue-400 font-bold text-blue-700 text-xs bg-white outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={cancelEdit}
                            className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-200 rounded cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            disabled={updating}
                            onClick={() => handleSaveEdit(pkg._id)}
                            className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded transition disabled:opacity-50 cursor-pointer"
                          >
                            <Check size={14} />
                            {updating ? "Saving..." : "Save Changes"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Display View */
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-gray-900">{pkg.name}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Category:{" "}
                            <span className="font-semibold text-blue-600">
                              {pkg.category}
                            </span>{" "}
                            • Rate:{" "}
                            <span className="font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                              ₹{pkg.pricePerLead}/lead
                            </span>{" "}
                            • Stock:{" "}
                            <span className="font-semibold text-emerald-600">
                              {pkg.availableLeads} leads
                            </span>
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => startEdit(pkg)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                            title="Edit Price & Details"
                          >
                            <Edit2 size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(pkg._id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                            title="Delete Card"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}