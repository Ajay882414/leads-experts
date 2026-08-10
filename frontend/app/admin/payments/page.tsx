"use client";

import { useEffect, useState } from "react";

import { getPayments } from "@/services/paymentApi";

import PaymentTable from "@/components/admin/payment/PaymentTable";
import PaymentLoading from "@/components/admin/payment/PaymentLoading";
import PaymentEmpty from "@/components/admin/payment/PaymentEmpty";

export default function PaymentsPage() {

  const [payments, setPayments] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments =
    async () => {

      try {

        const res =
          await getPayments();

        setPayments(
          res.payments
        );

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }

    };

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Payments
        </h1>

        <p className="text-gray-500 mt-2">
          Manage payment records
        </p>

      </div>

      {loading ? (
        <PaymentLoading />
      ) : payments.length === 0 ? (
        <PaymentEmpty />
      ) : (
        <PaymentTable
          payments={payments}
        />
      )}

    </div>
  );
}