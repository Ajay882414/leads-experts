"use client";

import React from "react";

interface StepItem {
  step: string;
  emoji: string;
  title: string;
  description: string;
  cardBg: string;
  pillBg: string;
  pillText: string;
  textColor: string;
  descColor: string;
  align: "left" | "right";
}

const stepsData: StepItem[] = [
  {
    step: "Step - 1",
    emoji: "📦",
    title: "Choose Your Package.",
    description:
      "Select the platform and audience type that aligns with your business goals.",
    cardBg: "bg-[#eaf8d9]", // Soft light lime tint
    pillBg: "bg-[#0c4731]",
    pillText: "text-white",
    textColor: "text-[#0f172a]",
    descColor: "text-slate-600",
    align: "left",
  },
  {
    step: "Step - 2",
    emoji: "🎯",
    title: "Select Lead Count.",
    description:
      "Pick how many leads you need — 50, 100, 250, or custom. Price auto-calculates.",
    cardBg: "bg-[#f1f5f9]", // Clean light gray/blue tint
    pillBg: "bg-[#1e293b]",
    pillText: "text-white",
    textColor: "text-[#0f172a]",
    descColor: "text-slate-600",
    align: "right",
  },
  {
    step: "Step - 3",
    emoji: "🚀",
    title: "Make Payment.",
    description:
      "Pay securely via UPI, Card, or Wallet. Instant confirmation.",
    cardBg: "bg-[#eaf8d9]",
    pillBg: "bg-[#0c4731]",
    pillText: "text-white",
    textColor: "text-[#0f172a]",
    descColor: "text-slate-600",
    align: "left",
  },
  {
    step: "Step - 4",
    emoji: "💰",
    title: "Download & Convert.",
    description:
      "Get your CSV within 24 hours. Start calling, messaging, and closing deals.",
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
        <div className=" max-w-3xl  mb-16 sm:mb-18">
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
        <div className="relative flex flex-col space-y-12 sm:space-y-16 lg:space-y-20 ">
          
          {/* ----- STEP 1 (LEFT) ----- */}
          <div className="relative flex flex-col lg:flex-row items-start justify-start">
            <div className="w-full lg:w-[48%] bg-[#eaf8d9] rounded-3xl p-6 sm:p-8 flex items-start gap-4 sm:gap-6 shadow-sm border border-[#d3eec0] hover:shadow-md transition-shadow relative z-20">
              
              {/* Vertical Pill Tag */}
              <div className="w-10 sm:w-10 self-stretch bg-[#0c4731] text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-inner select-none">
  <span className="text-xs sm:text-[13px] font-bold tracking-widest [writing-mode:vertical-lr] rotate-180 uppercase">
    STEP - 1
  </span>
</div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2 mb-10">
                  <span className="text-2xl sm:text-3xl">📦</span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] tracking-tight">
                    Choose Your Package.
                  </h3>
                </div>
                <p className="text-xs sm:text-[18px] text-slate-600 leading-relaxed max-w-md">
                 Select the package that aligns with your career goals and unlock a complete roadmap of industry-focused skills designed for real-world success.
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
     Step - 2
  </span>
</div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2 mb-10">
                  <span className="text-2xl sm:text-3xl">🎯</span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] tracking-tight">
                    Select Lead Count.
                  </h3>
                </div>
                <p className="text-xs sm:text-[18px] text-slate-600 leading-relaxed max-w-md">
                 Select the package that aligns with your career goals and unlock a complete roadmap of industry-focused skills designed for real-world success.
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
   Step - 3
  </span>
</div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2 mb-10">
                  <span className="text-2xl sm:text-3xl">🚀</span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] tracking-tight">
                    Make Payment.
                  </h3>
                </div>
                <p className="text-xs sm:text-[18px] text-slate-600 leading-relaxed max-w-md">
                 Select the package that aligns with your career goals and unlock a complete roadmap of industry-focused skills designed for real-world success.
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
     Step - 4
  </span>
</div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2 mb-10">
                  <span className="text-2xl sm:text-3xl">💰</span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] tracking-tight">
                    Download & Convert.
                  </h3>
                </div>
                <p className="text-xs sm:text-[18px] text-slate-600 leading-relaxed max-w-md">
                 Select the package that aligns with your career goals and unlock a complete roadmap of industry-focused skills designed for real-world success.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}