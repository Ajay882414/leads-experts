interface Props {
  orders: any[];
}

export default function SalesReportTable({
  orders,
}: Props) {
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
              Quantity
            </th>

            <th className="text-left">
              Amount
            </th>
          </tr>

        </thead>

        <tbody>

          {orders.map((item) => (
            <tr
              key={item._id}
              className="border-b"
            >

              <td className="p-4">
                {item.user?.fullName}
              </td>

              <td>
                {item.platform?.name}
              </td>

              <td>
                {item.quantity}
              </td>

              <td>
                ₹{item.totalAmount}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}