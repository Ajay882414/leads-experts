"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, LogOut, Sparkles } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Why Us", href: "/why-us" },
    { label: "Contact us", href: "/contact" },
  ];

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-6 transition-all duration-300">
      <nav
        className={`w-full max-w-5xl text-white px-4 sm:px-6 py-2.5 rounded-full flex items-center justify-between border transition-all duration-300 ${
          scrolled
            ? "shadow-2xl border-emerald-900/60 bg-[#092219]/95 backdrop-blur-md"
            : "shadow-xl border-emerald-950/80 bg-[#092219]/95"
        }`}
      >
        {/* Brand Logo - Leadsvero */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="">
            <img src="/image 17.png" className="w-[200]" alt="" />
          </div>
         
        </Link>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm font-normal text-slate-300">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors font-normal ${
                  isActive ? "text-[#a3e635]" : "hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Auth CTA Section */}
        <div className="hidden sm:flex items-center gap-2.5">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-normal px-4 sm:px-5 py-2 rounded-full bg-[#a3e635] text-slate-950 hover:bg-[#b5f448] transition-all duration-200 shadow-sm"
              >
                <LayoutDashboard size={14} />
                <span>Dashboard</span>
              </Link>

              {logout && (
                <button
                  type="button"
                  onClick={logout}
                  className="p-2 rounded-full border border-emerald-800/60 text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                  title="Logout"
                >
                  <LogOut size={14} />
                </button>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-xs sm:text-sm font-normal px-4 sm:px-5 py-2 rounded-full bg-white text-slate-950 hover:bg-slate-100 transition-all duration-200 shadow-sm"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-xs sm:text-sm font-normal px-4 sm:px-5 py-2 rounded-full border border-emerald-500/40 text-[#a3e635] hover:bg-[#a3e635]/10 transition-all duration-200"
              >
                Register Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="sm:hidden absolute top-14 left-4 right-4 bg-[#092219] text-white p-5 rounded-2xl border border-emerald-900/80 shadow-2xl flex flex-col gap-3 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm font-normal py-1 text-slate-200 hover:text-[#a3e635] transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex flex-col gap-2 pt-3 border-t border-emerald-900/60">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center gap-2 text-sm font-normal py-2.5 rounded-full bg-[#a3e635] text-slate-950 shadow-sm"
                >
                  <LayoutDashboard size={15} />
                  <span>Go to Dashboard</span>
                </Link>
                {logout && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                    }}
                    className="text-xs font-normal py-2 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    Logout Account
                  </button>
                )}
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-normal py-2.5 rounded-full bg-white text-slate-950"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-normal py-2.5 rounded-full border border-emerald-500/40 text-[#a3e635]"
                >
                  Register Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}