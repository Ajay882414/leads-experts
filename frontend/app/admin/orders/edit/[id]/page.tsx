"use client";

import {
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

export default function EditOrderPage() {
  const { id } = useParams();

  const router = useRouter();

  const [status, setStatus] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder =
    async () => {
      const res =
        await getOrder(
          id as string
        );

      setStatus(
        res.order.status
      );
    };

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        await updateOrderStatus(
          id as string,
          status
        );

        alert(
          "Order Updated Successfully"
        );

        router.push(
          "/admin/orders"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Update Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="max-w-xl bg-white rounded-2xl shadow p-8">

      <h1 className="text-3xl font-bold mb-8">
        Update Order
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-6"
      >

        <div>

          <label className="block font-semibold mb-2">
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-3"
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

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-xl py-3"
        >
          {loading
            ? "Updating..."
            : "Update Order"}
        </button>

      </form>

    </div>
  );
}