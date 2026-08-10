interface Props {
  stats: {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    cancelledOrders: number;
  };
}

export default function OrderStats({
  stats,
}: Props) {
  return (
    <div className="grid grid-cols-4 gap-5">

      <div className="bg-white rounded-xl shadow p-5">
        <p className="text-gray-500">
          Total Orders
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {stats.totalOrders}
        </h2>
      </div>

      <div className="bg-yellow-50 rounded-xl shadow p-5">
        <p className="text-yellow-700">
          Pending
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {stats.pendingOrders}
        </h2>
      </div>

      <div className="bg-green-50 rounded-xl shadow p-5">
        <p className="text-green-700">
          Completed
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {stats.completedOrders}
        </h2>
      </div>

      <div className="bg-red-50 rounded-xl shadow p-5">
        <p className="text-red-700">
          Cancelled
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {stats.cancelledOrders}
        </h2>
      </div>

    </div>
  );
}