"use client";

import { useEffect, useState } from "react";
import { Users, ShoppingBag, Database, ArrowUpRight, Loader2 } from "lucide-react";
import { getReferralClients, getReferralReport } from "@/services/referralApi";

interface Client {
  _id: string;
  fullName: string;
  email: string;
  referralCode: string;
}

interface ReportData {
  summary: {
    client: {
      name: string;
      email: string;
      referralCode: string;
    };
    totalUsersJoined: number;
    totalOrdersPlaced: number;
    totalLeadsPurchased: number;
    totalRevenue: number;
  };
  orders: Array<{
    orderId: string;
    user: {
      name: string;
      email: string;
    };
    platform: string;
    packageCard: string;
    quantity: number;
    pricePerLead: number;
    totalAmount: number;
    status: string;
    date: string;
  }>;
}

export default function ClientReferralTracker() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reportLoading, setReportLoading] = useState<boolean>(false);

  // 1. Load All Referral Clients
  useEffect(() => {
    async function loadClients() {
      try {
        setLoading(true);
        const data = await getReferralClients();
        if (data.success && data.clients && data.clients.length > 0) {
          setClients(data.clients);
          setSelectedClientId(data.clients[0]._id);
        } else {
          setClients([]);
        }
      } catch (err) {
        console.error("Failed to load referral clients:", err);
      } finally {
        setLoading(false);
      }
    }

    loadClients();
  }, []);

  // 2. Load Report for Selected Client
  useEffect(() => {
    if (!selectedClientId) {
      setReport(null);
      return;
    }

    async function loadReport() {
      try {
        setReportLoading(true);
        const data = await getReferralReport(selectedClientId);
        if (data.success) {
          setReport(data);
        }
      } catch (err) {
        console.error("Failed to load client report:", err);
      } finally {
        setReportLoading(false);
      }
    }

    loadReport();
  }, [selectedClientId]);

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-black/[0.08] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#111111]">
            Client Team &amp; Referral Orders
          </h2>
          <p className="text-xs text-neutral-500">
            Track which client’s members purchased which cards and quantities.
          </p>
        </div>

        {/* Client Selector Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-neutral-600">
            Select Client:
          </label>
          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            disabled={clients.length === 0}
            className="rounded-xl border border-black/[0.1] bg-neutral-50 px-3.5 py-2 text-xs font-semibold text-neutral-800 focus:border-black focus:outline-none disabled:opacity-50"
          >
            {clients.length === 0 ? (
              <option value="">No clients with referral code</option>
            ) : (
              clients.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.fullName} ({c.referralCode})
                </option>
              ))
            )}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
        </div>
      ) : clients.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center">
          <Users className="mx-auto h-8 w-8 text-neutral-400 mb-2" />
          <p className="text-sm font-semibold text-neutral-700">
            Abhi tak koi referral client nahi mila.
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            MongoDB Compass me kisi client ke account par <code>referralCode</code> set karein.
          </p>
        </div>
      ) : reportLoading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
        </div>
      ) : report ? (
        <>
          {/* Summary Stat Cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-black/[0.08] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-neutral-500">
                <Users className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Joined Users
                </span>
              </div>
              <p className="mt-2 font-mono text-2xl font-bold text-[#111111]">
                {report.summary.totalUsersJoined}
              </p>
            </div>

            <div className="rounded-2xl border border-black/[0.08] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-neutral-500">
                <ShoppingBag className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Orders Placed
                </span>
              </div>
              <p className="mt-2 font-mono text-2xl font-bold text-[#111111]">
                {report.summary.totalOrdersPlaced}
              </p>
            </div>

            <div className="rounded-2xl border border-black/[0.08] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-neutral-500">
                <Database className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Leads Bought
                </span>
              </div>
              <p className="mt-2 font-mono text-2xl font-bold text-[#111111]">
                {report.summary.totalLeadsPurchased}
              </p>
            </div>

            <div className="rounded-2xl border border-black/[0.08] bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-neutral-500">
                <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Total Volume
                </span>
              </div>
              <p className="mt-2 font-mono text-2xl font-bold text-emerald-600">
                ₹{report.summary.totalRevenue}
              </p>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-black/[0.08] bg-neutral-50 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                  <tr>
                    <th className="px-5 py-3.5">User</th>
                    <th className="px-5 py-3.5">Platform</th>
                    <th className="px-5 py-3.5">Card / Package</th>
                    <th className="px-5 py-3.5">Quantity</th>
                    <th className="px-5 py-3.5">Total Amount</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06]">
                  {report.orders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-5 py-8 text-center text-neutral-400">
                        Is client ke users ne abhi tak koi order place nahi kiya.
                      </td>
                    </tr>
                  ) : (
                    report.orders.map((ord) => (
                      <tr key={ord.orderId} className="hover:bg-neutral-50/50">
                        <td className="px-5 py-4">
                          <p className="font-semibold text-neutral-900">{ord.user?.name}</p>
                          <p className="text-[10px] text-neutral-400">{ord.user?.email}</p>
                        </td>
                        <td className="px-5 py-4 font-medium text-neutral-700">
                          {ord.platform}
                        </td>
                        <td className="px-5 py-4 font-semibold text-neutral-900">
                          {ord.packageCard}
                        </td>
                        <td className="px-5 py-4 font-mono font-bold text-neutral-800">
                          {ord.quantity} leads
                        </td>
                        <td className="px-5 py-4 font-mono font-bold text-neutral-900">
                          ₹{ord.totalAmount}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              ord.status === "Completed"
                                ? "bg-emerald-50 text-emerald-700"
                                : ord.status === "Pending"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-neutral-100 text-neutral-600"
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-mono text-[11px] text-neutral-400">
                          {new Date(ord.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}