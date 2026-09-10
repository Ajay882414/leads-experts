"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
  };

  return (
    <section className="relative w-full  text-white  overflow-hidden">
      <div className="max-w-7xl mx-auto bg-[#111827] pt-16  pb-12 mb-16  px-4 sm:px-8  rounded-[30px] mt-10">
        
        {/* ================= TOP SECTION: FOUNDER'S DESK + CONTACT FORM ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start pb-20 sm:pb-24 border-b border-slate-800/80">
          
          {/* ----- LEFT: FROM THE FOUNDER'S DESK ----- */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-[42px] font-medium font-black text-white tracking-tight leading-tight">
                From the Founder&apos;s Desk!!
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-400 font-medium">
                Uncover the purpose, passion, and vision that drives LEADFLOW forward.
              </p>

              {/* Quote Mark */}
              <div className="mt-8 text-[#97df2c] text-5xl sm:text-6xl font-serif font-black leading-none select-none">
                “
              </div>

              {/* Quote Body */}
              <p className="mt-4 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal max-w-xl">
                Businesses don&apos;t fail due to bad products; they fail because of a lack of targeted, high-intent buyers. LEADFLOW is built to eliminate cold outreach friction and give entrepreneurs, creators, and sales professionals instant access to genuine, verified leads.
              </p>

              <p className="mt-4 text-xs sm:text-sm text-slate-400 font-medium">
                — Founder & CEO, LeadFlow
              </p>
            </div>

            {/* Founder Avatars */}
            <div className="mt-10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700 relative shadow-md">
                <Image
                  src="/image.png"
                  alt="Founder"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700 relative shadow-md">
                <Image
                  src="/image.png"
                  alt="Co-Founder"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700 relative shadow-md">
                <Image
                  src="/image.png"
                  alt="Leadership"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* ----- RIGHT: CONTACT US CARD ----- */}
          <div className="lg:col-span-6 bg-[#1f293d]/70 rounded-[12px] p-6 sm:p-10 border border-slate-800 shadow-2xl backdrop-blur-sm">
            <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mb-6">
              Contact Us
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your Name"
                  required
                  className="w-full bg-white text-slate-900 px-4 py-3 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500 font-medium placeholder-slate-400 shadow-inner"
                />
                <div className="text-right text-[10px] text-slate-400 mt-1">
                  {formData.name.length}/50
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-white text-slate-900 px-4 py-3 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500 font-medium placeholder-slate-400 shadow-inner"
                />
                <div className="text-right text-[10px] text-slate-400 mt-1">
                  {formData.email.length}/100
                </div>
              </div>

              {/* Phone Number Field */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your Phone Number"
                  required
                  className="w-full bg-white text-slate-900 px-4 py-3 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-emerald-500 font-medium placeholder-slate-400 shadow-inner"
                />
                <div className="text-right text-[10px] text-slate-400 mt-1">
                  {formData.phone.length}/10
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className="w-full bg-[#1b4b3e] hover:bg-[#163f34] text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-98"
              >
                Contact Us
              </button>
            </form>
          </div>

        </div>

        {/* ================= BOTTOM FOOTER NAVIGATION ================= */}
        <div className="pt-14 pb-8 flex flex-col md:flex-row justify-between items-start gap-12">
          
          {/* Brand Col + App Store Badges */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white text-[#111827] flex items-center justify-center font-black text-sm tracking-tighter">
                LP
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-medium tracking-wider leading-none text-white">
                  LEADFLOW
                </span>
                <span className="text-[8px] text-slate-400 font-semibold tracking-widest uppercase mt-0.5">
                  The Lead Acquisition Engine
                </span>
              </div>
            </Link>

            {/* Google Play & App Store Buttons */}
            <div className="flex items-center gap-3">
              {/* Google Play Button */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black border border-slate-700 text-white cursor-pointer hover:border-slate-500 transition-colors">
                <span className="text-lg">▶</span>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[7px] uppercase tracking-wider text-slate-400">GET IT ON</span>
                  <span className="text-[11px] font-bold">Google Play</span>
                </div>
              </div>

              {/* Apple App Store Button */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black border border-slate-700 text-white cursor-pointer hover:border-slate-500 transition-colors">
                <span className="text-lg">🍏</span>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[7px] uppercase tracking-wider text-slate-400">Download on the</span>
                  <span className="text-[11px] font-bold">App Store</span>
                </div>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex gap-16 sm:gap-24">
            
            {/* Support Links */}
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white mb-4">
                Support
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/affiliate" className="hover:text-white transition-colors">Free Affiliate</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
              </ul>
            </div>

            {/* Package Links */}
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white mb-4">
                Our Packages
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><Link href="/packages/pro" className="hover:text-white transition-colors">Pro</Link></li>
                <li><Link href="/packages/supreme" className="hover:text-white transition-colors">Supreme</Link></li>
                <li><Link href="/packages/premium" className="hover:text-white transition-colors">Premium</Link></li>
                <li><Link href="/packages/premium-plus" className="hover:text-white transition-colors">Premium Plus</Link></li>
              </ul>
            </div>

          </div>

        </div>

        {/* ================= COPYRIGHT & LEGAL BAR ================= */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-slate-400">
          <div>
            © 2026 Leadflow. Copyright and rights reserved
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/contact" className="hover:text-white transition-colors">Contact us</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </section>
  );
}