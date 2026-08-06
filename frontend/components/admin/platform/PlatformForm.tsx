"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  createPlatform,
  updatePlatform,
} from "@/services/platformApi";

interface Props {
  initialData?: any;

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
    useState({
      name:
        initialData?.name || "",

      slug:
        initialData?.slug || "",

      description:
        initialData?.description || "",

      icon:
        initialData?.icon || "",

      banner:
        initialData?.banner || "",

      color:
        initialData?.color ||
        "#3B82F6",

      pricePerLead:
        initialData?.pricePerLead ||
        10,

      minimumPurchase:
        initialData?.minimumPurchase ||
        10,

      status:
        initialData?.status ||
        "ACTIVE",
    });

  const handleChange = (
    e: any
  ) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: any
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (isEdit) {
        await updatePlatform(
          initialData._id,
          formData
        );

        alert(
          "Platform Updated"
        );
      } else {
        await createPlatform(
          formData
        );

        alert(
          "Platform Created"
        );
      }

      router.push(
        "/admin/platforms"
      );
    } catch (err: any) {
      alert(
        err?.response?.data
          ?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-8 space-y-5"
    >
      <input
        name="name"
        placeholder="Platform Name"
        value={formData.name}
        onChange={handleChange}
        className="border p-3 rounded-lg w-full"
      />

      <input
        name="slug"
        placeholder="Slug"
        value={formData.slug}
        onChange={handleChange}
        className="border p-3 rounded-lg w-full"
      />

      <input
        name="icon"
        placeholder="Icon URL"
        value={formData.icon}
        onChange={handleChange}
        className="border p-3 rounded-lg w-full"
      />

      <input
        name="banner"
        placeholder="Banner URL"
        value={formData.banner}
        onChange={handleChange}
        className="border p-3 rounded-lg w-full"
      />

      <input
        type="color"
        name="color"
        value={formData.color}
        onChange={handleChange}
        className="w-20 h-12"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="border p-3 rounded-lg w-full"
      />

      <input
        type="number"
        name="pricePerLead"
        value={formData.pricePerLead}
        onChange={handleChange}
        className="border p-3 rounded-lg w-full"
      />

      <input
        type="number"
        name="minimumPurchase"
        value={
          formData.minimumPurchase
        }
        onChange={handleChange}
        className="border p-3 rounded-lg w-full"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="border p-3 rounded-lg w-full"
      >
        <option value="ACTIVE">
          ACTIVE
        </option>

        <option value="INACTIVE">
          INACTIVE
        </option>
      </select>

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg"
      >
        {loading
          ? "Saving..."
          : isEdit
          ? "Update Platform"
          : "Create Platform"}
      </button>
    </form>
  );
}