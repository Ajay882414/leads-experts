"use client";

import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

interface QuickActionProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export default function QuickAction({
  title,
  description,
  href,
  icon: Icon,
  badge,
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className="group relative flex items-center justify-between rounded-[14px] border border-slate-100 bg-white p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
    >
      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
        {/* Icon Pill: Soft mint-green background to Solid Dark Green on Hover */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef7ee] text-[#0c4731] transition-all duration-200 group-hover:bg-[#0c4731] group-hover:text-[#a3e635] shadow-inner">
          <Icon size={20} className="stroke-[2.2]" />
        </div>

        {/* Text Stack */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight truncate">
              {title}
            </h4>

            {/* Lime/Emerald Badge */}
            {badge && (
              <span className="rounded-full bg-[#a3e635] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-sm">
                {badge}
              </span>
            )}
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">
            {description}
          </p>
        </div>
      </div>

      {/* Trailing Arrow */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-200 group-hover:bg-slate-50">
        <ArrowRight
          size={16}
          className="text-slate-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#0c4731]"
        />
      </div>
    </Link>
  );
}