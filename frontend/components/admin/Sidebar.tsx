"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import SidebarItem from "./SidebarItem";
import { sidebarLinks } from "./sidebarData";

import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const router = useRouter();

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-200 flex-col">

      <div className="h-20 flex items-center justify-center border-b">

        <h1 className="text-2xl font-bold">
          Leads Admin
        </h1>

      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-2">

        {sidebarLinks.map((item) => (
          <SidebarItem
            key={item.href}
            {...item}
          />
        ))}

      </div>

      <div className="p-5 border-t">

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full bg-red-600 text-white py-3 rounded-xl justify-center"
        >
          <LogOut size={20} />

          Logout
        </button>

      </div>

    </aside>
  );
}