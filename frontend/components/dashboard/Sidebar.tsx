"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PieChart,
  Compass,
  ShoppingBag,
  Download,
  Heart,
  // Wallet,
  // Headphones,
  Smartphone,
  LogOut,
  Menu,
  X,
  Settings,
  User,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  title: string;
  href: string;
  icon: any;
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: PieChart },
  { title: "Browse Leads", href: "/browse-leads", icon: Compass },
  { title: "My Orders", href: "/orders", icon: ShoppingBag },
  { title: "Downloads", href: "/downloads", icon: Download },
  { title: "Profile", href: "/profile", icon: User },
  { title: "Settings", href: "/settings", icon: Settings },
  // { title: "Favorites", href: "/favorites", icon: Heart },
  // { title: "Wallet", href: "/wallet", icon: Wallet },
  // { title: "Support", href: "/support", icon: Headphones },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between select-none">
      
      {/* Top Header + Navigation Items (Scrollable internally if screen height is small) */}
      <div className="flex flex-col flex-1 min-h-0">
        
        {/* Fixed Brand Header */}
        <div className="flex items-center gap-3 px-2 py-3 mb-2 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#38ef7d] to-[#a3e635] flex items-center justify-center font-black text-white text-xl shadow-md">
            L
          </div>
          <span className="text-xl font-black tracking-wider text-white">
            Leadsvero
          </span>
        </div>

        {/* Menu Navigation Links */}
        <nav className="space-y-1 mt-1 overflow-y-auto pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-[#16222b] text-[#c0f057] border-r-4 border-[#a3e635] shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-[#131b2e]"
                }`}
              >
                <Icon
                  size={19}
                  className={isActive ? "text-[#c0f057]" : "text-slate-300"}
                />
                <span className="tracking-tight">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Fixed Area: App Card + User Details + Logout */}
      <div className="flex flex-col gap-3 pt-3 flex-shrink-0 border-t border-slate-800/60 mt-2">
        
        {/* Mobile App Promo Card */}
        <div className="bg-[#a3e635] text-slate-950 p-3.5 rounded-[22px] shadow-lg flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-slate-900 mb-0.5">
            <Smartphone size={14} className="stroke-[2.5]" />
            <span>MOBILE APP</span>
          </div>

          <p className="text-[11.5px] font-semibold text-slate-900 leading-snug mb-2.5">
            Download the Leadsvero app for instant lead access on the go.
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-[#0b1120] text-white text-[11px] font-bold shadow hover:bg-black transition-colors cursor-pointer">
              <span>🍎</span>
              <span>iOS</span>
            </button>

            <button className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl bg-[#0b1120] text-white text-[11px] font-bold shadow hover:bg-black transition-colors cursor-pointer">
              <span>▶</span>
              <span>Android</span>
            </button>
          </div>
        </div>

        {/* User Card + Logout */}
        <div className="bg-[#121a2d] border border-slate-800/80 rounded-[22px] p-3 flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#38ef7d] to-[#a3e635] text-slate-950 flex items-center justify-center font-black text-sm shadow-sm flex-shrink-0">
              {user?.fullName?.charAt(0).toUpperCase() || "A"}
            </div>
            
            <div className="flex flex-col min-w-0 flex-1 leading-tight">
              <span className="text-xs sm:text-sm font-bold text-white truncate">
                {user?.fullName || "Ajay Sharma"}
              </span>
              <span className="text-[11px] text-slate-400 truncate mt-0.5">
                {user?.email || "ajaysharma47@gmail.com"}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#1d273d] hover:bg-[#25324d] text-slate-200 text-xs font-bold transition-all duration-150 cursor-pointer shadow-sm active:scale-98"
          >
            <LogOut size={14} className="rotate-180" />
            <span>Logout</span>
          </button>
        </div>

      </div>

    </div>
  );

  return (
    <>
      {/* Mobile Toggle Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 lg:hidden z-50 p-2 rounded-xl bg-[#0b1120] text-white shadow-xl border border-slate-800 cursor-pointer"
        aria-label="Open Sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Desktop Fixed Sidebar (Never scrolls with main page) */}
      <aside className="hidden lg:flex w-64 xl:w-72 bg-[#0b1120] text-white h-screen fixed top-0 left-0 flex-col p-4 border-r border-slate-800/70 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-72 bg-[#0b1120] text-white h-full p-4 flex flex-col z-50 shadow-2xl border-r border-slate-800">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}