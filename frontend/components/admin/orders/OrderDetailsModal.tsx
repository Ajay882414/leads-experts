"use client";

interface Props {
  open: boolean;
  onClose: () => void;
  order: any;
}

export default function OrderDetailsModal({
  open,
  onClose,
  order,
}: Props) {

  if (!open || !order) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl p-8 w-[500px]">

        <h2 className="text-2xl font-bold mb-6">
          Order Details
        </h2>

        <div className="space-y-3">

          <p>
            <strong>User:</strong>{" "}
            {order.user?.fullName}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {order.user?.email}
          </p>

          <p>
            <strong>Platform:</strong>{" "}
            {order.platform?.name}
          </p>

          <p>
            <strong>Quantity:</strong>{" "}
            {order.quantity}
          </p>

          <p>
            <strong>Price / Lead:</strong> ₹
            {order.pricePerLead}
          </p>

          <p>
            <strong>Total:</strong> ₹
            {order.totalAmount}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {order.status}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(
              order.createdAt
            ).toLocaleString()}
          </p>

        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-blue-600 text-white rounded-xl py-3"
        >
          Close
        </button>

      </div>

    </div>
  );
}