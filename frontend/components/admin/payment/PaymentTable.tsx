import PaymentStatusBadge from "./PaymentStatusBadge";

interface Props {
  payments: any[];
}

export default function PaymentTable({
  payments,
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
              Order
            </th>

            <th className="text-left">
              Amount
            </th>

            <th className="text-left">
              Method
            </th>

            <th className="text-left">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {payments.map(
            (payment: any) => (
              <tr
                key={payment._id}
                className="border-b"
              >
                <td className="p-4">
                  {payment.user?.fullName}
                </td>

                <td>
                  {payment.order?._id}
                </td>

                <td>
                  ₹{payment.amount}
                </td>

                <td>
                  {payment.method}
                </td>

                <td>
                  <PaymentStatusBadge
                    status={
                      payment.status
                    }
                  />
                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
}