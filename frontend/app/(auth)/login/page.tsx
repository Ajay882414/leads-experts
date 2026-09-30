"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res: any = await login(formData);

      // Agar context ya API se token milta hai toh use localStorage me backup save karein
      if (res?.token) {
        localStorage.setItem("token", res.token);
      }

      alert("Login Successful");

      const redirect = searchParams.get("redirect");

      if (redirect) {
        router.replace(redirect);
        return;
      }

      if (res?.user?.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/dashboard");
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#111c24] flex items-center justify-center p-4 overflow-hidden selection:bg-[#48d597] selection:text-black">
      {/* Background Ribbon */}
      <div className="absolute -left-12 bottom-12 sm:bottom-20 z-0 pointer-events-none">
        <div className="w-56 sm:w-80 h-10 sm:h-14 bg-[#1f6b5b] transform -rotate-12 rounded-r-md opacity-90 shadow-2xl" />
        <div className="w-64 sm:w-96 h-10 sm:h-14 bg-[#48d597] transform -rotate-12 rounded-r-md -mt-4 shadow-2xl" />
      </div>

      <div className="absolute -right-12 top-12 sm:top-20 z-0 pointer-events-none">
        <div className="w-64 sm:w-96 h-10 sm:h-14 bg-[#1f6b5b] transform -rotate-12 rounded-l-md opacity-90 shadow-2xl" />
        <div className="w-56 sm:w-80 h-10 sm:h-14 bg-[#48d597] transform -rotate-12 rounded-l-md -mt-4 shadow-2xl" />
      </div>

      <div className="relative z-10 w-full max-w-[480px] bg-white rounded-[32px] sm:rounded-[36px] p-8 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-slate-100">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
              Welcome to <br />
              <span className="font-extrabold tracking-wide uppercase text-slate-950">
                Leadsvero
              </span>
            </h1>
          </div>

          <div className="text-right flex flex-col items-end">
            <span className="text-xs sm:text-[13px] text-slate-500 font-medium">
              No Account ?
            </span>
            <Link
              href="/signup"
              className="text-xs sm:text-[13px] text-[#1f6b5b] hover:text-[#175246] font-bold transition-colors mt-0.5"
            >
              Sign up
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs sm:text-[13px] text-slate-700 font-medium mb-2">
              Enter your username or email address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              required
              className="w-full bg-[#f0f4f9] text-slate-900 px-4 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm border border-slate-200/80 outline-none focus:border-[#1f6b5b] focus:bg-white transition-all font-normal placeholder-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-[13px] text-slate-700 font-medium mb-2">
              Enter your Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full bg-[#f0f4f9] text-slate-900 px-4 py-3 sm:py-3.5 pr-11 rounded-xl text-xs sm:text-sm border border-slate-200/80 outline-none focus:border-[#1f6b5b] focus:bg-white transition-all font-normal placeholder-slate-400"
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

          <div className="flex justify-end pt-1">
            <Link
              href="/forgot-password"
              className="text-xs text-[#1f6b5b] hover:text-[#175246] font-medium transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1f6b5b] hover:bg-[#175246] active:scale-[0.99] text-white py-3 sm:py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-[0_8px_20px_rgba(31,107,91,0.28)] disabled:opacity-70 cursor-pointer"
            >
              {loading ? "Please Wait..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-[#111c24] flex items-center justify-center">
          <div className="text-white text-sm">Loading...</div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}