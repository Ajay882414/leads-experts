"use client";

import UserRow from "./UserRow";
import { User } from "@/types/user";

interface Props {
  users: User[];
  onDelete: (id: string) => void;
  onStatus: (
    id: string,
    status: string
  ) => void;
}

export default function UserTable({
  users,
  onDelete,
  onStatus,
}: Props) {
  if (!users.length) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <h2 className="text-xl font-semibold">
          No Users Found
        </h2>

        <p className="text-gray-500 mt-2">
          There are no registered users.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left p-4">
              Name
            </th>

            <th className="text-left p-4">
              Email
            </th>

            <th className="text-left p-4">
              Role
            </th>

            <th className="text-left p-4">
              Status
            </th>

            <th className="text-left p-4">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (
            <UserRow
              key={user._id}
              user={user}
              onDelete={onDelete}
              onStatus={onStatus}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
}