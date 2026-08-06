"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();

  // Static data (baad me backend se replace kar denge)
  const isLoggedIn = false;

  const user = {
    fullName: "Ajay Sharma",
    email: "ajaysharma47@gmail.com",
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  const menus = [
    { title: "Home", href: "/" },
    { title: "Platforms", href: "/platforms" },
    { title: "Pricing", href: "/pricing" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

      <div className="max-w-[1440px] mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}

        <Link
          href="/"
          className="text-3xl font-bold text-blue-600"
        >
          LeadsExpert
        </Link>

        {/* Desktop Menu */}

        <nav className="hidden lg:flex items-center gap-10">

          {menus.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-medium transition ${
                pathname === item.href
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {item.title}
            </Link>
          ))}

        </nav>

        {/* Right */}

        <div className="hidden lg:flex items-center gap-4">

          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button className="flex items-center gap-3 border rounded-xl px-3 py-2 hover:bg-gray-50 transition">

              <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">

                {user.fullName.charAt(0)}

              </div>

              <div className="text-left">

                <p className="font-semibold text-sm">
                  {user.fullName}
                </p>

                <p className="text-xs text-gray-500">
                  {user.email}
                </p>

              </div>

              <ChevronDown size={18} />

            </button>
          )}

        </div>

        {/* Mobile Button */}

        <button
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          className="lg:hidden"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Menu */}

      {mobileOpen && (
        <div className="lg:hidden border-t bg-white">

          <div className="px-6 py-5 space-y-5">

            {menus.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() =>
                  setMobileOpen(false)
                }
                className="block"
              >
                {item.title}
              </Link>
            ))}

            {!isLoggedIn ? (
              <div className="space-y-3 pt-5">

                <Link
                  href="/login"
                  className="block text-center border rounded-xl py-3"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="block text-center rounded-xl py-3 bg-blue-600 text-white"
                >
                  Sign Up
                </Link>

              </div>
            ) : (
              <div className="flex items-center gap-3 pt-5">

                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

                  {user.fullName.charAt(0)}

                </div>

                <div>

                  <p className="font-semibold">
                    {user.fullName}
                  </p>

                  <p className="text-sm text-gray-500">
                    {user.email}
                  </p>

                </div>

              </div>
            )}

          </div>

        </div>
      )}
    </header>
  );
}