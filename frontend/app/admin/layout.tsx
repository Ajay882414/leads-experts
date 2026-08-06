"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";

import Sidebar from "@/components/admin/Sidebar";
import MobileSidebar from "@/components/admin/MobileSidebar";
import Header from "@/components/admin/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace(
  "/login?redirect=/admin/dashboard"
);
      return;
    }

    if (user.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Sidebar />

      <MobileSidebar />

      <div className="lg:ml-72">

        <Header />

        <main className="pt-24 p-6">

          {children}

        </main>

      </div>

    </div>
  );
}