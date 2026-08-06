"use client";

import {
  Bell,
  Search,
  Settings,
  ChevronDown,
  LogOut,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const router = useRouter();

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();

      router.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="sticky top-0 z-40 h-20 bg-white border-b border-gray-200 px-8">

      <div className="h-full flex items-center justify-between">

        {/* Left */}

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-sm text-gray-500">
            Welcome back 👋
          </p>
        </div>

        {/* Search */}

        <div className="hidden lg:block w-[450px]">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search Leads..."
              className="w-full h-12 rounded-xl border border-gray-300 pl-12 pr-5 outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          <button className="relative">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500"></span>
          </button>

          <button>
            <Settings size={22} />
          </button>

          {/* User */}

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              {user?.fullName?.charAt(0).toUpperCase()}
            </div>

            <div className="hidden md:block">
              <h3 className="font-semibold">
                {user?.fullName}
              </h3>

              <p className="text-xs text-gray-500">
                {user?.email}
              </p>
            </div>

            <ChevronDown size={18} />
          </div>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>

    </header>
  );
}