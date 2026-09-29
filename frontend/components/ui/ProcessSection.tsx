"use client";

import React from "react";

interface StepItem {
  step: string;
  emoji: string;
  title: string;
  descriptionDesktop: string;
  descriptionMobile: string;
  cardBg: string;
  pillBg: string;
  pillText: string;
  textColor: string;
  descColor: string;
  align: "left" | "right";
}

const stepsData: StepItem[] = [
  {
    step: "STEP - 1",
    emoji: "📦",
    title: "Choose Your Platform.",
    descriptionDesktop:
      "Select target channels from Instagram, Facebook, or LinkedIn and pick the audience demographic tailored for your outreach.",
    descriptionMobile:
      "Pick your target platform and audience demographic tailored for your sales outreach.",
    cardBg: "bg-[#eaf8d9]",
    pillBg: "bg-[#0c4731]",
    pillText: "text-white",
    textColor: "text-[#0f172a]",
    descColor: "text-slate-600",
    align: "left",
  },
  {
    step: "STEP - 2",
    emoji: "🎯",
    title: "Select Lead Count.",
    descriptionDesktop:
      "Choose your required batch size from 500 to 5,000+ records and apply verified filters to match your campaign goals perfectly.",
    descriptionMobile:
      "Select batch volume from 500 to 5,000+ records with auto-calculated pricing.",
    cardBg: "bg-[#f1f5f9]",
    pillBg: "bg-[#1e293b]",
    pillText: "text-white",
    textColor: "text-[#0f172a]",
    descColor: "text-slate-600",
    align: "right",
  },
  {
    step: "STEP - 3",
    emoji: "🚀",
    title: "Complete Secure Payment.",
    descriptionDesktop:
      "Authorize your order smoothly through 100% encrypted Razorpay gateway using UPI, Cards, or NetBanking with instant confirmation.",
    descriptionMobile:
      "Authorize your order smoothly via 100% encrypted UPI, Cards, or NetBanking.",
    cardBg: "bg-[#eaf8d9]",
    pillBg: "bg-[#0c4731]",
    pillText: "text-white",
    textColor: "text-[#0f172a]",
    descColor: "text-slate-600",
    align: "left",
  },
  {
    step: "STEP - 4",
    emoji: "💰",
    title: "Download CSV & Convert.",
    descriptionDesktop:
      "Preview assigned single-buyer contact records directly in your dashboard and export clean CSV sheets immediately to start closing.",
    descriptionMobile:
      "Preview single-buyer contact records and export clean CSV sheets to start closing.",
    cardBg: "bg-[#f1f5f9]",
    pillBg: "bg-[#1e293b]",
    pillText: "text-white",
    textColor: "text-[#0f172a]",
    descColor: "text-slate-600",
    align: "right",
  },
];

