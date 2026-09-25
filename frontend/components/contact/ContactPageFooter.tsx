"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart } from "lucide-react";

export default function ContactPageFooter() {
  return (
    <footer className="relative w-full bg-[#05140e] text-slate-300 py-12 px-4 sm:px-6 overflow-hidden">
      
      {/* Background Matrix Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto space-y-10">
        
        {/* Top Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-emerald-950/80">
          
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-xl bg-[#0c4731] border border-emerald-500/40 flex items-center justify-center text-[#a3e635] text-xs font-normal">
                LV
              </div>
              <span className="text-base font-normal tracking-tight text-white">LeadsVero</span>
            </div>
            <p className="text-xs text-slate-400 font-normal leading-relaxed">
              India&apos;s verified lead sourcing engine. Direct channel acquisition with single-buyer protection.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-normal text-white uppercase tracking-wider">Pages</h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-normal">
              <li><Link href="/" className="hover:text-emerald-300 transition-colors">Home</Link></li>
              <li><Link href="/platforms" className="hover:text-emerald-300 transition-colors">Marketplace</Link></li>
              <li><Link href="/how-it-works" className="hover:text-emerald-300 transition-colors">How It Works</Link></li>
              <li><Link href="/why-us" className="hover:text-emerald-300 transition-colors">Why Us</Link></li>
            </ul>
          </div>

          {/* Col 3: Support Hours */}
          <div className="space-y-2">
            <h4 className="text-xs font-normal text-white uppercase tracking-wider">Desk Hours</h4>
            <p className="text-xs text-slate-400 font-normal">Monday – Saturday</p>
            <p className="text-xs font-normal text-white">9:00 AM – 9:00 PM IST</p>
            <p className="text-[11px] text-[#a3e635] font-normal">Priority WhatsApp 24/7</p>
          </div>

          {/* Col 4: Quality Commitment */}
          <div className="space-y-2">
            <h4 className="text-xs font-normal text-white uppercase tracking-wider">Guarantee</h4>
            <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-normal">
              <ShieldCheck size={14} className="text-[#a3e635]" />
              <span>Anti-Recycle Verified</span>
            </div>
            <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
              Data purchased on LeadsVero is permanently encrypted and retired from resale pools.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-normal">
          <p>© {new Date().getFullYear()} LeadsVero Data Systems. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Refund Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
}