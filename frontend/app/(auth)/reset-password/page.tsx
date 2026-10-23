"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { resetPassword, resendOtp } from "@/services/authApi";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(30);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("resetEmail");

    if (!savedEmail) {
      router.push("/forgot-password");
      return;
    }

    setEmail(savedEmail);
  }, [router]);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      setResending(true);
      const res = await resendOtp(email);
      setSuccessMessage(res.message || "New OTP sent to your email!");
      setTimer(30);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await resetPassword({
        email,
        otp: otp.trim(),
        password,
        confirmPassword,
      });

      sessionStorage.removeItem("resetEmail");
      // Direct login redirect without alert popup
      router.push("/login");
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#111c24] flex items-center justify-center p-4 py-12 sm:py-16 overflow-hidden selection:bg-[#48d597] selection:text-black">
      {/* Background Ribbons */}
      <div className="absolute -left-12 bottom-12 sm:bottom-20 z-0 pointer-events-none">
        <div className="w-56 sm:w-80 h-10 sm:h-14 bg-[#1f6b5b] transform -rotate-12 rounded-r-md opacity-90 shadow-2xl" />
        <div className="w-64 sm:w-96 h-10 sm:h-14 bg-[#48d597] transform -rotate-12 rounded-r-md -mt-4 shadow-2xl" />
      </div>

      <div className="absolute -right-12 top-12 sm:top-20 z-0 pointer-events-none">
        <div className="w-64 sm:w-96 h-10 sm:h-14 bg-[#1f6b5b] transform -rotate-12 rounded-l-md opacity-90 shadow-2xl" />
        <div className="w-56 sm:w-80 h-10 sm:h-14 bg-[#48d597] transform -rotate-12 rounded-l-md -mt-4 shadow-2xl" />
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-[500px] bg-white rounded-[32px] sm:rounded-[36px] p-7 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-slate-100">
        <div className="flex items-start justify-between gap-4 mb-7">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
              Create New Password <br />
              <span className="font-extrabold tracking-wide uppercase text-slate-950">
                Leadsvero
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-normal">
              Enter the OTP sent to your email to verify
            </p>
          </div>

          <div className="text-right flex flex-col items-end">
            <span className="text-xs sm:text-[13px] text-slate-500 font-medium">
              Back to
            </span>
            <Link
              href="/login"
              className="text-xs sm:text-[13px] text-[#1f6b5b] hover:text-[#175246] font-bold transition-colors mt-0.5"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Clean Message Banners */}
        {errorMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs sm:text-[13px] text-slate-700 font-medium mb-1.5">
              Registered Email
            </label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full bg-slate-100 text-slate-500 px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm border border-slate-200 cursor-not-allowed outline-none font-medium"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-[13px] text-slate-700 font-medium mb-1.5">
              Enter 6-Digit OTP
            </label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => {
                setErrorMessage("");
                setOtp(e.target.value);
              }}
              placeholder="e.g. 123456"
              required
              className="w-full bg-[#f0f4f9] text-slate-900 tracking-wider px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm border border-slate-200/80 outline-none focus:border-[#1f6b5b] focus:bg-white transition-all font-semibold placeholder-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-[13px] text-slate-700 font-medium mb-1.5">
              New Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => {
                  setErrorMessage("");
                  setPassword(e.target.value);
                }}
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
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-[13px] text-slate-700 font-medium mb-1.5">
              Confirm New Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setErrorMessage("");
                  setConfirmPassword(e.target.value);
                }}
                placeholder="••••••••"
                required
                className="w-full bg-[#f0f4f9] text-slate-900 px-4 py-2.5 sm:py-3 pr-11 rounded-xl text-xs sm:text-sm border border-slate-200/80 outline-none focus:border-[#1f6b5b] focus:bg-white transition-all font-normal placeholder-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none p-1"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1f6b5b] hover:bg-[#175246] active:scale-[0.99] text-white py-3 sm:py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-[0_8px_20px_rgba(31,107,91,0.28)] disabled:opacity-70 cursor-pointer"
            >
              {loading ? "Updating Password..." : "Update Password"}
            </button>
          </div>

          <div className="text-center pt-2">
            {timer > 0 ? (
              <p className="text-xs text-slate-500 font-medium">
                Resend OTP in <span className="font-bold text-slate-800">{timer}s</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="text-xs text-[#1f6b5b] hover:text-[#175246] font-bold hover:underline cursor-pointer disabled:opacity-50"
              >
                {resending ? "Sending..." : "Resend OTP"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}