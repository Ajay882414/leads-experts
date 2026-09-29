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
    question: "Payment complete hone ke baad leads kaise milengi?",
    answer:
      "Payment confirm hote hi aapke user dashboard me instant file unlock ho jati hai. Aap live leads ki list preview kar sakte hain aur ek click me structured UTF-8 .CSV ya Excel spreadsheet download kar sakte hain.",
  },
  {
    id: 2,
    question: "Kya yeh leads kisi aur buyer ko dobara bechi jati hain?",
    answer:
      "Bilkul nahi. LeadsVero strict Single-Buyer Exclusive Lock par kaam karta hai. Jo specific lead batch aap check out karte hain, woh hamare database me permanent 'Retired' flag ho jati hai aur kisi doosre competitor ko kabhi allocate nahi hoti.",
  },
  {
    id: 3,
    question: "Agar file me invalid ya switch-off numbers mile toh?",
    answer:
      "Humari 24-Hour Replacement SLA policy ke tehat, agar batch me 10% se zyada invalid ya disconnected numbers hote hain, toh aap direct support desk ya order tab se claim raise kar sakte hain. Verify hone par automated replacement records ya wallet credits provide kiye jate hain.",
  },
  {
    id: 4,
    question: "LeadsVero ka data random internet scraping se alag kaise hai?",
    answer:
      "Random scrapers internet se dead ya expired numbers uthate hain. LeadsVero par leads active digital campaigns (Instagram reels, Meta ads, inbound opt-in forms, aur B2B queries) se filter hoti hain, jisme active WhatsApp connect rate kaafi high rehta hai.",
  },
  {
    id: 5,
    question: "Kya specific category, gender ya location filter mil sakta hai?",
    answer:
      "Haan. Aap marketplace me category (Students, Work from Home, Business Owners, Corporate Executives) ke saath demographics aur state/city filters choose kar sakte hain taaki aapki sales team sirf relevant prospects par call kare.",
  },
  {
    id: 6,
    question: "Kya mujhe purchase ka official invoice milega?",
    answer:
      "Haan, har successful transaction par system automatically tax-compliant digital invoice generate karta hai jise aap apne billing dashboard se anytime download kar sakte hain.",
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
                Everything You Need to Know About LeadsVero
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                Clear answers regarding our single-buyer data lock, instant CSV unlocks, connect SLAs, and verification process.
              </p>
            </div>

            {/* Connected Node Platform Network Graphic */}
            <div className="relative w-full h-[260px] sm:h-[300px] mt-10">
              
              {/* SVG Connecting Dashed/Light Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 240" fill="none">
                <line x1="40" y1="120" x2="110" y2="60" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="40" y1="120" x2="160" y2="150" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="110" y1="60" x2="220" y2="70" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="160" y1="150" x2="220" y2="70" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="220" y1="70" x2="300" y2="65" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="220" y1="70" x2="290" y2="165" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="40" y1="210" x2="130" y2="195" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="130" y1="195" x2="230" y2="200" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="290" y1="165" x2="380" y2="185" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>

              {/* Node 1: Meta (Far Left) */}
              <div className="absolute left-2 top-[38%] -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">∞</span>
              </div>

              {/* Node 2: Python / AI (Top-Left) */}
              <div className="absolute left-[24%] top-[12%] w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-sm">
                ⚡
              </div>

              {/* Node 3: Excel (Center-Left) */}
              <div className="absolute left-[36%] top-[52%] w-9 h-9 rounded-xl bg-[#107c41] shadow-md flex items-center justify-center text-white font-bold text-xs">
                CSV
              </div>

              {/* Node 4: LinkedIn (Top-Center) */}
              <div className="absolute left-[50%] top-[16%] w-10 h-10 rounded-xl bg-[#0a66c2] shadow-md flex items-center justify-center text-white font-bold text-sm">
                in
              </div>

              {/* Node 5: Verified Tag (Top-Right) */}
              <div className="absolute left-[70%] top-[14%] w-9 h-9 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center font-black text-xs text-emerald-600">
                ✓
              </div>

              {/* Node 6: Analytics / Scale (Center-Right) */}
              <div className="absolute left-[68%] top-[56%] w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-sm">
                📊
              </div>

              {/* Node 7: Instant DB (Far Right) */}
              <div className="absolute right-4 top-[64%] w-10 h-10 rounded-xl bg-[#0c4731] shadow-md flex items-center justify-center text-[#a3e635] font-bold text-xs">
                LIVE
              </div>

              {/* Node 8: Google Ads (Bottom Left) */}
              <div className="absolute left-3 bottom-2 w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-[#4285F4] font-black text-xs">
                G
              </div>

              {/* Node 9: WhatsApp Direct (Bottom Center-Left) */}
              <div className="absolute left-[28%] bottom-3 w-9 h-9 rounded-full bg-[#25D366] shadow-md flex items-center justify-center text-white font-bold text-xs">
                WA
              </div>

              {/* Node 10: Video / Engagement (Bottom Center) */}
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