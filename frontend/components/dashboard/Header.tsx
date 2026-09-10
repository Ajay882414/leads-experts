"use client";

import { Bell, Settings, ChevronDown, Wallet } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 lg:left-64 xl:left-72 right-0 z-30 h-16 sm:h-20 bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-8 flex items-center justify-between transition-all duration-200">
      
      {/* Left: Title & Subtitle (Mobile menu button space handled via pl-12) */}
      <div className="pl-12 lg:pl-0">
        <h1 className="text-lg sm:text-2xl font-medium text-slate-800 tracking-tight leading-none">
          Dashboard
        </h1>
        <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-1 truncate">
          Welcome back 👋
        </p>
      </div>

      {/* Right Controls: Wallet, Alerts, Settings, User */}
      <div className="flex items-center gap-2 sm:gap-4">
        
        {/* Wallet Balance Badge */}
        {/* <Link
          href="/wallet"
          className="flex items-center gap-1.5 sm:gap-2 bg-[#0c2419] text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm hover:bg-[#081a12] transition-colors border border-emerald-900/60 flex-shrink-0"
        >
          <Wallet size={15} className="text-[#a3e635]" />
          <span className="whitespace-nowrap">₹ 12,450</span>
        </Link> */}

        {/* Notifications Link Button */}
        <Link
          href="/notifications"
          className="relative p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} className="sm:w-5 sm:h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Link>
        

        {/* Settings Icon Button */}
        <Link
          href="/settings"
          className="hidden sm:flex p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Settings"
        >
          <Settings size={18} className="sm:w-5 sm:h-5" />
        </Link>

        {/* User Identity Pill */}
        <div className="flex items-center gap-2 sm:gap-2.5 pl-1 sm:pl-2 sm:border-l sm:border-gray-200">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#38ef7d] to-[#a3e635] text-slate-950 flex items-center justify-center font-black text-xs sm:text-sm shadow-sm flex-shrink-0">
            {user?.fullName?.charAt(0).toUpperCase() || "A"}
          </div>

          <div className="hidden md:flex flex-col text-left leading-tight">
            <span className="font-bold text-xs sm:text-sm text-slate-800 truncate max-w-[120px]">
              {user?.fullName || "Ajay Sharma"}
            </span>
            <span className="text-[10px] text-gray-400 truncate max-w-[120px]">
              Active Account
            </span>
          </div>

          <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
        </div>

      </div>

    </header>
  );
}