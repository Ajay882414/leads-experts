"use client";

interface OrderDetailsModalProps {
  open: boolean;
  onClose: () => void;
  order: any;
}

export default function OrderDetailsModal({
  open,
  onClose,
  order,
}: OrderDetailsModalProps) {
  if (!open || !order) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Order Details
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">
              Customer
            </p>

            <p className="font-semibold text-gray-900">
              {order.user?.fullName || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="font-semibold text-gray-900">
              {order.user?.email || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Platform
            </p>

            <p className="font-semibold text-gray-900">
              {order.platform?.name || "N/A"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">
                Quantity
              </p>

              <p className="font-semibold text-gray-900">
                {order.quantity}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Price / Lead
              </p>

              <p className="font-semibold text-gray-900">
                ₹{order.pricePerLead}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Total Amount
            </p>

            <p className="text-xl font-bold text-gray-900">
              ₹{order.totalAmount}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Status
            </p>

            <p className="font-semibold text-gray-900">
              {order.status}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Order Date
            </p>

            <p className="font-semibold text-gray-900">
              {order.createdAt
                ? new Date(
                    order.createdAt
                  ).toLocaleString()
                : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Order ID
            </p>

            <p className="break-all text-sm font-medium text-gray-700">
              {order._id}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}