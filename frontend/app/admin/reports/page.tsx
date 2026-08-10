"use client";

import { useEffect, useState } from "react";

import {
  getDashboardReport,
  getSalesReport,
  getPlatformReport,
  getUserReport,
  getOrderReport,
  getDownloadReport,
} from "@/services/reportApi";

import ReportCards from "@/components/admin/report/ReportCards";
import ReportFilter from "@/components/admin/report/ReportFilter";
import ReportLoading from "@/components/admin/report/ReportLoading";
import ReportEmpty from "@/components/admin/report/ReportEmpty";

import SalesReportTable from "@/components/admin/report/SalesReportTable";
import PlatformReportTable from "@/components/admin/report/PlatformReportTable";
import UserReportTable from "@/components/admin/report/UserReportTable";
import OrderReportTable from "@/components/admin/report/OrderReportTable";
import DownloadReportTable from "@/components/admin/report/DownloadReportTable";

export default function ReportsPage() {
  const [loading, setLoading] =
    useState(true);

  const [type, setType] =
    useState("dashboard");

  const [dashboard, setDashboard] =
    useState<any>(null);

  const [sales, setSales] =
    useState<any[]>([]);

  const [platforms, setPlatforms] =
    useState<any[]>([]);

  const [users, setUsers] =
    useState<any[]>([]);

  const [orders, setOrders] =
    useState<any[]>([]);

  const [downloads, setDownloads] =
    useState<any[]>([]);

  useEffect(() => {
    loadReport();
  }, [type]);

  const loadReport = async () => {
    try {
      setLoading(true);

      switch (type) {
        case "dashboard": {
          const res =
            await getDashboardReport();

          setDashboard(res.report);

          break;
        }

        case "sales": {
          const res =
            await getSalesReport();

          setSales(res.orders);

          break;
        }

        case "platforms": {
          const res =
            await getPlatformReport();

          setPlatforms(
            res.platforms
          );

          break;
        }

        case "users": {
          const res =
            await getUserReport();

          setUsers(res.users);

          break;
        }

        case "orders": {
          const res =
            await getOrderReport();

          setOrders(res.orders);

          break;
        }

        case "downloads": {
          const res =
            await getDownloadReport();

          setDownloads(
            res.downloads
          );

          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ReportLoading />;
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Reports
        </h1>

        <p className="text-gray-500">
          Analytics & Reports
        </p>

      </div>

      <ReportFilter
        value={type}
        onChange={setType}
      />

      {type === "dashboard" &&
        dashboard && (
          <ReportCards
            report={dashboard}
          />
        )}

      {type === "sales" &&
        (sales.length ? (
          <SalesReportTable
            orders={sales}
          />
        ) : (
          <ReportEmpty />
        ))}

      {type === "platforms" &&
        (platforms.length ? (
          <PlatformReportTable
            platforms={platforms}
          />
        ) : (
          <ReportEmpty />
        ))}

      {type === "users" &&
        (users.length ? (
          <UserReportTable
            users={users}
          />
        ) : (
          <ReportEmpty />
        ))}

      {type === "orders" &&
        (orders.length ? (
          <OrderReportTable
            orders={orders}
          />
        ) : (
          <ReportEmpty />
        ))}

      {type === "downloads" &&
        (downloads.length ? (
          <DownloadReportTable
            downloads={downloads}
          />
        ) : (
          <ReportEmpty />
        ))}

    </div>
  );
}