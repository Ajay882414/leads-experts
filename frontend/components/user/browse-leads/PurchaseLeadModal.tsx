"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Sparkles, ShoppingCart, AlertCircle, Clock } from "lucide-react";
import PurchaseSummary from "./PurchaseSummary";
import { Package } from "@/types/package";
import { loadRazorpayScript } from "@/utils/loadRazorpay";
import {
  createPaymentOrder,
  verifyPaymentSignature,
} from "@/services/paymentApi";

interface PurchaseLeadModalProps {
  open: boolean;
  pkg: Package | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function PurchaseLeadModal({
  open,
  pkg,
  onClose,
  onSuccess,
}: PurchaseLeadModalProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(20);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const minimum = 20;

  useEffect(() => {
    if (pkg) {
      setQuantity(20);
      setErrorMessage("");
    }
  }, [pkg]);

  if (!open || !pkg) return null;

  const handleQuantityChange = (value: string) => {
    if (value === "") {
      setQuantity(0);
      return;
    }
    const parsed = parseInt(value, 10);
    if (!Number.isNaN(parsed)) {
      setQuantity(parsed);
    }
  };

  const handlePayNow = async () => {
    try {
      if (quantity < minimum) {
        setErrorMessage(`Kam se kam ${minimum} leads purchase karna zaroori hai.`);
        return;
      }

      setLoading(true);
      setErrorMessage("");

      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error(
          "Razorpay SDK load nahi ho paya. Internet connection check karein."
        );
      }

      const orderData = await createPaymentOrder({
        packageId: pkg._id,
        quantity,
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Leadsvero",
        description: `${pkg.name} — ${quantity} Leads`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            setLoading(true);
            const verifyRes = await verifyPaymentSignature({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (verifyRes.success) {
              onClose();
              if (onSuccess) onSuccess();
              router.push("/orders");
            }
          } catch (err: any) {
            setErrorMessage(
              err?.response?.data?.message ||
                "Payment verification fail ho gaya. Support se sampark karein."
            );
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
        theme: {
          color: "#0c4731",
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);

      razorpayInstance.on("payment.failed", function (response: any) {
        setErrorMessage(
          response.error?.description ||
            "Payment fail ho gaya. Kripya dobara koshish karein."
        );
        setLoading(false);
      });

      razorpayInstance.open();
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.message ||
          err.message ||
          "Payment initiate karne me samasya aayi."
      );
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4 transition-all duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-t-[32px] sm:rounded-[28px] bg-white shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 sm:px-7 py-4 sm:py-5 bg-gradient-to-r from-slate-50 to-white">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none">
                Purchase Package Leads
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#eef7ee] text-[#0c4731] border border-[#d6ecd6] text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                <Sparkles size={10} /> Verified
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 font-medium">
              {pkg.name} ({pkg.category})
            </p>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 disabled:opacity-50 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 sm:space-y-5 p-5 sm:p-7 overflow-y-auto">
          {errorMessage && (
            <div className="flex items-start gap-2.5 rounded-2xl bg-red-50 border border-red-200 p-3 text-xs text-red-700 font-medium">
              <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Quantity Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs sm:text-sm font-semibold text-slate-800">
                Number of Leads
              </label>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100">
                Instant / Pre-order
              </span>
            </div>

            <div className="relative">
              <input
                type="number"
                min={minimum}
                value={quantity === 0 ? "" : quantity}
                disabled={loading}
                onChange={(e) => handleQuantityChange(e.target.value)}
                onBlur={() => {
                  if (quantity < minimum) setQuantity(minimum);
                }}
                className="h-12 sm:h-13 w-full rounded-2xl border border-slate-200/90 bg-[#f8fafc] px-4 font-bold text-slate-900 text-sm sm:text-base outline-none transition-all focus:border-[#0c4731] focus:bg-white focus:ring-4 focus:ring-emerald-900/5"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                Units
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-normal">
              <span>
                Minimum order: <b className="font-semibold text-slate-800">{minimum}</b>
              </span>
              <span>
                Rate: <b className="font-semibold text-slate-800">₹{pkg.pricePerLead}</b> / lead
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-[#fbfdfb] p-3.5 sm:p-4">
            <PurchaseSummary
              quantity={quantity < minimum ? minimum : quantity}
              pricePerLead={pkg.pricePerLead}
            />
          </div>

          {/* Delivery Note */}
          <div className="flex items-start gap-2.5 rounded-2xl bg-[#eef7ee] border border-[#d6ecd6] p-3.5 text-xs text-[#0c4731]">
            <Clock size={16} className="mt-0.5 shrink-0 text-[#0c4731]" />
            <p className="font-normal leading-relaxed">
              Order place hote hi leads <b>12 se 24 hours</b> ke andar assign hokar <b>My Orders</b> me CSV download ke liye ready ho jayengi.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="flex-1 rounded-2xl border border-slate-200 bg-white py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 active:scale-95 disabled:opacity-50 transition-all cursor-pointer shadow-sm"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={loading || quantity < minimum}
              onClick={handlePayNow}
              className="flex-[1.5] inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0c4731] hover:bg-[#083021] py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white active:scale-95 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all shadow-md shadow-emerald-950/20 cursor-pointer"
            >
              <ShoppingCart size={16} className="text-[#a3e635]" />
              <span>
                {loading
                  ? "Processing..."
                  : `Pay ₹${((quantity < minimum ? minimum : quantity) * pkg.pricePerLead).toLocaleString("en-IN")}`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}