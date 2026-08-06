"use client";

import Link from "next/link";

interface Props {
  leads: any[];

  onDelete: (id: string) => void;
}

export default function LeadTable({
  leads,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-auto">

      <table className="w-full">

        <thead>

          <tr className="border-b bg-gray-50">

            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Platform
            </th>

            <th className="p-4 text-left">
              Email
            </th>

            <th className="p-4 text-left">
              Phone
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {leads.map((lead) => (

            <tr
              key={lead._id}
              className="border-b"
            >

              <td className="p-4">
                {lead.fullName}
              </td>

              <td className="p-4">
                {lead.platform?.name}
              </td>

              <td className="p-4">
                {lead.email}
              </td>

              <td className="p-4">
                {lead.phone}
              </td>

              <td className="p-4">
                {lead.status}
              </td>

              <td className="p-4">

                <div className="flex gap-3 justify-center">

                  <Link
                    href={`/admin/leads/${lead._id}/edit`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      onDelete(
                        lead._id
                      )
                    }
                    className="text-red-600"
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