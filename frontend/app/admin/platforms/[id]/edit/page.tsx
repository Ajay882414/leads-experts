"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import PlatformForm from "@/components/admin/platform/PlatformForm";

import {
  getPlatform,
} from "@/services/platformApi";

import {
  Platform,
} from "@/types/platform";

export default function EditPlatformPage() {
  const params = useParams();

  const router = useRouter();

  const id = params.id as string;

  const [platform, setPlatform] =
    useState<Platform | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchPlatform = async () => {
      try {
        setError("");

        const res =
          await getPlatform(id);

        setPlatform(res.platform);
      } catch (error: any) {
        console.error(
          "Get platform error:",
          error
        );

        setError(
          error?.response?.data?.message ||
            "Unable to load platform"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlatform();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-10">
        Loading platform...
      </div>
    );
  }

  if (error || !platform) {
    return (
      <div className="p-10 space-y-4">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {error ||
            "Platform not found"}
        </div>

        <button
          onClick={() =>
            router.push(
              "/admin/platforms"
            )
          }
          className="bg-blue-600 text-white px-5 py-3 rounded-lg"
        >
          Back to Platforms
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Platform
        </h1>

        <p className="text-gray-500 mt-1">
          Update platform details
        </p>
      </div>

      <PlatformForm
        initialData={platform}
        isEdit
      />
    </div>
  );
}