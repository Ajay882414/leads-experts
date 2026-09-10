"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  getOrder,
  updateOrderStatus,
} from "@/services/orderApi";

type OrderStatus =
  | "Pending"
  | "Completed"
  | "Cancelled";

interface Order {
  _id: string;

  user?: {
    fullName: string;
    email: string;
  };

  platform?: {
    name: string;
  };

  quantity: number;
  pricePerLead: number;
  totalAmount: number;

  status: OrderStatus;

  createdAt: string;
}

export default function EditOrderPage() {
  const params = useParams();
  const router = useRouter();

  const orderId = params?.id as string;

  const [order, setOrder] =
    useState<Order | null>(null);

  const [status, setStatus] =
    useState<OrderStatus>("Pending");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  // ==========================================
  // FETCH ORDER
  // ==========================================

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getOrder(orderId);

        if (!response?.order) {
          throw new Error(
            "Order not found"
          );
        }

        const fetchedOrder =
          response.order;

        setOrder(fetchedOrder);

        setStatus(
          fetchedOrder.status
        );
      } catch (error) {
        console.error(
          "Failed to fetch order:",
          error
        );

        setError(
          "Unable to load order."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // ==========================================
  // UPDATE
  // ==========================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!orderId) return;

    try {
      setSaving(true);

      await updateOrderStatus(
        orderId,
        status
      );

      alert(
        "Order status updated successfully"
      );

      router.push(
        `/admin/orders/${orderId}`
      );

      router.refresh();
    } catch (error) {
      console.error(
        "Update order error:",
        error
      );

      alert(
        "Failed to update order status"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            Edit Order
          </h1>

          <p className="text-gray-500 mt-1">
            Loading order...
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-12 text-center">
          Loading...
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !order) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          <h2 className="text-xl font-semibold text-red-600">
            {error || "Order not found"}
          </h2>

          <button
            type="button"
            onClick={() =>
              router.push(
                "/admin/orders"
              )
            }
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="max-w-2xl space-y-6">
      {/* HEADER */}

      <div>
        <button
          type="button"
          onClick={() =>
            router.push(
              `/admin/orders/${order._id}`
            )
          }
          className="text-gray-500 hover:text-gray-900 mb-3"
        >
          ← Back to Order
        </button>

        <h1 className="text-3xl font-bold">
          Edit Order
        </h1>

        <p className="text-gray-500 mt-1">
          Update customer order status
        </p>
      </div>

      {/* ORDER SUMMARY */}

      <div className="bg-white rounded-2xl shadow p-7">
        <h2 className="text-xl font-bold mb-6">
          Order Information
        </h2>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-sm text-gray-500">
              Customer
            </p>

            <p className="font-semibold mt-1">
              {order.user?.fullName ||
                "Unknown User"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="font-semibold mt-1">
              {order.user?.email || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Platform
            </p>

            <p className="font-semibold mt-1">
              {order.platform?.name ||
                "Unknown Platform"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Quantity
            </p>

            <p className="font-semibold mt-1">
              {order.quantity}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Price / Lead
            </p>

            <p className="font-semibold mt-1">
              ₹
              {Number(
                order.pricePerLead || 0
              ).toLocaleString("en-IN")}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Total Amount
            </p>

            <p className="font-semibold mt-1">
              ₹
              {Number(
                order.totalAmount || 0
              ).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      {/* STATUS FORM */}

      <div className="bg-white rounded-2xl shadow p-7">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Order Status
            </label>

            <select
              id="status"
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target
                    .value as OrderStatus
                )
              }
              disabled={saving}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500 disabled:bg-gray-100"
            >
              <option value="Pending">
                Pending
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Cancelled">
                Cancelled
              </option>
            </select>
          </div>

          {/* BUTTONS */}

          <div className="flex gap-4">
            <button
              type="button"
              disabled={saving}
              onClick={() =>
                router.push(
                  `/admin/orders/${order._id}`
                )
              }
              className="flex-1 border border-gray-300 text-gray-700 rounded-xl py-3 font-semibold hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {saving
                ? "Updating..."
                : "Update Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}