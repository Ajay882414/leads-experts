"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getOrder } from "@/services/orderApi";

export default function OrderDetailsPage() {
  const { id } = useParams();

  const router = useRouter();

  const [order, setOrder] =
    useState<any>(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await getOrder(
        id as string
      );

      setOrder(res.order);
    } catch (error) {
      console.log(error);
    }
  };

  if (!order) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl bg-white rounded-2xl shadow p-8">

      <h1 className="text-3xl font-bold mb-8">
        Order Details
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <p className="text-gray-500">
            Customer
          </p>

          <h3 className="font-semibold">
            {order.user?.fullName}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">
            Email
          </p>

          <h3 className="font-semibold">
            {order.user?.email}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">
            Platform
          </p>

          <h3 className="font-semibold">
            {order.platform?.name}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">
            Quantity
          </p>

          <h3 className="font-semibold">
            {order.quantity}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">
            Price / Lead
          </p>

          <h3 className="font-semibold">
            ₹{order.pricePerLead}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">
            Total Amount
          </p>

          <h3 className="font-semibold">
            ₹{order.totalAmount}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">
            Status
          </p>

          <h3 className="font-semibold">
            {order.status}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">
            Order Date
          </p>

          <h3 className="font-semibold">
            {new Date(
              order.createdAt
            ).toLocaleString()}
          </h3>
        </div>

      </div>

      <button
        onClick={() =>
          router.push("/admin/orders")
        }
        className="mt-10 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Back
      </button>

    </div>
  );
}