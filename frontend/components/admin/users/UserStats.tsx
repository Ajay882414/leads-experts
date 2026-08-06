interface Props {
  stats: {
    totalUsers: number;
    activeUsers: number;
    blockedUsers: number;
    adminUsers: number;
  };
}

export default function UserStats({
  stats,
}: Props) {
  return (
    <div className="grid md:grid-cols-4 gap-6">

      <div className="bg-white rounded-xl shadow p-6">
        <h4 className="text-gray-500">
          Total Users
        </h4>

        <h2 className="text-3xl font-bold mt-2">
          {stats.totalUsers}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h4 className="text-gray-500">
          Active
        </h4>

        <h2 className="text-3xl font-bold text-green-600 mt-2">
          {stats.activeUsers}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h4 className="text-gray-500">
          Blocked
        </h4>

        <h2 className="text-3xl font-bold text-red-600 mt-2">
          {stats.blockedUsers}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h4 className="text-gray-500">
          Admins
        </h4>

        <h2 className="text-3xl font-bold text-blue-600 mt-2">
          {stats.adminUsers}
        </h2>
      </div>

    </div>
  );
}