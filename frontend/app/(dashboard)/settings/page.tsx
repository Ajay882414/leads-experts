"use client";

import { useState } from "react";
import {
  Lock,
  Bell,
  Shield,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  Save,
  Tag,
} from "lucide-react";
import api from "@/lib/axios";

export default function SettingsPage() {
  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  // Notification toggles state
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promoAlerts, setPromoAlerts] = useState(false);

  // Status feedback
  const [savingPassword, setSavingPassword] = useState(false);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (newPassword.length < 6) {
      setErrorMsg("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("New password and confirm password do not match.");
      return;
    }

    try {
      setSavingPassword(true);
      
      // Backend password update API call
      const res = await api.put("/users/change-password", {
        currentPassword,
        newPassword,
      });

      setSuccessMsg(res.data?.message || "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err: any) {
      setErrorMsg(
        err?.response?.data?.message ||
          "Unable to update password. Please verify current password."
      );
    } finally {
      setSavingPassword(false);
    }
  };

  const handleSavePreferences = () => {
    setSavingPrefs(true);
    setSuccessMsg("");
    setErrorMsg("");

    // Simulate saving notification preferences
    setTimeout(() => {
      setSavingPrefs(false);
      setSuccessMsg("Notification preferences saved successfully!");
      setTimeout(() => setSuccessMsg(""), 4000);
    }, 600);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto space-y-6 pt-20 sm:pt-22 pb-14">
      {/* Soft Glow Ambience */}
      <div className="pointer-events-none absolute -top-10 right-0 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="pointer-events-none absolute top-52 left-6 h-64 w-64 rounded-full bg-[#a3e635]/5 blur-3xl" />

      {/* Header Section */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#0c4731]" />
          <span className="text-[11px] sm:text-xs font-normal uppercase tracking-wider">
            Configuration & Safeguards
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-normal text-slate-900 tracking-tight leading-tight">
          Settings & Security
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-normal max-w-xl">
          Control your authentication credentials, data delivery triggers, and notification subscriptions.
        </p>
      </div>

      {/* Success Alert */}
      {successMsg && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4 text-xs sm:text-sm text-emerald-800 shadow-sm backdrop-blur-sm">
          <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
          <span className="font-normal">{successMsg}</span>
        </div>
      )}

      {/* Error Alert */}
      {errorMsg && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-red-200 bg-red-50/90 p-4 text-xs sm:text-sm text-red-800 shadow-sm backdrop-blur-sm">
          <AlertCircle size={18} className="shrink-0 text-red-600" />
          <span className="font-normal">{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= 1. SECURITY & PASSWORD CARD ================= */}
        <div className="lg:col-span-7 rounded-[28px] border border-slate-200/80 bg-white p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eef7ee] text-[#0c4731] border border-[#d6ecd6]">
              <Lock size={19} className="stroke-[1.8]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-normal text-slate-900 tracking-tight">
                Security & Password
              </h2>
              <p className="text-xs text-slate-400 font-normal mt-0.5">
                Update account access credentials with verified encryption
              </p>
            </div>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            {/* Current Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-normal text-slate-700">
                Current Password
              </label>
              <div className="relative">
                <KeyRound
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showCurrentPass ? "text" : "password"}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="h-11 sm:h-12 w-full rounded-2xl border border-slate-200/80 bg-[#f8fafc] pl-10 pr-10 text-xs sm:text-sm font-normal text-slate-900 outline-none transition-all focus:border-[#0c4731] focus:bg-white focus:ring-4 focus:ring-emerald-900/5 placeholder-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showCurrentPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* New Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-normal text-slate-700">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPass ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="h-11 sm:h-12 w-full rounded-2xl border border-slate-200/80 bg-[#f8fafc] px-3.5 pr-10 text-xs sm:text-sm font-normal text-slate-900 outline-none transition-all focus:border-[#0c4731] focus:bg-white focus:ring-4 focus:ring-emerald-900/5 placeholder-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-normal text-slate-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="h-11 sm:h-12 w-full rounded-2xl border border-slate-200/80 bg-[#f8fafc] px-3.5 text-xs sm:text-sm font-normal text-slate-900 outline-none transition-all focus:border-[#0c4731] focus:bg-white focus:ring-4 focus:ring-emerald-900/5 placeholder-slate-400"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={savingPassword}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0c4731] hover:bg-[#083021] active:scale-95 px-5 py-2.5 text-xs sm:text-sm font-normal text-white transition-all disabled:opacity-50 shadow-sm cursor-pointer"
              >
                {savingPassword ? (
                  <>
                    <Loader2 size={15} className="animate-spin text-[#a3e635]" />
                    <span>Updating Credentials...</span>
                  </>
                ) : (
                  <>
                    <Save size={15} className="text-[#a3e635]" />
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* ================= 2. NOTIFICATION PREFERENCES ================= */}
        <div className="lg:col-span-5 rounded-[28px] border border-slate-200/80 bg-white p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eef7ee] text-[#0c4731] border border-[#d6ecd6]">
              <Bell size={19} className="stroke-[1.8]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-normal text-slate-900 tracking-tight">
                Notifications
              </h2>
              <p className="text-xs text-slate-400 font-normal mt-0.5">
                Set dispatch channels for purchases and pool refreshes
              </p>
            </div>
          </div>

          <div className="space-y-4 divide-y divide-slate-100">
            {/* Order Updates */}
            <div className="flex items-start justify-between gap-3 pt-2 first:pt-0">
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-normal text-slate-900 flex items-center gap-1.5">
                  <Mail size={14} className="text-[#0c4731]" />
                  Order Confirmations
                </p>
                <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
                  Send immediate CSV links upon successful order settlement.
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center shrink-0">
                <input
                  type="checkbox"
                  checked={orderUpdates}
                  onChange={(e) => setOrderUpdates(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#0c4731] peer-checked:after:translate-x-full" />
              </label>
            </div>

            {/* Platform Alerts */}
            <div className="flex items-start justify-between gap-3 pt-4">
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-normal text-slate-900 flex items-center gap-1.5">
                  <Smartphone size={14} className="text-[#0c4731]" />
                  Stock Replenishments
                </p>
                <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
                  Alert when fresh lead inventory arrives in chosen pools.
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center shrink-0">
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#0c4731] peer-checked:after:translate-x-full" />
              </label>
            </div>

            {/* Marketing Promo Alerts */}
            <div className="flex items-start justify-between gap-3 pt-4">
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-normal text-slate-900 flex items-center gap-1.5">
                  <Tag size={14} className="text-[#0c4731]" />
                  Volume Discounts
                </p>
                <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
                  Receive coupons and seasonal price drop alerts.
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center shrink-0">
                <input
                  type="checkbox"
                  checked={promoAlerts}
                  onChange={(e) => setPromoAlerts(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#0c4731] peer-checked:after:translate-x-full" />
              </label>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              disabled={savingPrefs}
              onClick={handleSavePreferences}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 py-2.5 text-xs sm:text-sm font-normal text-slate-800 transition-all disabled:opacity-50 cursor-pointer"
            >
              {savingPrefs ? (
                <>
                  <Loader2 size={15} className="animate-spin text-[#0c4731]" />
                  <span>Saving Preferences...</span>
                </>
              ) : (
                <span>Save Preferences</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}