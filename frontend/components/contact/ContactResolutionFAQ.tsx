"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, CheckCircle2 } from "lucide-react";

export default function ContactResolutionFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How fast do you respond to custom bulk inquiries?",
      a: "Our WhatsApp line responds within 15 minutes during operating hours (9:00 AM – 9:00 PM IST). Inquiries submitted through the contact form receive full custom inventory counts and quotation files within 1 business hour.",
    },
    {
      q: "Can I request specific geographic or state-wise filtered leads?",
      a: "Yes. For batches above 2,500 leads, our sourcing team can filter records specifically by Tier-1 metros, individual states (e.g. Maharashtra, Delhi NCR, Gujarat, Karnataka), or age brackets without extra surcharges.",
    },
    {
      q: "What should I do if I encounter an issue with my downloaded CSV file?",
      a: "You don't need to submit a general support ticket. Simply open your dashboard, navigate to your order history, and click 'Request Replacement'. Dead or invalid lines are credited or refreshed automatically within 24 hours.",
    },
    {
      q: "Do you offer GST billing and official business invoices?",
      a: "Yes. All purchases generate an instant GST-compliant tax invoice accessible immediately inside your LeadsVero billing tab with full business details.",
    },
  ];

  return (
    <section className="relative w-full py-16 sm:py-20 px-4 sm:px-6 bg-[#fafcfb] overflow-hidden border-b border-slate-100">
      
      {/* Line Box Grid System */}
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

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] text-xs font-normal">
            <HelpCircle size={13} className="text-[#0c4731]" />
            <span>Support &amp; Resolution Guidelines</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-slate-900 tracking-tight">
            Frequently Asked Inquiries
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-md mx-auto">
            Everything you need to know about our sourcing SLA and enterprise communication.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60"
                >
                  <span className="text-sm sm:text-base font-normal text-slate-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#0c4731]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed border-t border-slate-100 bg-[#fbfdfc]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}