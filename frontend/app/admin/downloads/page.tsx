"use client";

import { useEffect, useState } from "react";

import {
  getDownloads,
} from "@/services/downloadApi";

import DownloadTable from "@/components/admin/download/DownloadTable";
import DownloadLoading from "@/components/admin/download/DownloadLoading";
import DownloadEmpty from "@/components/admin/download/DownloadEmpty";

export default function DownloadsPage() {

  const [downloads, setDownloads] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads =
    async () => {

      try {

        const res =
          await getDownloads();

        setDownloads(
          res.downloads
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Downloads
        </h1>

        <p className="text-gray-500">
          Download History
        </p>

      </div>

      {loading ? (
        <DownloadLoading />
      ) : downloads.length === 0 ? (
        <DownloadEmpty />
      ) : (
        <DownloadTable
          downloads={downloads}
        />
      )}

    </div>

  );

}