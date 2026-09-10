"use client";

import { Calculator } from "lucide-react";

interface PurchaseSummaryProps {
  quantity: number;
  pricePerLead: number;
}

export default function PurchaseSummary({
  quantity,
  pricePerLead,
}: PurchaseSummaryProps) {
  const totalAmount = quantity * pricePerLead;

  return (
    <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Calculator size={19} className="text-blue-600" />
        <h3 className="font-semibold text-gray-900">Purchase Summary</h3>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Total Leads</span>
          <span className="font-semibold text-gray-900">{quantity}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Price per lead</span>
          <span className="font-semibold text-gray-900">
            ₹{pricePerLead.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="border-t border-blue-100 pt-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700">Total Payable</span>
            <span className="text-xl font-bold text-blue-700">
              ₹{totalAmount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}