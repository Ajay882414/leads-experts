"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Package, User, ShoppingBag, Layers, Tag } from "lucide-react";

import { getOrder } from "@/services/orderApi";

interface Order {
  _id: string;

  user?: {
    _id: string;
    fullName: string;
    email: string;
    mobileNumber?: string;
  };

  platform?: {
    _id: string;
    name: string;
  };

  package?: {
    _id: string;
    name?: string;
    title?: string;
    category?: string;
    pricePerLead?: number;
  };

  quantity: number;
  pricePerLead: number;
  totalAmount: number;

  status: "Pending" | "Completed" | "Cancelled";

  purchasedLeads?: any[];

  createdAt: string;
  updatedAt?: string;
}

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const orderId = params?.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getOrder(orderId);

        if (!response?.order) {
          throw new Error("Order not found");
        }

        setOrder(response.order);
      } catch (error) {
        console.error("Failed to fetch order:", error);
        setError("Unable to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="space-y-6 p-4 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold">Order Details</h1>
          <p className="text-gray-500 mt-1">Loading order information...</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-12 text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="space-y-6 p-4 max-w-7xl mx-auto">
        <button
          type="button"
          onClick={() => router.push("/admin/orders")}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </button>

        <div className="bg-white rounded-2xl shadow p-12 text-center">
          <h2 className="text-xl font-semibold text-red-600">
            {error || "Order not found"}
          </h2>
          <button
            type="button"
            onClick={() => router.push("/admin/orders")}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 cursor-pointer"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const getStatusClasses = () => {
    switch (order.status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Pending":
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleString("en-IN")
    : "-";

  // Exact Package Card Title & Category
  const cardTitle =
    order.package?.name ||
    order.package?.title ||
    `${order.platform?.name || "Platform"} Lead Package`;

  const audienceCategory =
    order.package?.category || "Standard Category";

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <button
            type="button"
            onClick={() => router.push("/admin/orders")}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-3 cursor-pointer"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </button>

          <h1 className="text-3xl font-bold">Order Details</h1>
          <p className="text-gray-500 mt-1">Order ID: {order._id}</p>
        </div>

        <button
          type="button"
          onClick={() => router.push(`/admin/orders/edit/${order._id}`)}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition cursor-pointer"
        >
          Edit Order
        </button>
      </div>

      {/* TOP SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
              <Package size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Leads Purchased</p>
              <h2 className="text-2xl font-bold">{order.quantity}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">
              <ShoppingBag size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Price / Lead</p>
              <h2 className="text-2xl font-bold">
                ₹{Number(order.pricePerLead || 0).toLocaleString("en-IN")}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <h2 className="text-3xl font-bold mt-1">
              ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
            </h2>
          </div>
        </div>
      </div>

      {/* DETAILS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CUSTOMER INFO */}
        <div className="bg-white rounded-2xl shadow p-7">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
              <User size={22} />
            </div>
            <h2 className="text-xl font-bold">Customer Information</h2>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-semibold mt-1">{order.user?.fullName || "Unknown User"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold mt-1">{order.user?.email || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Mobile Number</p>
              <p className="font-semibold mt-1">{order.user?.mobileNumber || "-"}</p>
            </div>
          </div>
        </div>

        {/* ORDER & LEAD SPECIFICATION INFO */}
        <div className="bg-white rounded-2xl shadow p-7">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-100 text-emerald-700 p-3 rounded-xl">
              <Layers size={22} />
            </div>
            <h2 className="text-xl font-bold">Order & Lead Specification</h2>
          </div>

          <div className="space-y-5">
            {/* PLATFORM */}
            <div>
              <p className="text-sm text-gray-500">Platform</p>
              <p className="font-semibold text-slate-900 mt-1">
                {order.platform?.name || "Unknown Platform"}
              </p>
            </div>

            {/* FULL CARD TITLE & CATEGORY */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Target Lead Package Title
                </p>
                <p className="font-bold text-base text-slate-900 mt-0.5">
                  {cardTitle}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Selected Category
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0c4731] text-white text-xs font-bold">
                  <Tag size={12} className="text-[#a3e635]" />
                  {audienceCategory}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-sm text-gray-500">Order Status</p>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${getStatusClasses()}`}>
                  {order.status}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-500">Purchased Leads Assigned</p>
                <p className="font-bold text-slate-800 mt-1">
                  {order.purchasedLeads?.length || 0}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="font-semibold text-slate-700 mt-1">{orderDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER ACTION */}
      <div className="flex justify-start">
        <button
          type="button"
          onClick={() => router.push("/admin/orders")}
          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition cursor-pointer"
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
}