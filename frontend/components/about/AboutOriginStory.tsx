"use client";

import React from "react";
import { Target } from "lucide-react";

export default function AboutOriginStory() {
  return (
    <section className="relative w-full py-16 sm:py-20 px-4 sm:px-6 bg-[#fafcfb] overflow-hidden border-b border-slate-100">
      {/* Background Line-Box Grid */}
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

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Why We Started */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-normal">
              <Target size={13} className="text-[#0c4731]" />
              <span>Why We Built LeadsVero</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-slate-900 tracking-tight leading-tight">
              Cold Calling Isn&apos;t Dead. Bad Data Was Killing It.
            </h2>

            <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
              <p>
                Every day, thousands of sales telecallers, agencies, and independent freelancers waste hours dialing disconnected numbers bought from generic lead brokers. The numbers are often scraped from 5-year-old directories and sold to dozens of competing agencies simultaneously.
              </p>
              <p>
                We engineered LeadsVero to flip this broken dynamic on its head. Instead of hoarding massive unverified spreadsheets, our data engine indexes active inbound signals from social channels (Instagram DMs, Facebook groups, LinkedIn B2B engagements, and webinar registrations).
              </p>
              <p>
                When a marketer purchases a pack from us, they get fresh numbers of individuals who recently showed real interest in products, training, or services.
              </p>
            </div>
          </div>

          {/* Right Column: Comparison Card */}
          <div className="lg:col-span-6 rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h3 className="text-base font-normal text-slate-900">Industry Reality Check</h3>
              <span className="text-[11px] text-[#0c4731] font-normal bg-[#eef7ee] px-2.5 py-0.5 rounded-full border border-[#d6ecd6]">
                Data Standard
              </span>
            </div>

            <div className="space-y-4 text-xs font-normal">
              {/* Old Scraping Way */}
              <div className="p-4 rounded-2xl bg-red-50/50 border border-red-100 space-y-1 text-slate-700">
                <p className="text-red-700 font-normal flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  Legacy Data Brokers (The Old Way)
                </p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Bulk scraped directories, zero activity status checks, same CSV resold to multiple competitors, low pickup rates, and burned brand caller IDs.
                </p>
              </div>

              {/* LeadsVero Way */}
              <div className="p-4 rounded-2xl bg-[#eef7ee] border border-[#d6ecd6] space-y-1 text-slate-800">
                <p className="text-[#0c4731] font-normal flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#a3e635]" />
                  The LeadsVero Standard (Intent-First)
                </p>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Filtered social intent pools, active WhatsApp/SIM validation, permanently retired post-checkout (Single-Buyer Guaranteed), and direct CSV unlocks.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}