"use client";

import React, { useState } from "react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqsData: FaqItem[] = [
  {
    id: 1,
    question: "What happens after I buy?",
    answer:
      "You get instant access to your dashboard with real-time download links to your verified CSV database, delivery tracking, and dedicated WhatsApp support — no waiting, no friction.",
  },
  {
    id: 2,
    question: "Are these leads verified and active buyers?",
    answer:
      "Yes, 100%. All leads are sourced dynamically through high-intent ad campaigns (Meta, Google, LinkedIn) and filtered by age, active engagement, and recent buying behavior.",
  },
  {
    id: 3,
    question: "What makes LeadFlow different from scraped web databases?",
    answer:
      "Unlike outdated scraped numbers that bounce or fail on WhatsApp, LeadFlow delivers opted-in users collected within the last 24-48 hours specifically interested in digital products and services.",
  },
  {
    id: 4,
    question: "Can I choose my specific target audience and niche?",
    answer:
      "Absolutely. You can filter by specific customer profiles including Housewife, Working Professionals, Students, Business Owners, or Location-based criteria before checking out.",
  },
  {
    id: 5,
    question: "Is there a way to upgrade or buy in bulk later?",
    answer:
      "Yes, your dashboard allows one-click top-ups. You can scale from 50 leads to 5,000+ leads anytime with discounted volume tiers and priority custom extraction.",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(1); // 1st item open by default

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative w-full bg-white py-20 sm:py-28 px-4 sm:px-8 lg:px-14 overflow-hidden selection:bg-[#97df2c] selection:text-black">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ================= LEFT COLUMN: TITLE + CONNECTED ICONS NETWORK ================= */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            
            {/* Header */}
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-widest mb-4">
                FAQ
              </div>
              <h2 className="text-3xl sm:text-4xl font-medium font-black text-[#0f172a] tracking-tight leading-[1.15]">
                What would you like to know about Us
              </h2>
            </div>

            {/* Connected Node Platform Network Graphic */}
            <div className="relative w-full h-[260px] sm:h-[300px] mt-10">
              
              {/* SVG Connecting Dashed/Light Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 240" fill="none">
                <line x1="40" y1="120" x2="110" y2="60" stroke="#fecaca" strokeWidth="1.5" />
                <line x1="40" y1="120" x2="160" y2="150" stroke="#fecaca" strokeWidth="1.5" />
                <line x1="110" y1="60" x2="220" y2="70" stroke="#fecaca" strokeWidth="1.5" />
                <line x1="160" y1="150" x2="220" y2="70" stroke="#fecaca" strokeWidth="1.5" />
                <line x1="220" y1="70" x2="300" y2="65" stroke="#fecaca" strokeWidth="1.5" />
                <line x1="220" y1="70" x2="290" y2="165" stroke="#fecaca" strokeWidth="1.5" />
                <line x1="40" y1="210" x2="130" y2="195" stroke="#fecaca" strokeWidth="1.5" />
                <line x1="130" y1="195" x2="230" y2="200" stroke="#fecaca" strokeWidth="1.5" />
                <line x1="290" y1="165" x2="380" y2="185" stroke="#fecaca" strokeWidth="1.5" />
              </svg>

              {/* Node 1: Meta (Far Left) */}
              <div className="absolute left-2 top-[38%] -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">∞</span>
              </div>

              {/* Node 2: Python / AI (Top-Left) */}
              <div className="absolute left-[24%] top-[12%] w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-sm">
                🐍
              </div>

              {/* Node 3: Excel (Center-Left) */}
              <div className="absolute left-[36%] top-[52%] w-9 h-9 rounded-xl bg-[#107c41] shadow-md flex items-center justify-center text-white font-bold text-xs">
                X
              </div>

              {/* Node 4: LinkedIn (Top-Center) */}
              <div className="absolute left-[50%] top-[16%] w-10 h-10 rounded-xl bg-[#0a66c2] shadow-md flex items-center justify-center text-white font-bold text-sm">
                in
              </div>

              {/* Node 5: VN Editor (Top-Right) */}
              <div className="absolute left-[70%] top-[14%] w-9 h-9 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center font-black text-xs text-slate-800">
                VN
              </div>

              {/* Node 6: Trading / Stocks (Center-Right) */}
              <div className="absolute left-[68%] top-[56%] w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-sm">
                📊
              </div>

              {/* Node 7: ChatGPT (Far Right) */}
              <div className="absolute right-4 top-[64%] w-10 h-10 rounded-xl bg-[#10a37f] shadow-md flex items-center justify-center text-white font-bold text-xs">
                GPT
              </div>

              {/* Node 8: Google Ads (Bottom Left) */}
              <div className="absolute left-3 bottom-2 w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-[#4285F4] font-black text-xs">
                G
              </div>

              {/* Node 9: Shopify (Bottom Center-Left) */}
              <div className="absolute left-[28%] bottom-3 w-9 h-9 rounded-full bg-[#95bf47] shadow-md flex items-center justify-center text-white font-bold text-xs">
                🛍️
              </div>

              {/* Node 10: Shorts / Video (Bottom Center) */}
              <div className="absolute left-[54%] bottom-1 w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-red-600 font-bold text-sm">
                ▶
              </div>

            </div>

          </div>

          {/* ================= RIGHT COLUMN: INTERACTIVE ACCORDIONS ================= */}
          <div className="lg:col-span-7 flex flex-col space-y-3.5 sm:space-y-4">
            {faqsData.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-[22px] transition-all duration-300 overflow-hidden border ${
                    isOpen
                      ? "bg-[#e2e8f0]/80 border-slate-300/70 shadow-sm"
                      : "bg-[#f8fafc] hover:bg-[#f1f5f9] border-slate-100"
                  }`}
                >
                  {/* Clickable Header Button */}
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight pr-4">
                      {faq.question}
                    </span>

                    {/* Animated Chevron Arrow */}
                    <div className="flex-shrink-0 text-slate-700">
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Expandable Body */}
                  {isOpen && (
                    <div className="px-6 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}