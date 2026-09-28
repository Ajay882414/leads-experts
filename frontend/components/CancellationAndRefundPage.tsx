"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  CreditCard,
  FileText,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Calendar,
  ShieldAlert,
} from "lucide-react";

export default function CancellationAndRefundContent() {
  const [activeSection, setActiveSection] = useState("overview");

  const navItems = [
    { id: "overview", label: "1. Policy Overview" },
    { id: "digital-nature", label: "2. Digital Goods Final Sale" },
    { id: "replacement-sla", label: "3. 24-Hour Replacement SLA" },
    { id: "valid-cases", label: "4. Eligible Refund Scenarios" },
    { id: "process", label: "5. Refund Claim Procedure" },
    { id: "timeline", label: "6. Settlement Timelines" },
    { id: "cancellation", label: "7. Order Cancellation" },
    { id: "contact-support", label: "8. Helpdesk & Grievance" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 110;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elRect = el.getBoundingClientRect().top;
      const elPosition = elRect - bodyRect;
      const offsetPosition = elPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <main className="relative w-full min-h-screen bg-[#fafcfb] text-slate-900 overflow-hidden pt-36 sm:pt-44 md:pt-48 pb-24">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top Header Radial Glow */}
      <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[380px] bg-gradient-to-b from-[#eef7ee] via-emerald-100/30 to-transparent blur-3xl -z-1 rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* ================= HERO INTRO SECTION ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] text-xs font-normal shadow-sm">
            <RotateCcw size={13} className="text-[#0c4731]" />
            <span>Fair Transaction &amp; Buyer Protection</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-slate-900 leading-[1.18]">
            Cancellation &amp;{" "}
            <span className="inline-block bg-[#97df2c] text-slate-950 px-3.5 py-0.5 rounded-xl shadow-sm transform -rotate-1 font-normal">
              Refund Policy.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-2xl mx-auto">
            Please review our transaction policy regarding digital file delivery, replacement guarantees, and processing timelines for payment disputes or double debits.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-[11px] text-slate-400 font-normal">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-[#0c4731]" /> Last Updated: September 2026
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-[#0c4731]" /> 5-7 Working Days Settlement
            </span>
            <span>•</span>
            <span className="text-[#0c4731] font-normal">24-Hour Replacement SLA</span>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <div className="rounded-2xl bg-white border border-slate-200/90 p-4.5 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-[#0c4731]">
              <Clock size={16} />
              <p className="text-xs sm:text-sm font-normal text-slate-900">24-Hour Data SLA</p>
            </div>
            <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
              Defective or disconnected phone records qualify for automated supplementary credits.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200/90 p-4.5 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-[#0c4731]">
              <CreditCard size={16} />
              <p className="text-xs sm:text-sm font-normal text-slate-900">Payment Gateway Security</p>
            </div>
            <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
              Double charges or erroneous gateway debits are refunded back to the original source.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200/90 p-4.5 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-[#0c4731]">
              <ShieldAlert size={16} />
              <p className="text-xs sm:text-sm font-normal text-slate-900">Clear Terms</p>
            </div>
            <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
              Transparent review process with zero hidden deductions on approved refund claims.
            </p>
          </div>
        </div>

        {/* ================= MAIN CONTENT SPLIT LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* STICKY TABLE OF CONTENTS */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-3">
            <div className="rounded-[26px] bg-white border border-slate-200/90 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-2">
              <p className="text-xs font-normal text-slate-400 uppercase tracking-wider px-3 pb-2 border-b border-slate-100">
                Policy Navigation
              </p>
              <nav className="space-y-1 text-xs font-normal">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToId(item.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                      activeSection === item.id
                        ? "bg-[#0c4731] text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className="truncate">{item.label}</span>
                    {activeSection === item.id && (
                      <ArrowRight size={12} className="text-[#a3e635] shrink-0" />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Support Widget */}
            <div className="rounded-[24px] bg-[#0c2e22] text-white p-5 border border-emerald-800/60 shadow-md space-y-2.5">
              <div className="flex items-center gap-2 text-[#a3e635] text-xs font-normal">
                <Mail size={14} />
                <span>Billing Inquiries</span>
              </div>
              <p className="text-xs font-normal text-emerald-100/80 leading-relaxed">
                Facing issues with payment debits or file download triggers?
              </p>
              <div className="space-y-1 pt-1">
                <a
                  href="mailto:support@leadsvero.com"
                  className="flex items-center gap-1.5 text-xs font-normal text-[#a3e635] hover:underline"
                >
                  <span>support@leadsvero.com</span>
                  <ArrowRight size={12} />
                </a>
                <a
                  href="tel:+918769546871"
                  className="flex items-center gap-1.5 text-xs font-normal text-slate-300 hover:text-white"
                >
                  <Phone size={12} className="text-[#a3e635]" />
                  <span>+91 8769546871</span>
                </a>
              </div>
            </div>
          </aside>

          {/* MAIN ARTICLES BODY */}
          <div className="lg:col-span-8 space-y-10">
            {/* 1. Policy Overview */}
            <article id="overview" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <FileText size={15} />
                <span>Section 1.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                1. Policy Overview &amp; Agreement
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  This Cancellation and Refund Policy applies to all commercial transactions conducted on LeadsVero (&ldquo;Platform&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), including lead catalogue unlocks, CSV downloads, custom dataset compilations, and balance recharges.
                </p>
                <p>
                  By confirming an order through our payment gateway, you explicitly acknowledge and accept the conditions, turnaround windows, and resolution mechanisms detailed below.
                </p>
              </div>
            </article>

            {/* 2. Digital Goods Final Sale */}
            <article id="digital-nature" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <ShieldAlert size={15} />
                <span>Section 2.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                2. Nature of Digital Goods &amp; Final Sale Terms
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  LeadsVero provides intangible, irrevocable digital goods in the form of contact directories, consumer interest tags, and CSV/Excel spreadsheets.
                </p>
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-amber-900 space-y-1.5 text-xs">
                  <p className="font-normal text-amber-950 flex items-center gap-1.5">
                    <AlertTriangle size={14} className="text-amber-700" />
                    Irrevocable Download Notice:
                  </p>
                  <p>
                    Because lead contact records cannot be &ldquo;returned&rdquo; once downloaded or revealed, <strong>all completed dataset purchases are considered final and non-refundable</strong> once file access is granted or CSV export is initiated.
                  </p>
                </div>
                <p>
                  Customer protection against inaccuracies or connectivity issues is primarily resolved through our 24-Hour Replacement SLA (Section 3).
                </p>
              </div>
            </article>

            {/* 3. 24-Hour Replacement SLA */}
            <article id="replacement-sla" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <RotateCcw size={15} />
                <span>Section 3.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                3. Data Verification &amp; 24-Hour Replacement Guarantee
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  We strive to maintain high connect rates. However, telecommunications networks experience natural line changes. To safeguard your investment, we offer an automated replacement system:
                </p>
                <div className="p-4 rounded-2xl bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] space-y-2">
                  <p className="text-xs font-normal text-slate-900">Replacement Criteria:</p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-[#0c4731] shrink-0 mt-0.5" />
                      <span>If over 10% of contact numbers in a purchased batch are verifiably invalid, permanently disconnected, or out of service.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-[#0c4731] shrink-0 mt-0.5" />
                      <span>The replacement claim must be filed via your Order History tab within <strong>24 hours of file delivery</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-[#0c4731] shrink-0 mt-0.5" />
                      <span>Upon automated or administrative audit, verified bad records are replaced with fresh supplementary leads or equivalent platform wallet credits within 24 business hours.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </article>

            {/* 4. Eligible Refund Scenarios */}
            <article id="valid-cases" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <CreditCard size={15} />
                <span>Section 4.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                4. Circumstances Where Monetary Refunds Apply
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>Monetary refunds directly to the original payment source are strictly issued in the following instances:</p>
                <ul className="space-y-2 text-xs text-slate-600 pl-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#0c4731] shrink-0 mt-0.5" />
                    <span><strong>Duplicate Transactions:</strong> If your account or UPI was charged multiple times due to a gateway lag or network timeout for a single order.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#0c4731] shrink-0 mt-0.5" />
                    <span><strong>Technical Delivery Failure:</strong> If payment was successful but our servers failed to unlock the lead batch or generate the CSV file within 2 hours, and our engineering team cannot resolve the delivery within 12 hours of notice.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#0c4731] shrink-0 mt-0.5" />
                    <span><strong>Unfulfilled Custom Batch:</strong> If an advance payment was received for a custom B2B sourcing scope that our operations team is unable to fulfill.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* 5. Refund Claim Procedure */}
            <article id="process" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <Clock size={15} />
                <span>Section 5.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                5. How to Initiate a Refund Request
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  To request a refund under Section 4, submit an email to <strong className="text-[#0c4731] font-mono">info@leadsvero.com</strong> with the following details:
                </p>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-700">
                  <p>1. Registered Name and Account Email Address</p>
                  <p>2. Razorpay Payment ID (e.g., pay_xxxxxxxxxx) &amp; Order ID</p>
                  <p>3. Transaction Date, Exact Timestamp, and Amount in INR</p>
                  <p>4. Brief description of the issue along with payment screenshot or bank debit SMS proof</p>
                </div>
              </div>
            </article>

            {/* 6. Settlement Timelines */}
            <article id="timeline" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <Calendar size={15} />
                <span>Section 6.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                6. Refund Processing &amp; Bank Settlement Timelines
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  Once approved by our billing desk, refunds are initiated via our payment partner (Razorpay) to the original payment method:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-[#fafcfb] border border-slate-200 text-xs space-y-1">
                    <p className="text-slate-900 font-medium">UPI / NetBanking</p>
                    <p className="text-slate-500">Credited back within <strong>2 to 4 business days</strong>.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#fafcfb] border border-slate-200 text-xs space-y-1">
                    <p className="text-slate-900 font-medium">Credit / Debit Cards</p>
                    <p className="text-slate-500">Credited back within <strong>5 to 7 business days</strong> depending on the issuing bank.</p>
                  </div>
                </div>
              </div>
            </article>

            {/* 7. Order Cancellation */}
            <article id="cancellation" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <FileText size={15} />
                <span>Section 7.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                7. Order Cancellation Policy
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  Because lead unlocking and Single-Buyer database retirement happen immediately upon gateway confirmation, <strong>orders cannot be cancelled once the payment is completed</strong>.
                </p>
                <p>
                  For customized enterprise sourcing orders that require manual validation, cancellations are permissible only within <strong>1 hour of placement</strong> and before data mining starts.
                </p>
              </div>
            </article>

            {/* 8. Helpdesk & Grievance */}
            <article id="contact-support" className="rounded-[28px] bg-gradient-to-br from-[#0c4731] via-[#08281c] to-[#04120d] text-white p-7 sm:p-9 shadow-lg border border-emerald-800/70 space-y-4">
              <div className="flex items-center gap-2 text-xs font-normal text-[#a3e635]">
                <Mail size={15} />
                <span>Section 8.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-white tracking-tight">
                8. Billing Grievances &amp; Office Contact
              </h2>
              <div className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed space-y-3">
                <p>
                  For any escalations, refund tracking, or billing-related clarifications, contact our accounts desk directly:
                </p>
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-normal">
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 text-white space-y-1">
                    <p className="text-slate-400 text-[10px] uppercase tracking-wider">Billing Desk:</p>
                    <p className="font-mono text-[#a3e635] text-[11px]">info@leadsvero.com</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 text-white space-y-1">
                    <p className="text-slate-400 text-[10px] uppercase tracking-wider">Direct Hotline:</p>
                    <p className="font-mono text-slate-200 text-[11px]">+91 8769546871</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 text-white space-y-1">
                    <p className="text-slate-400 text-[10px] uppercase tracking-wider">Registered Address:</p>
                    <p className="text-[11px] text-slate-200 leading-snug">
                      City mall plus , Jagannathpuri Kanta road ,jhotwara jaipur 302012
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}