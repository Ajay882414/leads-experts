"use client";

import NotificationBadge from "./NotificationBadge";

interface Props {
  notifications: any[];
}

export default function NotificationTable({
  notifications,
}: Props) {

  return (

    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left p-4">
              Title
            </th>

            <th className="text-left">
              Message
            </th>

            <th className="text-left">
              Type
            </th>

            <th className="text-left">
              Status
            </th>

            <th className="text-left">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {notifications.map(
            (item) => (

              <tr
                key={item._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4 font-medium">
                  {item.title}
                </td>

                <td>
                  {item.message}
                </td>

                <td>
                  <NotificationBadge
                    type={item.type}
                  />
                </td>

                <td>

                  {item.isRead ? (

                    <span className="text-green-600 font-medium">
                      Read
                    </span>

                  ) : (

                    <span className="text-red-600 font-medium">
                      Unread
                    </span>

                  )}

                </td>

                <td>
                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  );

}