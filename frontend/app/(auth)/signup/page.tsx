"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    platform: "",
    state: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await signup(formData);
      alert("Account Created Successfully");
      router.push("/login");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#111c24] flex items-center justify-center p-4 py-12 overflow-hidden selection:bg-[#48d597] selection:text-black">
      
      {/* ================= BACKGROUND ACCENT RIBBONS ================= */}
      {/* Left Bottom Ribbon */}
      <div className="absolute -left-12 bottom-12 sm:bottom-20 z-0 pointer-events-none">
        <div className="w-56 sm:w-80 h-10 sm:h-14 bg-[#1f6b5b] transform -rotate-12 rounded-r-md opacity-90 shadow-2xl" />
        <div className="w-64 sm:w-96 h-10 sm:h-14 bg-[#48d597] transform -rotate-12 rounded-r-md -mt-4 shadow-2xl" />
      </div>

      {/* Right Top Ribbon */}
      <div className="absolute -right-12 top-12 sm:top-20 z-0 pointer-events-none">
        <div className="w-64 sm:w-96 h-10 sm:h-14 bg-[#1f6b5b] transform -rotate-12 rounded-l-md opacity-90 shadow-2xl" />
        <div className="w-56 sm:w-80 h-10 sm:h-14 bg-[#48d597] transform -rotate-12 rounded-l-md -mt-4 shadow-2xl" />
      </div>

      {/* ================= MAIN SIGNUP CARD ================= */}
      <div className="relative z-10 w-full max-w-[580px] bg-white rounded-[32px] sm:rounded-[36px] p-7 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-slate-100">
        
        {/* Card Header */}
        <div className="flex items-start justify-between gap-4 mb-7">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
              Create Account on <br />
              <span className="font-extrabold tracking-wide uppercase text-slate-950">
                Leadsvero
              </span>
            </h1>
          </div>

          <div className="text-right flex flex-col items-end">
            <span className="text-xs sm:text-[13px] text-slate-500 font-medium">
              Have an Account ?
            </span>
            <Link
              href="/login"
              className="text-xs sm:text-[13px] text-[#1f6b5b] hover:text-[#175246] font-bold transition-colors mt-0.5"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-[13px] text-slate-700 font-medium mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full bg-[#f0f4f9] text-slate-900 px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm border border-slate-200/80 outline-none focus:border-[#1f6b5b] focus:bg-white transition-all font-normal placeholder-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-[13px] text-slate-700 font-medium mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="user@example.com"
                required
                className="w-full bg-[#f0f4f9] text-slate-900 px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm border border-slate-200/80 outline-none focus:border-[#1f6b5b] focus:bg-white transition-all font-normal placeholder-slate-400"
              />
            </div>
          </div>

          {/* Row 2: Mobile Number & State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-[13px] text-slate-700 font-medium mb-1.5">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="9876543210"
                required
                className="w-full bg-[#f0f4f9] text-slate-900 px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm border border-slate-200/80 outline-none focus:border-[#1f6b5b] focus:bg-white transition-all font-normal placeholder-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-[13px] text-slate-700 font-medium mb-1.5">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="e.g. Maharashtra"
                required
                className="w-full bg-[#f0f4f9] text-slate-900 px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm border border-slate-200/80 outline-none focus:border-[#1f6b5b] focus:bg-white transition-all font-normal placeholder-slate-400"
              />
            </div>
          </div>

          {/* Row 3: Platform Selection */}
          <div>
            <label className="block text-xs sm:text-[13px] text-slate-700 font-medium mb-1.5">
              Target Lead Platform
            </label>
            <div className="relative">
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                required
                className="w-full bg-[#f0f4f9] text-slate-900 px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm border border-slate-200/80 outline-none focus:border-[#1f6b5b] focus:bg-white transition-all font-normal appearance-none cursor-pointer"
              >
                <option value="">Select Platform</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="YouTube">YouTube</option>
                <option value="Snapchat">Snapchat</option>
                <option value="TikTok">TikTok</option>
                <option value="Twitter">Twitter / X</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Row 4: Password Field */}
          <div>
            <label className="block text-xs sm:text-[13px] text-slate-700 font-medium mb-1.5">
              Create Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full bg-[#f0f4f9] text-slate-900 px-4 py-2.5 sm:py-3 pr-11 rounded-xl text-xs sm:text-sm border border-slate-200/80 outline-none focus:border-[#1f6b5b] focus:bg-white transition-all font-normal placeholder-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1f6b5b] hover:bg-[#175246] active:scale-[0.99] text-white py-3 sm:py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-[0_8px_20px_rgba(31,107,91,0.28)] disabled:opacity-70 cursor-pointer"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>

        </form>

        {/* Footer Text */}
        <p className="text-center text-xs text-slate-500 mt-5">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-[#1f6b5b] hover:underline">Terms</Link> &{" "}
          <Link href="/privacy" className="text-[#1f6b5b] hover:underline">Privacy Policy</Link>
        </p>

      </div>
    </div>
  );
}