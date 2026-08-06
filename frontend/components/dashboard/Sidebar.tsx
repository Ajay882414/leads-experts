"use client";

import { useState } from "react";

import {
  LayoutDashboard,
  Search,
  ShoppingBag,
  Download,
  Wallet,
  Heart,
  User,
  Settings,
  Menu,
} from "lucide-react";

import SidebarItem from "./SidebarItem";
import MobileSidebar from "./MobileSidebar";

export default function Sidebar() {
  const [open, setOpen] =
    useState(false);

  return (
    <>

      <button
        onClick={() => setOpen(true)}
        className="fixed top-5 left-5 lg:hidden z-50"
      >
        <Menu />
      </button>

      <MobileSidebar
        open={open}
        setOpen={setOpen}
      />

      <aside className="hidden lg:flex w-72 bg-white border-r h-screen sticky top-0 flex-col p-6">

        <h1 className="text-2xl font-bold mb-10">
          Leads Expert
        </h1>

        <div className="space-y-2">

          <SidebarItem
            title="Dashboard"
            href="/dashboard"
            icon={LayoutDashboard}
          />

          <SidebarItem
            title="Browse Leads"
            href="/browse-leads"
            icon={Search}
          />

          <SidebarItem
            title="Orders"
            href="/orders"
            icon={ShoppingBag}
          />

          <SidebarItem
            title="Downloads"
            href="/downloads"
            icon={Download}
          />

          <SidebarItem
            title="Wallet"
            href="/wallet"
            icon={Wallet}
          />

          <SidebarItem
            title="Favorites"
            href="/favorites"
            icon={Heart}
          />

          <SidebarItem
            title="Profile"
            href="/profile"
            icon={User}
          />

          <SidebarItem
            title="Settings"
            href="/settings"
            icon={Settings}
          />

        </div>

      </aside>

    </>
  );
}