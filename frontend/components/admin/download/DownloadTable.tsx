"use client";

import {
  deleteDownload,
  downloadLeadFile,
} from "@/services/downloadApi";

import DownloadActions from "./DownloadActions";

interface Props {
  downloads: any[];
}

export default function DownloadTable({
  downloads,
}: Props) {

  const handleDelete = async (
    id: string
  ) => {
    if (
      !confirm(
        "Delete this download?"
      )
    )
      return;

    try {
      await deleteDownload(id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async (
    orderId: string
  ) => {
    try {
      const res =
        await downloadLeadFile(
          orderId
        );

      console.log(
        "Downloaded:",
        res
      );

      alert(
        "Lead data fetched successfully."
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left p-4">
              User
            </th>

            <th className="text-left">
              Platform
            </th>

            <th className="text-left">
              Leads
            </th>

            <th className="text-left">
              File
            </th>

            <th className="text-left">
              Date
            </th>

            <th className="text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {downloads.map(
            (item: any) => (

              <tr
                key={item._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {item.user?.fullName}
                </td>

                <td>
                  {item.platform?.name}
                </td>

                <td>
                  {item.totalLeads}
                </td>

                <td>
                  {item.fileName}
                </td>

                <td>
                  {new Date(
                    item.downloadedAt
                  ).toLocaleDateString()}
                </td>

                <td>

                  <DownloadActions
                    onDownload={() =>
                      handleDownload(
                        item.order._id
                      )
                    }
                    onDelete={() =>
                      handleDelete(
                        item._id
                      )
                    }
                  />

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}