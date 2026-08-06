"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  createLead,
  updateLead,
} from "@/services/leadApi";

import { getPlatforms } from "@/services/platformApi";

import { LeadFormData } from "@/types/lead";

interface Platform {
  _id: string;
  name: string;
}

interface Props {
  initialData?: any;
  isEdit?: boolean;
}

export default function LeadForm({
  initialData,
  isEdit = false,
}: Props) {
  const router = useRouter();

  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] =
    useState<LeadFormData>({
      platform:
        initialData?.platform?._id ??
        initialData?.platform ??
        "",

      fullName:
        initialData?.fullName ?? "",

      email:
        initialData?.email ?? "",

      phone:
        initialData?.phone ?? "",

      country:
        initialData?.country ?? "",

      state:
        initialData?.state ?? "",

      city:
        initialData?.city ?? "",

      business:
        initialData?.business ?? "",

      category:
        initialData?.category ?? "",

      price:
        initialData?.price ?? 0,

      status:
        initialData?.status ??
        "AVAILABLE",
    });

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const fetchPlatforms = async () => {
    try {
      const res = await getPlatforms();

      setPlatforms(
        res.platforms ?? []
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (
        isEdit &&
        initialData?._id
      ) {
        await updateLead(
          initialData._id,
          formData
        );

        alert(
          "Lead Updated Successfully"
        );
      } else {
        await createLead(
          formData
        );

        alert(
          "Lead Created Successfully"
        );
      }

      router.push(
        "/admin/leads"
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
      className="bg-white p-8 rounded-xl shadow space-y-5"
    >
      <select
        name="platform"
        value={formData.platform}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg"
        required
      >
        <option value="">
          Select Platform
        </option>

        {platforms.map(
          (platform) => (
            <option
              key={platform._id}
              value={
                platform._id
              }
            >
              {platform.name}
            </option>
          )
        )}
      </select>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg"
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg"
        required
      />

      <input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg"
      />

      <input
        type="text"
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg"
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg"
      />

      <input
        type="text"
        name="business"
        placeholder="Business"
        value={formData.business}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg"
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg"
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg"
        min={0}
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="border p-3 w-full rounded-lg"
      >
        <option value="AVAILABLE">
          AVAILABLE
        </option>

        <option value="RESERVED">
          RESERVED
        </option>

        <option value="SOLD">
          SOLD
        </option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : isEdit
          ? "Update Lead"
          : "Create Lead"}
      </button>
    </form>
  );
}