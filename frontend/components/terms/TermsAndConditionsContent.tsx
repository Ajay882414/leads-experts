"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  Lock,
  RefreshCw,
  AlertTriangle,
  Scale,
  Mail,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export default function TermsAndConditionsContent() {
  const [activeSection, setActiveSection] = useState("agreement");

  const navItems = [
    { id: "agreement", label: "1. Acceptance of Terms" },
    { id: "scope", label: "2. Services & Lead Delivery" },
    { id: "licensing", label: "3. Single-Buyer Data License" },
    { id: "compliance", label: "4. User Outreach & Compliance" },
    { id: "replacement", label: "5. 24-Hour Replacement SLA" },
    { id: "payments", label: "6. Billing, Credits & Invoices" },
    { id: "warranties", label: "7. Conversion Disclaimers" },
    { id: "liability", label: "8. Limitation of Liability" },
    { id: "termination", label: "9. Account Suspension" },
    { id: "contact-legal", label: "10. Legal Notice & Grievance" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
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
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#fafcfb] text-slate-900 overflow-hidden pt-36 sm:pt-44 md:pt-48 pb-20">
      
      {/* Subtle Line-Box Grid Background */}
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

      {/* Top Header Soft Radial Glow */}
      <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[380px] bg-gradient-to-b from-[#eef7ee] via-emerald-100/30 to-transparent blur-3xl -z-1 rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* ================= HERO INTRO SECTION ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] text-xs font-normal shadow-sm">
            <FileText size={13} className="text-[#0c4731]" />
            <span>Master Service Agreement &amp; Platform Guidelines</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-slate-900 leading-[1.18]">
            Terms and{" "}
            <span className="inline-block bg-[#97df2c] text-slate-950 px-3.5 py-0.5 rounded-xl shadow-sm transform -rotate-1 font-normal">
              Conditions.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-2xl mx-auto">
            Please read these terms carefully before accessing the LeadsVero Marketplace or purchasing verified lead batches. These terms govern your rights, data allocation, permissible outreach, and replacement guarantees.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-[11px] text-slate-400 font-normal">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-[#0c4731]" /> Last Updated: September 2026
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-[#0c4731]" /> Single-Buyer Data Protection
            </span>
            <span>•</span>
            <span className="text-[#0c4731] font-normal">Version 2.4 (Enterprise)</span>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <div className="rounded-2xl bg-white border border-slate-200/90 p-4.5 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-[#0c4731]">
              <Lock size={16} />
              <p className="text-xs sm:text-sm font-normal text-slate-900">Single-Buyer Exclusivity</p>
            </div>
            <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
              Allocated leads are permanently locked and retired from the system post-purchase.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200/90 p-4.5 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-[#0c4731]">
              <RefreshCw size={16} />
              <p className="text-xs sm:text-sm font-normal text-slate-900">24-Hour Replacement SLA</p>
            </div>
            <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
              Invalid or disconnected numbers qualify for instant automated lead credits.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200/90 p-4.5 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-[#0c4731]">
              <Scale size={16} />
              <p className="text-xs sm:text-sm font-normal text-slate-900">Ethical Outreach Laws</p>
            </div>
            <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
              Buyers must respect local telecommunication laws, DND registries, and opt-outs.
            </p>
          </div>
        </div>

        {/* ================= MAIN CONTENT SPLIT LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          
          {/* STICKY TABLE OF CONTENTS (DESKTOP) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-3">
            <div className="rounded-[26px] bg-white border border-slate-200/90 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-2">
              <p className="text-xs font-normal text-slate-400 uppercase tracking-wider px-3 pb-2 border-b border-slate-100">
                Navigation Index
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

            {/* Need Legal Support Widget */}
            <div className="rounded-[24px] bg-[#0c2e22] text-white p-5 border border-emerald-800/60 shadow-md space-y-2.5">
              <div className="flex items-center gap-2 text-[#a3e635] text-xs font-normal">
                <Mail size={14} />
                <span>Grievance &amp; Compliance</span>
              </div>
              <p className="text-xs font-normal text-emerald-100/80 leading-relaxed">
                Have questions regarding commercial licensing or enterprise bulk agreements?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-normal text-[#a3e635] hover:underline"
              >
                <span>Speak to Legal Desk</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </aside>

          {/* MAIN LEGAL DOCUMENTATION (ARTICLE BODY) */}
          <main className="lg:col-span-8 space-y-10">
            
            {/* 1. Acceptance of Terms */}
            <article id="agreement" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <FileText size={15} />
                <span>Section 1.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                1. Acceptance of Terms &amp; Scope of Agreement
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  By creating an account, accessing LeadsVero (&ldquo;Platform&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), or purchasing any lead batches, CSV packages, or subscription services, you (&ldquo;User&rdquo;, &ldquo;Buyer&rdquo;, or &ldquo;Customer&rdquo;) acknowledge that you have read, understood, and agree to be legally bound by these Terms and Conditions.
                </p>
                <p>
                  If you are using this platform on behalf of a registered company, marketing agency, or corporate enterprise, you represent and warrant that you hold full legal authority to bind that entity to these terms. If you do not agree to these terms, you must immediately terminate access to our services.
                </p>
              </div>
            </article>

            {/* 2. Services & Lead Delivery */}
            <article id="scope" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <FileText size={15} />
                <span>Section 2.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                2. Marketplace Services &amp; Lead Delivery Architecture
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  LeadsVero provides access to pre-filtered consumer and business contact directories sourced from public interactions, opt-in interest channels, and social media inquiries (including Instagram, LinkedIn, Facebook, and YouTube categories).
                </p>
                <div className="p-4 rounded-2xl bg-[#fafcfb] border border-slate-200 space-y-2">
                  <p className="text-xs font-normal text-slate-900">Standard Delivery Specifications:</p>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-[#0c4731] shrink-0 mt-0.5" />
                      <span><strong>Format:</strong> All files are delivered as UTF-8 encoded comma-separated values (.CSV) or Excel-compatible sheets.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-[#0c4731] shrink-0 mt-0.5" />
                      <span><strong>Delivery Timeline:</strong> Direct digital unlocks trigger immediately inside your user dashboard following payment authorization.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-[#0c4731] shrink-0 mt-0.5" />
                      <span><strong>Storage Period:</strong> Purchased file download links remain active in your account console for a minimum of 90 calendar days.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </article>

            {/* 3. Single-Buyer Data License */}
            <article id="licensing" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <Lock size={15} />
                <span>Section 3.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                3. Single-Buyer Allocation &amp; Exclusivity License
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  We grant you a perpetual, non-exclusive, non-sublicensable, and non-transferable commercial license to use the contact records specifically contained in your purchased package for internal sales outreach, B2B telecalling, and direct email marketing campaigns.
                </p>
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-amber-900 space-y-1.5 text-xs">
                  <p className="font-normal text-amber-950 flex items-center gap-1.5">
                    <AlertTriangle size={14} className="text-amber-700" />
                    Strict Resale Prohibition:
                  </p>
                  <p>
                    Under no circumstances may you resell, redistribute, sub-license, syndicate, publicly publish, or share purchased raw datasets with third-party lead brokers. Violation of this clause results in immediate forfeiture of account balances and potential legal enforcement under Indian Intellectual Property statutes.
                  </p>
                </div>
                <p>
                  <strong>Anti-Recycle Guarantee:</strong> LeadsVero guarantees that once a specific lead record is assigned to your order, it is marked as retired and will not be re-allocated or resold to any other buyer on the marketplace.
                </p>
              </div>
            </article>

            {/* 4. User Outreach & Compliance */}
            <article id="compliance" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <Scale size={15} />
                <span>Section 4.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                4. Permissible Marketing &amp; Anti-Spam Compliance
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  You are solely responsible for ensuring that your marketing methods, call schedules, SMS pitches, and WhatsApp messages comply with all applicable local, national, and international telecommunications laws, including but not limited to the Telecom Commercial Communications Customer Preference Regulations (TCCCPR) and Digital Personal Data Protection (DPDP) frameworks.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600 pl-2">
                  <li>• You agree not to engage in harassing, defamatory, fraudulent, or deceptive sales representations.</li>
                  <li>• You agree to immediately honor unsubscribe or opt-out requests initiated by prospective consumers during outreach.</li>
                  <li>• You shall indemnify LeadsVero against any third-party penalties, regulator notices, or carrier blocks stemming from your direct outreach practices.</li>
                </ul>
              </div>
            </article>

            {/* 5. 24-Hour Replacement SLA */}
            <article id="replacement" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <RefreshCw size={15} />
                <span>Section 5.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                5. Data Verification &amp; 24-Hour Replacement SLA
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  While we conduct rigorous pre-delivery validation checks to ensure high connect rates and active WhatsApp reach, telecommunication lines naturally experience periodic disconnections or subscriber reassignments.
                </p>
                <div className="p-4 rounded-2xl bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] space-y-2">
                  <p className="text-xs font-normal text-slate-900">Automated Replacement Protocol:</p>
                  <p className="text-xs leading-relaxed text-slate-700">
                    If more than 10% of records in your purchased batch are verifiably dead lines, permanently out-of-service, or completely mismatched demographics, you may submit a replacement request through your Order Details tab within <strong>24 hours of delivery</strong>.
                  </p>
                  <p className="text-xs leading-relaxed text-slate-700">
                    Verified defective contacts will receive automated wallet replacement credits or a fresh supplementary CSV batch within 24 business hours.
                  </p>
                </div>
              </div>
            </article>

            {/* 6. Billing, Credits & Invoices */}
            <article id="payments" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <FileText size={15} />
                <span>Section 6.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                6. Pricing, Payments, Taxes &amp; Final Sale Terms
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  Prices for individual lead packages are displayed transparently on the Marketplace page and are quoted in Indian Rupees (INR). All payments are processed via secured third-party payment gateways (UPI, Cards, NetBanking, or Enterprise Bank Transfers).
                </p>
                <p>
                  <strong>Final Sale Notice:</strong> Due to the instantaneous nature of digital CSV downloads and sensitive contact exposure, all completed transactions are non-refundable once files are exported. Our customer protection is fulfilled through the Data Replacement Guarantee (Section 5).
                </p>
                <p>
                  GST-compliant invoices are generated automatically for every completed order and can be downloaded from your account billing tab.
                </p>
              </div>
            </article>

            {/* 7. Conversion Disclaimers */}
            <article id="warranties" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <AlertTriangle size={15} />
                <span>Section 7.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                7. Disclaimer of Commercial Conversion Warranties
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  LeadsVero provides high-intent contact records and demographic data on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.
                </p>
                <p>
                  We explicitly do not guarantee, warrant, or represent that the leads provided will purchase your product, convert into paying clients, answer every telephone attempt, or achieve specific return-on-ad-spend (ROAS) targets. Conversion success relies entirely on your product viability, telecalling scripts, pitch delivery, pricing, and timing.
                </p>
              </div>
            </article>

            {/* 8. Limitation of Liability */}
            <article id="liability" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <Scale size={15} />
                <span>Section 8.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                8. Limitation of Liability &amp; Indemnification
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  To the maximum extent permitted by applicable law, in no event shall LeadsVero, its founders, directors, employees, or tech infrastructure partners be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of business revenue, missed deals, telecaller salaries, or reputational damage.
                </p>
                <p>
                  Our total cumulative liability arising out of or related to any individual order or service fault shall not exceed the exact monetary amount paid by you for that specific lead package.
                </p>
              </div>
            </article>

            {/* 9. Account Suspension */}
            <article id="termination" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <Lock size={15} />
                <span>Section 9.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                9. Termination &amp; Prohibited Exploitations
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  We reserve the right to immediately suspend or permanently terminate your account without prior notice if you:
                </p>
                <ul className="space-y-1 text-xs text-slate-600 pl-2">
                  <li>• Attempt to reverse engineer, scrape, automated-crawl, or exploit platform endpoints.</li>
                  <li>• Use fraudulent payment instruments or initiate unjustified chargeback disputes.</li>
                  <li>• Use purchased contact numbers for phishing, spam-blasting, extortion, or unauthorized bulk SMS blasts.</li>
                </ul>
              </div>
            </article>

            {/* 10. Legal Notice & Grievance */}
            <article id="contact-legal" className="rounded-[28px] bg-gradient-to-br from-[#0c4731] via-[#08281c] to-[#04120d] text-white p-7 sm:p-9 shadow-lg border border-emerald-800/70 space-y-4">
              <div className="flex items-center gap-2 text-xs font-normal text-[#a3e635]">
                <Mail size={15} />
                <span>Section 10.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-white tracking-tight">
                10. Governing Law, Jurisdiction &amp; Legal Notices
              </h2>
              <div className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed space-y-3">
                <p>
                  These Terms shall be governed by, interpreted, and construed in accordance with the laws of the Republic of India. Any legal disputes or claims arising out of this agreement shall be subject to the exclusive jurisdiction of the competent civil courts situated in India.
                </p>
                <p>
                  For formal legal communications, regulatory grievances, or enterprise licensing agreements, please direct all notices to our legal division:
                </p>
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-normal">
                  <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-white">
                    <p className="text-slate-400 text-[10px]">Email Legal Desk:</p>
                    <p className="font-mono text-[#a3e635]">legal@leadsvero.com</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-white">
                    <p className="text-slate-400 text-[10px]">Response Turnaround:</p>
                    <p className="text-white">Within 48 Business Hours</p>
                  </div>
                </div>
              </div>
            </article>

          </main>

        </div>

      </div>
    </section>
  );
}