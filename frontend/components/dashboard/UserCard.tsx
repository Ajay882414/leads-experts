"use client";

import Link from "next/link";

interface UserCardProps {
  user: {
    fullName?: string;
    email?: string;
    role?: string;
  } | null;
}

export default function UserCard({ user }: UserCardProps) {
  const firstName = user?.fullName ? user.fullName.split(" ")[0] : "Farhin";

  return (
    <div className="relative w-full overflow-hidden rounded-[28px] bg-gradient-to-r from-[#0a1512] via-[#0f2820] to-[#143d2c] p-7 sm:p-9 text-white shadow-sm border border-emerald-950/40">
      {/* Subtle Right Ambient Glow (Match to image) */}
      <div className="pointer-events-none absolute right-4 -bottom-10 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="pointer-events-none absolute right-28 top-2 h-44 w-44 rounded-full bg-[#a3e635]/10 blur-2xl" />

      <div className="relative z-10 flex flex-col items-start max-w-2xl">
        {/* Title */}
        <h2 className="text-2xl sm:text-[32px] font-black font-medium tracking-tight text-white flex items-center gap-2">
          Welcome! {firstName} <span className="inline-block text-2xl sm:text-3xl">👋</span>
        </h2>

        {/* Subtitle / Description */}
        <p className="mt-2.5 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-lg">
          Track your lead purchases, download CSVs, and manage your wallet — all in one place.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center gap-3">
          {/* Browse Leads Button */}
          <Link
            href="/browse-leads"
            className="inline-flex items-center justify-center rounded-xl bg-[#a3e635] hover:bg-[#b2f046] px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 transition-all duration-150 active:scale-95 shadow-sm"
          >
            Browse Leads
          </Link>

          {/* Add Funds Button */}
          <Link
            href="/wallet"
            className="inline-flex items-center justify-center rounded-xl bg-[#1e2e28] hover:bg-[#283d35] px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-all duration-150 active:scale-95 border border-emerald-800/40 shadow-sm"
          >
            Add Funds
          </Link>
        </div>
      </div>
    </div>
  );
}