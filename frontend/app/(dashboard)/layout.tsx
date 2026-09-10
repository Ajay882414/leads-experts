"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?redirect=/dashboard");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#0b1120] text-white font-bold text-sm">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* 1. Left Fixed Sidebar */}
      <Sidebar />

      {/* 2. Main Area: lg:ml-64 xl:ml-72 lagaya hai taaki Header aur Content Sidebar ki width ke baad shuru hon */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 xl:ml-72 min-h-screen">
        {/* Fixed Header jo sidebar ke upar nahi aayega */}
        <Header />

        {/* Dashboard Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}