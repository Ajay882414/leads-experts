"use client";

import { Bell } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-72 h-20 bg-white border-b z-40 flex items-center justify-between px-8">

      <div>

        <h2 className="text-2xl font-bold">
          Admin Dashboard
        </h2>

      </div>

      <div className="flex items-center gap-5">

        <Bell className="cursor-pointer" />

        <div className="flex items-center gap-3">

          <div className="h-11 w-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold uppercase">

            {user?.fullName?.charAt(0)}

          </div>

          <div>

            <p className="font-semibold">
              {user?.fullName}
            </p>

            <p className="text-sm text-gray-500">
              {user?.email}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}