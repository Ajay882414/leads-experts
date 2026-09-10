"use client";

import { useEffect, useState, useCallback } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Save,
  Loader2,
  Sparkles,
  Calendar,
  Lock,
} from "lucide-react";
import { getProfile, updateProfile } from "@/services/authApi";

interface UserProfile {
  _id?: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  platform?: string;
  state?: string;
  role?: string;
  createdAt?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchUserProfile = useCallback(async () => {
    try {
      setFetching(true);
      setErrorMsg("");
      const res = await getProfile();
      setUser(res.user);
    } catch (err: any) {
      setErrorMsg(
        err?.response?.data?.message || "Failed to load profile details."
      );
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      setSuccessMsg("");
      setErrorMsg("");

      await updateProfile(user);
      setSuccessMsg("Profile details updated successfully!");

      setTimeout(() => {
        setSuccessMsg("");
      }, 4000);
    } catch (err: any) {
      setErrorMsg(
        err?.response?.data?.message ||
          "Unable to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="w-full max-w-5xl mx-auto space-y-6 pt-2 sm:pt-4 pb-14 animate-pulse">
        <div className="h-44 sm:h-52 rounded-[28px] bg-slate-200/60" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-64 rounded-[26px] bg-slate-200/50" />
          <div className="md:col-span-2 h-96 rounded-[26px] bg-slate-200/50" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto space-y-6 pt-18 sm:pt-22 pb-14">
      {/* Background Soft Glow Accents */}
      <div className="pointer-events-none absolute -top-10 right-0 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="pointer-events-none absolute top-48 left-6 h-64 w-64 rounded-full bg-[#a3e635]/5 blur-3xl" />

      {/* Header Badge & Page Title */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] mb-5">
          <Sparkles className="w-3.5 h-3.5 text-[#0c4731]" />
          <span className="text-[11px] sm:text-xs font-normal uppercase tracking-wider">
            Identity & Preferences
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-normal text-slate-900 tracking-tight leading-tight">
          Account Profile
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-normal max-w-xl">
          View your registered details, verify buyer credentials, and customize outreach properties.
        </p>
      </div>

      {/* Status Notifications */}
      {successMsg && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4 text-xs sm:text-sm text-emerald-800 shadow-sm backdrop-blur-sm">
          <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
          <span className="font-normal">{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-red-200 bg-red-50/90 p-4 text-xs sm:text-sm text-red-800 shadow-sm backdrop-blur-sm">
          <AlertCircle size={18} className="shrink-0 text-red-600" />
          <span className="font-normal">{errorMsg}</span>
        </div>
      )}

      {user && (
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* ================= TOP HERO BANNER & AVATAR ================= */}
          <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            {/* Ambient Upper Glow Inside Banner */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-[#0c2e22] via-[#092219] to-[#061711] opacity-95" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-5 pt-8">
              {/* Profile Avatar Badge */}
              <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#38ef7d] to-[#a3e635] text-slate-950 text-3xl font-normal shadow-lg ring-4 ring-white">
                {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
                <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white" />
              </div>

              {/* Identity Info */}
              <div className="text-center sm:text-left flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                    {user.fullName || "Member"}
                  </h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#eef7ee] px-2.5 py-0.5 text-[11px] font-normal text-[#0c4731] border border-[#d6ecd6]">
                    <ShieldCheck size={13} />
                    Verified Buyer
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
                  {user.email}
                </p>
              </div>

              {/* Save Button on Desktop (Quick Access) */}
              <div className="hidden sm:block">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0c4731] hover:bg-[#083021] active:scale-95 px-5 py-2.5 text-xs sm:text-sm font-normal text-white transition-all disabled:opacity-50 shadow-sm cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} className="animate-spin text-[#a3e635]" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save size={15} className="text-[#a3e635]" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ================= MAIN SPLIT GRID ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            
            {/* Left Column: Account Summary Snapshot */}
            <div className="rounded-[26px] border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
              <div>
                <h3 className="text-sm font-normal text-slate-900 uppercase tracking-wider">
                  Account Status
                </h3>
                <p className="text-xs text-slate-400 font-normal mt-0.5">
                  Platform access and compliance
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between rounded-xl bg-slate-50/80 p-3 border border-slate-100 text-xs font-normal">
                  <span className="text-slate-500">Access Role</span>
                  <span className="text-[#0c4731] capitalize">{user.role || "Standard Buyer"}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50/80 p-3 border border-slate-100 text-xs font-normal">
                  <span className="text-slate-500">Target Segment</span>
                  <span className="text-slate-800 truncate max-w-[120px]">{user.platform || "Unassigned"}</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50/80 p-3 border border-slate-100 text-xs font-normal">
                  <span className="text-slate-500">Security</span>
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 size={13} /> Active
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-[#f8fafc] p-3.5 border border-slate-100 text-[11px] text-slate-500 font-normal leading-relaxed">
                Registered profile records are strictly confidential and used only for verifying order delivery.
              </div>
            </div>

            {/* Right Column: Editable Profile Details */}
            <div className="md:col-span-2 rounded-[26px] border border-slate-200/80 bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-normal text-slate-900 tracking-tight">
                  Contact Information
                </h3>
                <p className="text-xs text-slate-400 font-normal mt-0.5">
                  Update your personal and outreach configuration
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-normal text-slate-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      required
                      value={user.fullName || ""}
                      onChange={(e) =>
                        setUser({ ...user, fullName: e.target.value })
                      }
                      placeholder="Enter full name"
                      className="h-11 sm:h-12 w-full rounded-2xl border border-slate-200/80 bg-[#f8fafc] pl-10 pr-4 text-xs sm:text-sm font-normal text-slate-900 outline-none transition-all focus:border-[#0c4731] focus:bg-white focus:ring-4 focus:ring-emerald-900/5 placeholder-slate-400"
                    />
                  </div>
                </div>

                {/* Email (Read Only with Lock) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-normal text-slate-700">
                      Email Address
                    </label>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-normal">
                      <Lock size={10} /> Locked
                    </span>
                  </div>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="email"
                      disabled
                      value={user.email || ""}
                      className="h-11 sm:h-12 w-full rounded-2xl border border-slate-200/60 bg-slate-100/80 pl-10 pr-4 text-xs sm:text-sm font-normal text-slate-500 outline-none cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-normal text-slate-700">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="tel"
                      value={user.mobileNumber || ""}
                      onChange={(e) =>
                        setUser({ ...user, mobileNumber: e.target.value })
                      }
                      placeholder="e.g. +91 9876543210"
                      className="h-11 sm:h-12 w-full rounded-2xl border border-slate-200/80 bg-[#f8fafc] pl-10 pr-4 text-xs sm:text-sm font-normal text-slate-900 outline-none transition-all focus:border-[#0c4731] focus:bg-white focus:ring-4 focus:ring-emerald-900/5 placeholder-slate-400"
                    />
                  </div>
                </div>

                {/* Preferred Platform */}
                <div className="space-y-1.5">
                  <label className="text-xs font-normal text-slate-700">
                    Primary Business Channel
                  </label>
                  <div className="relative">
                    <Globe
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      value={user.platform || ""}
                      onChange={(e) =>
                        setUser({ ...user, platform: e.target.value })
                      }
                      placeholder="e.g. Instagram, Real Estate"
                      className="h-11 sm:h-12 w-full rounded-2xl border border-slate-200/80 bg-[#f8fafc] pl-10 pr-4 text-xs sm:text-sm font-normal text-slate-900 outline-none transition-all focus:border-[#0c4731] focus:bg-white focus:ring-4 focus:ring-emerald-900/5 placeholder-slate-400"
                    />
                  </div>
                </div>

                {/* State / Region */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-normal text-slate-700">
                    State / Operating Region
                  </label>
                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      value={user.state || ""}
                      onChange={(e) =>
                        setUser({ ...user, state: e.target.value })
                      }
                      placeholder="e.g. Rajasthan, Maharashtra"
                      className="h-11 sm:h-12 w-full rounded-2xl border border-slate-200/80 bg-[#f8fafc] pl-10 pr-4 text-xs sm:text-sm font-normal text-slate-900 outline-none transition-all focus:border-[#0c4731] focus:bg-white focus:ring-4 focus:ring-emerald-900/5 placeholder-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Only Action Button */}
              <div className="pt-2 sm:hidden">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0c4731] hover:bg-[#083021] active:scale-95 py-3 text-xs font-normal text-white transition-all disabled:opacity-50 shadow-sm cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={15} className="animate-spin text-[#a3e635]" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save size={15} className="text-[#a3e635]" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </form>
      )}
    </div>
  );
}