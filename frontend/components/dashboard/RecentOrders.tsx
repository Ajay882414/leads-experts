export default function RecentOrders() {
  return (
    <div className="bg-white rounded-2xl border p-6">

      <h2 className="text-xl font-bold mb-5">
        Recent Orders
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3">
              Platform
            </th>

            <th className="text-left">
              Quantity
            </th>

            <th className="text-left">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          <tr className="border-b">

            <td className="py-4">
              Instagram
            </td>

            <td>
              100
            </td>

            <td className="text-green-600">
              Completed
            </td>

          </tr>

          <tr>

            <td className="py-4">
              Facebook
            </td>

            <td>
              250
            </td>

            <td className="text-yellow-500">
              Pending
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}