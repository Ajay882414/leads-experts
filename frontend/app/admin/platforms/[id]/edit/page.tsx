"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import PlatformForm from "@/components/admin/platform/PlatformForm";

import { getPlatform } from "@/services/platformApi";

export default function EditPlatformPage() {
  const { id } = useParams();

  const [platform, setPlatform] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlatform = async () => {
      try {
        const res = await getPlatform(id as string);

        setPlatform(res.platform);
      } catch (error) {
        console.log(error);
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
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Edit Platform
        </h1>

        <p className="text-gray-500">
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