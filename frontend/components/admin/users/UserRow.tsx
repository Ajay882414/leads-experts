"use client";

import Link from "next/link";
import { User } from "@/types/user";

interface Props {
  user: User;
  onDelete: (
    id: string
  ) => void;

  onStatus: (
    id: string,
    status: string
  ) => void;
}

export default function UserRow({
  user,
  onDelete,
  onStatus,
}: Props) {
  return (
    <tr className="border-b hover:bg-gray-50">

      <td className="p-4">
        {user.fullName}
      </td>

      <td className="p-4">
        {user.email}
      </td>

      <td className="p-4 capitalize">
        {user.role}
      </td>

      <td className="p-4">

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            user.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {user.status}
        </span>

      </td>

      <td className="p-4">

        <div className="flex gap-2">

          <Link
            href={`/admin/users/${user._id}`}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm"
          >
            View
          </Link>

          <button
            onClick={() =>
              onStatus(
                user._id,
                user.status ===
                  "ACTIVE"
                  ? "BLOCKED"
                  : "ACTIVE"
              )
            }
            className="bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm"
          >
            {user.status ===
            "ACTIVE"
              ? "Block"
              : "Unblock"}
          </button>

          <button
            onClick={() =>
              onDelete(user._id)
            }
            className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
          >
            Delete
          </button>

        </div>

      </td>

    </tr>
  );
}