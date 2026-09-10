"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { forgotPassword } from "@/services/authApi";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await forgotPassword(email);

      alert(res.message || "OTP Sent to your email");

      sessionStorage.setItem("resetEmail", res.email || email);
      router.push("/reset-password");
    } catch (error: any) {
      alert(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#111c24] flex items-center justify-center p-4 py-12 sm:py-16 overflow-hidden selection:bg-[#48d597] selection:text-black">
      
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

      {/* ================= MAIN FORGOT PASSWORD CARD ================= */}
      <div className="relative z-10 w-full max-w-[460px] bg-white rounded-[32px] sm:rounded-[36px] p-7 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-slate-100">
        
        {/* Card Header */}
        <div className="flex items-start justify-between gap-4 mb-7">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
              Reset Password <br />
              <span className="font-extrabold tracking-wide uppercase text-slate-950">
                LEADFLOW
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-normal">
              Enter your registered email to receive OTP
            </p>
          </div>

          <div className="text-right flex flex-col items-end">
            <span className="text-xs sm:text-[13px] text-slate-500 font-medium">
              Remember?
            </span>
            <Link
              href="/login"
              className="text-xs sm:text-[13px] text-[#1f6b5b] hover:text-[#175246] font-bold transition-colors mt-0.5"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-xs sm:text-[13px] text-slate-700 font-medium mb-2">
              Enter registered email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
              className="w-full bg-[#f0f4f9] text-slate-900 px-4 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm border border-slate-200/80 outline-none focus:border-[#1f6b5b] focus:bg-white transition-all font-normal placeholder-slate-400"
            />
          </div>

          {/* Submit CTA Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1f6b5b] hover:bg-[#175246] active:scale-[0.99] text-white py-3 sm:py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-[0_8px_20px_rgba(31,107,91,0.28)] disabled:opacity-70 cursor-pointer"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>

        </form>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Login
          </Link>
        </div>

      </div>

    </div>
  );
}