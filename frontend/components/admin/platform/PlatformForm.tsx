"use client";

import { FormEvent, useState } from "react";

import { useRouter } from "next/navigation";

import {
  createPlatform,
  updatePlatform,
} from "@/services/platformApi";

import {
  Platform,
  PlatformFormData,
} from "@/types/platform";

interface Props {
  initialData?: Platform;

  isEdit?: boolean;
}

export default function PlatformForm({
  initialData,
  isEdit = false,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState<PlatformFormData>({
      name: initialData?.name ?? "",

      slug: initialData?.slug ?? "",

      description:
        initialData?.description ?? "",

      icon: initialData?.icon ?? "",

      banner: initialData?.banner ?? "",

      color:
        initialData?.color ?? "#3B82F6",

      pricePerLead:
        initialData?.pricePerLead ?? 1,

      minimumPurchase:
        initialData?.minimumPurchase ?? 1,

      status:
        initialData?.status ?? "ACTIVE",
    });

  // ========================================
  // HANDLE INPUT
  // ========================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((previous) => ({
      ...previous,

      [name]:
        name === "pricePerLead" ||
        name === "minimumPurchase"
          ? Number(value)
          : value,
    }));
  };

  // ========================================
  // SUBMIT
  // ========================================

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Platform name is required");
      return;
    }

    if (!formData.slug.trim()) {
      alert("Platform slug is required");
      return;
    }

    if (formData.pricePerLead <= 0) {
      alert(
        "Price per lead must be greater than 0"
      );
      return;
    }

    if (formData.minimumPurchase < 1) {
      alert(
        "Minimum purchase must be at least 1"
      );
      return;
    }

    try {
      setLoading(true);

      if (isEdit && initialData?._id) {
        await updatePlatform(
          initialData._id,
          formData
        );

        alert(
          "Platform updated successfully"
        );
      } else {
        await createPlatform(formData);

        alert(
          "Platform created successfully"
        );
      }

      router.push("/admin/platforms");

      router.refresh();
    } catch (error: any) {
      console.error(
        "Platform save error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6"
    >
      {/* ================================= */}
      {/* PLATFORM NAME */}
      {/* ================================= */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Platform Name
        </label>

        <input
          type="text"
          name="name"
          placeholder="Instagram"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-gray-200 p-3 rounded-lg w-full outline-none focus:border-blue-500"
        />
      </div>

      {/* ================================= */}
      {/* SLUG */}
      {/* ================================= */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Slug
        </label>

        <input
          type="text"
          name="slug"
          placeholder="instagram"
          value={formData.slug}
          onChange={handleChange}
          required
          className="border border-gray-200 p-3 rounded-lg w-full outline-none focus:border-blue-500"
        />

        <p className="text-xs text-gray-500 mt-1">
          Example: instagram, facebook,
          snapchat
        </p>
      </div>

      {/* ================================= */}
      {/* ICON */}
      {/* ================================= */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Icon URL
        </label>

        <input
          type="text"
          name="icon"
          placeholder="https://..."
          value={formData.icon}
          onChange={handleChange}
          className="border border-gray-200 p-3 rounded-lg w-full outline-none focus:border-blue-500"
        />
      </div>

      {/* ================================= */}
      {/* BANNER */}
      {/* ================================= */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Banner URL
        </label>

        <input
          type="text"
          name="banner"
          placeholder="https://..."
          value={formData.banner}
          onChange={handleChange}
          className="border border-gray-200 p-3 rounded-lg w-full outline-none focus:border-blue-500"
        />
      </div>

      {/* ================================= */}
      {/* DESCRIPTION */}
      {/* ================================= */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Description
        </label>

        <textarea
          name="description"
          placeholder="Describe this platform..."
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="border border-gray-200 p-3 rounded-lg w-full outline-none focus:border-blue-500 resize-none"
        />
      </div>

      {/* ================================= */}
      {/* COLOR */}
      {/* ================================= */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Platform Color
        </label>

        <div className="flex items-center gap-4">
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-14 h-12 rounded cursor-pointer"
          />

          <span className="text-sm text-gray-600">
            {formData.color}
          </span>
        </div>
      </div>

      {/* ================================= */}
      {/* PRICE */}
      {/* ================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold mb-2">
            Price Per Lead (₹)
          </label>

          <input
            type="number"
            name="pricePerLead"
            min={1}
            step="0.01"
            value={formData.pricePerLead}
            onChange={handleChange}
            required
            className="border border-gray-200 p-3 rounded-lg w-full outline-none focus:border-blue-500"
          />
        </div>

        {/* ================================= */}
        {/* MINIMUM PURCHASE */}
        {/* ================================= */}

        <div>
          <label className="block text-sm font-semibold mb-2">
            Minimum Purchase
          </label>

          <input
            type="number"
            name="minimumPurchase"
            min={1}
            value={
              formData.minimumPurchase
            }
            onChange={handleChange}
            required
            className="border border-gray-200 p-3 rounded-lg w-full outline-none focus:border-blue-500"
          />

          <p className="text-xs text-gray-500 mt-1">
            User can purchase from this
            quantity upward.
          </p>
        </div>
      </div>

      {/* ================================= */}
      {/* STATUS */}
      {/* ================================= */}

      <div>
        <label className="block text-sm font-semibold mb-2">
          Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border border-gray-200 p-3 rounded-lg w-full outline-none focus:border-blue-500"
        >
          <option value="ACTIVE">
            ACTIVE
          </option>

          <option value="INACTIVE">
            INACTIVE
          </option>
        </select>
      </div>

      {/* ================================= */}
      {/* BUTTON */}
      {/* ================================= */}

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          {loading
            ? "Saving..."
            : isEdit
            ? "Update Platform"
            : "Create Platform"}
        </button>

        <button
          type="button"
          onClick={() =>
            router.push("/admin/platforms")
          }
          disabled={loading}
          className="border border-gray-200 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}