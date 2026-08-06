"use client";

interface Props {
  users: any[];
}

export default function RecentUsers({
  users,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow border">

      <div className="p-5 border-b">
        <h2 className="text-xl font-bold">
          Recent Users
        </h2>
      </div>

      <div className="divide-y">

        {users.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No Users Found
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="p-5 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">
                  {user.fullName}
                </h3>

                <p className="text-sm text-gray-500">
                  {user.email}
                </p>
              </div>

              <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                {user.role}
              </span>
            </div>
          ))
        )}

      </div>

    </div>
  );
}