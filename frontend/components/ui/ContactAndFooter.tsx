"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";

export default function ContactAndFooter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name" && value.length > 50) return;
    if (name === "email" && value.length > 100) return;
    if (name === "phone" && value.length > 10) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Our lead specialist will contact you shortly.");
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <footer className="relative w-full text-white overflow-hidden px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-[#111827] pt-12 sm:pt-16 pb-8 mb-10 sm:mb-16 px-5 sm:px-8 lg:px-12 rounded-[24px] sm:rounded-[32px] mt-10 border border-slate-800 shadow-2xl">
        
        {/* ================= TOP SECTION: FOUNDER'S DESK + CONTACT FORM ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pb-14 sm:pb-18 border-b border-slate-800/90">
          
          {/* ----- LEFT: FROM THE FOUNDER'S DESK ----- */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-[#a3e635] text-[11px] font-normal mb-4">
                <ShieldCheck size={13} />
                <span>Verified B2B Lead Marketplace</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                From the Founder&apos;s Desk!!
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 font-normal">
                Uncover the purpose, passion, and vision that drives Leadsvero forward.
              </p>

              {/* Quote Mark */}
              <div className="mt-6 text-[#97df2c] text-4xl sm:text-5xl font-serif leading-none select-none">
                “
              </div>

              {/* Quote Body */}
              <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                Businesses don&apos;t fail due to bad products; they fail because of a lack of targeted, high-intent buyers. Leadsvero is built to eliminate cold outreach friction and give entrepreneurs, creators, and sales professionals instant access to genuine, verified leads.
              </p>

              <p className="mt-4 text-xs sm:text-sm text-[#a3e635] font-medium">
                — Founder &amp; CEO, Leadsvero
              </p>
            </div>

            {/* Quick Contact Micro-Cards for Trust */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:+918769546871"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all text-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-950/80 flex items-center justify-center text-[#a3e635] shrink-0">
                  <Phone size={14} />
                </div>
                <div className="truncate">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Direct Hotline</p>
                  <p className="font-mono text-slate-200 text-xs">+91 8769546871</p>
                </div>
              </a>

              <a
                href="mailto:support@leadsvero.com"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all text-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-950/80 flex items-center justify-center text-[#a3e635] shrink-0">
                  <Mail size={14} />
                </div>
                <div className="truncate">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Support Desk</p>
                  <p className="font-mono text-slate-200 text-xs truncate">support@leadsvero.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* ----- RIGHT: CONTACT US CARD ----- */}
          <div className="lg:col-span-6 bg-[#1f293d]/80 rounded-[20px] p-5 sm:p-8 md:p-9 border border-slate-800 shadow-2xl backdrop-blur-sm w-full">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
              Contact Us
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Fill in your details and our data specialist will connect with you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your Name"
                  required
                  className="w-full bg-slate-900 text-white px-4 py-3 rounded-xl text-xs sm:text-sm outline-none border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-normal placeholder-slate-500 transition-all"
                />
                <div className="text-right text-[10px] text-slate-500 mt-1">
                  {formData.name.length}/50
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-slate-900 text-white px-4 py-3 rounded-xl text-xs sm:text-sm outline-none border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-normal placeholder-slate-500 transition-all"
                />
                <div className="text-right text-[10px] text-slate-500 mt-1">
                  {formData.email.length}/100
                </div>
              </div>

              {/* Phone Number Field */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  required
                  className="w-full bg-slate-900 text-white px-4 py-3 rounded-xl text-xs sm:text-sm outline-none border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-normal placeholder-slate-500 transition-all"
                />
                <div className="text-right text-[10px] text-slate-500 mt-1">
                  {formData.phone.length}/10
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full bg-[#1b4b3e] hover:bg-[#163f34] text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-[0.99] cursor-pointer"
              >
                Send Direct Inquiry
              </button>
            </form>
          </div>

        </div>

        {/* ================= MIDDLE FOOTER: BRAND & ADDRESS DETAILS ================= */}
        <div className="pt-10 sm:pt-12 pb-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white text-[#111827] flex items-center justify-center font-black text-sm tracking-tighter">
                LV
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-wider leading-none text-white">
                  Leadsvero
                </span>
                <span className="text-[9px] text-[#97df2c] font-semibold tracking-widest uppercase mt-0.5">
                  The Lead Acquisition Engine
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 font-normal max-w-sm leading-relaxed">
              India&apos;s intent-driven contact catalog for fast-moving sales teams, marketing agencies, and performance closers.
            </p>
          </div>

          {/* Registered Office (Mandatory for Razorpay Compliance) */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <MapPin size={14} className="text-[#a3e635]" />
              <span>Registered Business Desk</span>
            </h4>
            <address className="not-italic text-xs text-slate-400 space-y-1 leading-relaxed">
              <p className="text-slate-300 font-medium">LeadsVero Technologies</p>
              <p>City mall plus , Jagannathpuri Kanta road ,jhotwara jaipur 302012</p>
              <p>Email: <a href="mailto:support@leadsvero.com" className="text-slate-300 underline">support@leadsvero.com</a></p>
              <p>Phone: <a href="tel:+918769546871" className="text-slate-300 underline">+91 8769546871</a></p>
            </address>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link href="/cancellation-and-refund" className="hover:text-[#a3e635] text-slate-300 transition-colors">Cancellation &amp; Refund</Link></li>
            </ul>
          </div>

        </div>

        {/* ================= BOTTOM BAR: COPYRIGHT & 4 MANDATORY LEGAL LINKS ================= */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-slate-400">
          <div>
            © 2026 LeadsVero. All rights reserved.
          </div>

          {/* 4 Mandatory Policy Links required by Razorpay */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-slate-400">
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/cancellation-and-refund" className="hover:text-[#a3e635] text-slate-300 font-medium transition-colors">
              Refund &amp; Cancellation
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}