export default function ProcessSection() {
  return (
    <section className="relative w-full bg-white py-20 sm:py-28 px-4 sm:px-8 lg:px-14 overflow-hidden selection:bg-[#99db32] selection:text-black">
      <div className="max-w-6xl mx-auto">
        {/* ================= SECTION HEADER ================= */}
        <div className="max-w-3xl mb-16 sm:mb-18">
          <div className="inline-block px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-widest mb-4">
            HOW IT WORKS
          </div>

          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black">
            Choose. Buy. Download. Earn.
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
            Select your platform, purchase verified leads, download CSV, and start converting.
          </p>
        </div>

        {/* ================= ZIG-ZAG STEP PROCESS CONTAINER ================= */}
        <div className="relative flex flex-col space-y-12 sm:space-y-16 lg:space-y-20">
          {/* ----- STEP 1 (LEFT) ----- */}
          <div className="relative flex flex-col lg:flex-row items-start justify-start">
            <div className="w-full lg:w-[48%] bg-[#eaf8d9] rounded-3xl p-6 sm:p-8 flex items-start gap-4 sm:gap-6 shadow-sm border border-[#d3eec0] hover:shadow-md transition-shadow relative z-20">
              {/* Vertical Pill Tag */}
              <div className="w-10 sm:w-10 self-stretch bg-[#0c4731] text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-inner select-none">
                <span className="text-xs sm:text-[13px] font-bold tracking-widest [writing-mode:vertical-lr] rotate-180 uppercase">
                  {stepsData[0].step}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl">{stepsData[0].emoji}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] tracking-tight">
                    {stepsData[0].title}
                  </h3>
                </div>
                {/* Mobile Concise */}
                <p className="block sm:hidden text-xs text-slate-600 leading-relaxed">
                  {stepsData[0].descriptionMobile}
                </p>
                {/* Desktop Full */}
                <p className="hidden sm:block text-sm md:text-[16px] text-slate-600 leading-relaxed max-w-md">
                  {stepsData[0].descriptionDesktop}
                </p>
              </div>
            </div>

            {/* Curved Dashed Connector: Step 1 to Step 2 (Desktop only) */}
            <div className="hidden lg:block absolute left-[44%] top-1/2 w-[30%] h-28 pointer-events-none z-10">
              <svg className="w-full h-full" viewBox="0 0 240 100" fill="none">
                <path
                  d="M0,10 H180 Q210,10 210,40 V85"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />
                <path d="M205,80 L210,92 L215,80" fill="none" stroke="#cbd5e1" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* ----- STEP 2 (RIGHT) ----- */}
          <div className="relative flex flex-col lg:flex-row items-start justify-end">
            <div className="w-full lg:w-[48%] bg-[#f1f5f9] rounded-3xl p-6 sm:p-8 flex items-start gap-4 sm:gap-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative z-20">
              {/* Vertical Pill Tag */}
              <div className="w-10 sm:w-10 self-stretch bg-[#1e293b] text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-inner select-none">
                <span className="text-xs sm:text-[13px] font-bold tracking-widest [writing-mode:vertical-lr] rotate-180 uppercase">
                  {stepsData[1].step}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl">{stepsData[1].emoji}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] tracking-tight">
                    {stepsData[1].title}
                  </h3>
                </div>
                {/* Mobile Concise */}
                <p className="block sm:hidden text-xs text-slate-600 leading-relaxed">
                  {stepsData[1].descriptionMobile}
                </p>
                {/* Desktop Full */}
                <p className="hidden sm:block text-sm md:text-[16px] text-slate-600 leading-relaxed max-w-md">
                  {stepsData[1].descriptionDesktop}
                </p>
              </div>
            </div>

            {/* Curved Dashed Connector: Step 2 to Step 3 (Desktop only) */}
            <div className="hidden lg:block absolute right-[44%] top-1/2 w-[30%] h-28 pointer-events-none z-10">
              <svg className="w-full h-full" viewBox="0 0 240 100" fill="none">
                <path
                  d="M240,10 H60 Q30,10 30,40 V85"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />
                <path d="M25,80 L30,92 L35,80" fill="none" stroke="#cbd5e1" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* ----- STEP 3 (LEFT) ----- */}
          <div className="relative flex flex-col lg:flex-row items-start justify-start">
            <div className="w-full lg:w-[48%] bg-[#eaf8d9] rounded-3xl p-6 sm:p-8 flex items-start gap-4 sm:gap-6 shadow-sm border border-[#d3eec0] hover:shadow-md transition-shadow relative z-20">
              {/* Vertical Pill Tag */}
              <div className="w-10 sm:w-10 self-stretch bg-[#0c4731] text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-inner select-none">
                <span className="text-xs sm:text-[13px] font-bold tracking-widest [writing-mode:vertical-lr] rotate-180 uppercase">
                  {stepsData[2].step}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl">{stepsData[2].emoji}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] tracking-tight">
                    {stepsData[2].title}
                  </h3>
                </div>
                {/* Mobile Concise */}
                <p className="block sm:hidden text-xs text-slate-600 leading-relaxed">
                  {stepsData[2].descriptionMobile}
                </p>
                {/* Desktop Full */}
                <p className="hidden sm:block text-sm md:text-[16px] text-slate-600 leading-relaxed max-w-md">
                  {stepsData[2].descriptionDesktop}
                </p>
              </div>
            </div>

            {/* Curved Dashed Connector: Step 3 to Step 4 (Desktop only) */}
            <div className="hidden lg:block absolute left-[44%] top-1/2 w-[30%] h-28 pointer-events-none z-10">
              <svg className="w-full h-full" viewBox="0 0 240 100" fill="none">
                <path
                  d="M0,10 H180 Q210,10 210,40 V85"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />
                <path d="M205,80 L210,92 L215,80" fill="none" stroke="#cbd5e1" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* ----- STEP 4 (RIGHT) ----- */}
          <div className="relative flex flex-col lg:flex-row items-start justify-end">
            <div className="w-full lg:w-[48%] bg-[#f1f5f9] rounded-3xl p-6 sm:p-8 flex items-start gap-4 sm:gap-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow relative z-20">
              {/* Vertical Pill Tag */}
              <div className="w-10 sm:w-10 self-stretch bg-[#1e293b] text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-inner select-none">
                <span className="text-xs sm:text-[13px] font-bold tracking-widest [writing-mode:vertical-lr] rotate-180 uppercase">
                  {stepsData[3].step}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl">{stepsData[3].emoji}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] tracking-tight">
                    {stepsData[3].title}
                  </h3>
                </div>
                {/* Mobile Concise */}
                <p className="block sm:hidden text-xs text-slate-600 leading-relaxed">
                  {stepsData[3].descriptionMobile}
                </p>
                {/* Desktop Full */}
                <p className="hidden sm:block text-sm md:text-[16px] text-slate-600 leading-relaxed max-w-md">
                  {stepsData[3].descriptionDesktop}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}