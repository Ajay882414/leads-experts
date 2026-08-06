"use client";

import Link from "next/link";

import { Platform } from "@/types/platform";

import { deletePlatform } from "@/services/platformApi";

type Props = {
  platforms: Platform[];

  refresh: () => void;
};

export default function PlatformTable({
  platforms,
  refresh,
}: Props) {
  const handleDelete = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this platform?"
      );

    if (!confirmDelete) return;

    try {
      await deletePlatform(id);

      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  if (platforms.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 shadow text-center">

        No Platforms Found

      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-auto">

      <table className="w-full">

        <thead>

          <tr className="bg-gray-100">

            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Price
            </th>

            <th className="p-4 text-left">
              Available
            </th>

            <th className="p-4 text-left">
              Sold
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {platforms.map((platform) => (

            <tr
              key={platform._id}
              className="border-t"
            >

              <td className="p-4">

                {platform.name}

              </td>

              <td className="p-4">

                ₹ {platform.pricePerLead}

              </td>

              <td className="p-4">

                {platform.availableLeads}

              </td>

              <td className="p-4">

                {platform.soldLeads}

              </td>

              <td className="p-4">

                {platform.status}

              </td>

              <td className="p-4">

                <div className="flex gap-3 justify-center">

                  <Link
                    href={`/admin/platforms/${platform._id}/edit`}
                    className="px-4 py-2 rounded bg-yellow-500 text-white"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        platform._id
                      )
                    }
                    className="px-4 py-2 rounded bg-red-600 text-white"
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
  );
}