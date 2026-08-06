"use client";

import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";

import SidebarItem from "./SidebarItem";
import { sidebarLinks } from "./sidebarData";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function MobileSidebar() {
  const [open, setOpen] =
    useState(false);

  const { logout } = useAuth();

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-50 bg-white p-2 rounded-lg shadow"
      >
        <Menu />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">

          <div className="w-72 bg-white h-full flex flex-col">

            <div className="flex justify-between items-center h-20 px-6 border-b">

              <h2 className="text-xl font-bold">
                Admin
              </h2>

              <button
                onClick={() =>
                  setOpen(false)
                }
              >
                <X />
              </button>

            </div>

            <div className="flex-1 p-5 space-y-2">

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
                className="w-full bg-red-600 text-white py-3 rounded-xl flex justify-center items-center gap-2"
              >
                <LogOut size={20} />

                Logout
              </button>

            </div>

          </div>

          <div
            className="flex-1 bg-black/50"
            onClick={() =>
              setOpen(false)
            }
          />

        </div>
      )}
    </>
  );
}