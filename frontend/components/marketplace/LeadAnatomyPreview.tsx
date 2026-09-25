"use client";

import React, { useState } from "react";
import {
  FileSpreadsheet,
  Lock,
  Sparkles,
  CheckCircle2,
  Download,
  ShieldCheck,
  Eye,
  FileCheck,
  Layers,
} from "lucide-react";

export default function LeadAnatomyPreview() {
  const [activePlatform, setActivePlatform] = useState<"all" | "instagram" | "linkedin" | "facebook">("all");

  const sampleLeads = [
    {
      name: "Rahul Sharma",
      phone: "+91 98201 •••••",
      age: "28",
      gender: "Male",
      city: "Mumbai, MH",
      profession: "Agency Owner",
      source: "Instagram DM Inbound",
      platform: "instagram",
      verified: true,
    },
    {
      name: "Priya Verma",
      phone: "+91 97114 •••••",
      age: "32",
      gender: "Female",
      city: "Delhi, DL",
      profession: "B2B Consultant",
      source: "LinkedIn InMail",
      platform: "linkedin",
      verified: true,
    },
    {
      name: "Amit Patel",
      phone: "+91 98860 •••••",
      age: "35",
      gender: "Male",
      city: "Bengaluru, KA",
      profession: "Real Estate Buyer",
      source: "Facebook Targeted Ad",
      platform: "facebook",
      verified: true,
    },
    {
      name: "Sneha Kulkarni",
      phone: "+91 98452 •••••",
      age: "26",
      gender: "Female",
      city: "Pune, MH",
      profession: "Freelance Designer",
      source: "Instagram Reel Lead",
      platform: "instagram",
      verified: true,
    },
    {
      name: "Vikram Malhotra",
      phone: "+91 99301 •••••",
      age: "41",
      gender: "Male",
      city: "Ahmedabad, GJ",
      profession: "E-com Founder",
      source: "Facebook Group Lead",
      platform: "facebook",
      verified: true,
    },
  ];

  const filteredData =
    activePlatform === "all"
      ? sampleLeads
      : sampleLeads.filter((item) => item.platform === activePlatform);

  return (
    <section className="relative w-full py-16 sm:py-20 px-4 sm:px-6 bg-[#fafcfb] overflow-hidden border-b border-slate-100">
      
      {/* Background Subtle Line Grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        
        {/* Section Heading Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] text-xs font-normal">
              <FileSpreadsheet size={13} className="text-[#0c4731]" />
              <span>Transparent Data Blueprint</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-normal text-slate-900 tracking-tight leading-tight">
              Sample Lead Anatomy & Data Preview
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-xl leading-relaxed">
              Every lead pack comes cleanly organized into a standardized CSV file. Inspect the exact columns and contact attributes you unlock after checkout.
            </p>
          </div>

          {/* Quick Filter Pill Controls */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white border border-slate-200/90 shadow-sm self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActivePlatform("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-normal transition-all cursor-pointer ${
                activePlatform === "all"
                  ? "bg-[#0c4731] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Columns
            </button>
            <button
              type="button"
              onClick={() => setActivePlatform("instagram")}
              className={`px-3 py-1.5 rounded-xl text-xs font-normal transition-all cursor-pointer ${
                activePlatform === "instagram"
                  ? "bg-[#0c4731] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Instagram
            </button>
            <button
              type="button"
              onClick={() => setActivePlatform("linkedin")}
              className={`px-3 py-1.5 rounded-xl text-xs font-normal transition-all cursor-pointer ${
                activePlatform === "linkedin"
                  ? "bg-[#0c4731] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              LinkedIn
            </button>
            <button
              type="button"
              onClick={() => setActivePlatform("facebook")}
              className={`px-3 py-1.5 rounded-xl text-xs font-normal transition-all cursor-pointer ${
                activePlatform === "facebook"
                  ? "bg-[#0c4731] text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Facebook
            </button>
          </div>
        </div>

        {/* ================= 3D SPREADSHEET INSPECTOR WINDOW ================= */}
        <div className="rounded-[28px] border border-slate-200/90 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.03)] overflow-hidden">
          
          {/* Window Topbar */}
          <div className="px-5 py-3.5 bg-[#f8fafc] border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 font-mono text-xs text-slate-500 font-normal">
                leads_verified_batch_export.csv
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-normal">
              <Lock size={12} className="text-[#0c4731]" />
              <span className="hidden sm:inline">Numbers unmasked instantly in dashboard</span>
              <span className="inline sm:hidden">Numbers masked</span>
            </div>
          </div>

          {/* Interactive Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#fcfdfd] text-slate-400 font-normal text-[11px] uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3.5">Contact Name</th>
                  <th className="px-5 py-3.5">Direct Phone</th>
                  <th className="px-5 py-3.5">Demographics</th>
                  <th className="px-5 py-3.5">Location</th>
                  <th className="px-5 py-3.5">Profession / Niche</th>
                  <th className="px-5 py-3.5">Acquisition Source</th>
                  <th className="px-5 py-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredData.map((lead, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    {/* Name */}
                    <td className="px-5 py-4 font-normal text-slate-900 flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-[#eef7ee] text-[#0c4731] flex items-center justify-center text-xs shrink-0 font-normal">
                        {lead.name.charAt(0)}
                      </div>
                      <span className="truncate">{lead.name}</span>
                    </td>

                    {/* Phone (Masked) */}
                    <td className="px-5 py-4 font-mono font-normal text-[#0c4731]">
                      {lead.phone}
                    </td>

                    {/* Age / Gender */}
                    <td className="px-5 py-4 font-normal text-slate-600">
                      {lead.age} yrs • {lead.gender}
                    </td>

                    {/* City */}
                    <td className="px-5 py-4 font-normal text-slate-600">
                      {lead.city}
                    </td>

                    {/* Profession */}
                    <td className="px-5 py-4 font-normal text-slate-800">
                      {lead.profession}
                    </td>

                    {/* Source */}
                    <td className="px-5 py-4 font-normal">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs">
                        {lead.source}
                      </span>
                    </td>

                    {/* Verification Status */}
                    <td className="px-5 py-4 text-right">
                      <span className="inline-flex items-center gap-1 text-emerald-700 text-xs font-normal">
                        <CheckCircle2 size={13} className="text-emerald-600" />
                        <span>Verified</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer Bottom Bar */}
          <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 font-normal">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <FileCheck size={14} className="text-[#0c4731]" />
                UTF-8 Encoded CSV
              </span>
              <span>•</span>
              <span>Compatible with Excel, Google Sheets, CRM & Telecaller Dialers</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#0c4731] font-normal">Showing preview sample</span>
            </div>
          </div>
        </div>

        {/* ================= 3 PROMISE SPEC CHIPS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-sm space-y-1.5">
            <div className="flex items-center gap-2 text-[#0c4731]">
              <ShieldCheck size={18} />
              <span className="text-sm font-normal text-slate-900">Anti-Recycle Guarantee</span>
            </div>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Once an order is purchased, the allocated rows are permanently archived from the marketplace and never resold.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-sm space-y-1.5">
            <div className="flex items-center gap-2 text-[#0c4731]">
              <Sparkles size={18} />
              <span className="text-sm font-normal text-slate-900">WhatsApp Reachability</span>
            </div>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              Contacts have active SIM status ensuring high response rates for calling campaigns and WhatsApp messaging.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-sm space-y-1.5">
            <div className="flex items-center gap-2 text-[#0c4731]">
              <Download size={18} />
              <span className="text-sm font-normal text-slate-900">Direct Instant Download</span>
            </div>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              No manual waiting. File unlocks immediately inside your account dashboard with a 1-click CSV download button.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}