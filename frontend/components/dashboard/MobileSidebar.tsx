"use client";

import {
  X,
  LayoutDashboard,
  Search,
  ShoppingBag,
  Download,
  Wallet,
  Heart,
  User,
  Settings,
} from "lucide-react";

import SidebarItem from "./SidebarItem";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function MobileSidebar({
  open,
  setOpen,
}: Props) {
  if (!open) return null;

  return (
    <>

      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 bg-black/40 z-40"
      />

      <aside className="fixed left-0 top-0 h-screen w-72 bg-white z-50 p-6">

        <div className="flex items-center justify-between">

          <h2 className="font-bold text-xl">
            Leads Expert
          </h2>

          <button
            onClick={() => setOpen(false)}
          >
            <X />
          </button>

        </div>

        <div className="space-y-2 mt-8">

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