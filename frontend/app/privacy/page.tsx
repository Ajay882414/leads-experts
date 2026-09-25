"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  FileText,
  UserCheck,
  Server,
  Share2,
  Calendar,
  ArrowRight,
  Mail,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import ContactAndFooter from "@/components/ui/ContactAndFooter";
import Header from "@/components/common/Header";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const navItems = [
    { id: "overview", label: "1. Privacy Overview" },
    { id: "collection", label: "2. Data We Collect" },
    { id: "sourcing", label: "3. Lead Sourcing & Intent" },
    { id: "usage", label: "4. How Data is Used" },
    { id: "single-buyer", label: "5. Single-Buyer Data Lock" },
    { id: "protection", label: "6. Security & Encryption" },
    { id: "cookies", label: "7. Cookies & Analytics" },
    { id: "rights", label: "8. User & Consumer Rights" },
    { id: "compliance", label: "9. DPDP & Regulatory Laws" },
    { id: "officer", label: "10. Grievance Officer" },
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
    <div className="">
        <Header/>
    <main className="relative w-full min-h-screen bg-[#fafcfb] text-slate-900 overflow-hidden pt-36 sm:pt-44 md:pt-48 pb-24">

      {/* Subtle Line-Box Grid Background (No Dots) */}
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

      {/* Top Header Ambient Radial Glow */}
      <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[380px] bg-gradient-to-b from-[#eef7ee] via-emerald-100/30 to-transparent blur-3xl -z-1 rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* ================= HERO INTRO SECTION ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] text-xs font-normal shadow-sm">
            <ShieldCheck size={13} className="text-[#0c4731]" />
            <span>DPDP Compliant Data Governance</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-slate-900 leading-[1.18]">
            Privacy{" "}
            <span className="inline-block bg-[#97df2c] text-slate-950 px-3.5 py-0.5 rounded-xl shadow-sm transform -rotate-1 font-normal">
              Policy.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed max-w-2xl mx-auto">
            At LeadsVero, data integrity, user security, and ethical marketing compliance are foundational. This privacy statement explains how we gather, protect, allocate, and retire lead directory data.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-[11px] text-slate-400 font-normal">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-[#0c4731]" /> Effective Date: September 2026
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Lock size={13} className="text-[#0c4731]" /> 256-Bit SSL Encrypted
            </span>
            <span>•</span>
            <span className="text-[#0c4731] font-normal">Strict Anti-Scraping Protocols</span>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <div className="rounded-2xl bg-white border border-slate-200/90 p-4.5 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-[#0c4731]">
              <Database size={16} />
              <p className="text-xs sm:text-sm font-normal text-slate-900">Zero Unverified Scraping</p>
            </div>
            <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
              We never scrape dark-web registries or inject bulk robocall directories.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200/90 p-4.5 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-[#0c4731]">
              <Lock size={16} />
              <p className="text-xs sm:text-sm font-normal text-slate-900">Single-Buyer Locking</p>
            </div>
            <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
              Purchased CSV files are tied strictly to one account and permanently retired.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200/90 p-4.5 shadow-sm space-y-1">
            <div className="flex items-center gap-2 text-[#0c4731]">
              <UserCheck size={16} />
              <p className="text-xs sm:text-sm font-normal text-slate-900">Direct Opt-Out Respect</p>
            </div>
            <p className="text-[11px] text-slate-500 font-normal leading-relaxed">
              Instant removal mechanism for any consumer requesting database erasure.
            </p>
          </div>
        </div>

        {/* ================= MAIN CONTENT SPLIT LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* STICKY TABLE OF CONTENTS (DESKTOP) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-3">
            <div className="rounded-[26px] bg-white border border-slate-200/90 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-2">
              <p className="text-xs font-normal text-slate-400 uppercase tracking-wider px-3 pb-2 border-b border-slate-100">
                Privacy Navigation
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

            {/* Privacy Inquiries Support Widget */}
            <div className="rounded-[24px] bg-[#0c2e22] text-white p-5 border border-emerald-800/60 shadow-md space-y-2.5">
              <div className="flex items-center gap-2 text-[#a3e635] text-xs font-normal">
                <Mail size={14} />
                <span>Data Protection Helpdesk</span>
              </div>
              <p className="text-xs font-normal text-emerald-100/80 leading-relaxed">
                Have questions regarding personal data records, removal requests, or opt-outs?
              </p>
              <a
                href="mailto:privacy@leadsvero.com"
                className="inline-flex items-center gap-1.5 text-xs font-normal text-[#a3e635] hover:underline"
              >
                <span>Email Privacy Team</span>
                <ArrowRight size={12} />
              </a>
            </div>
          </aside>

          {/* MAIN LEGAL DOCUMENTATION */}
          <div className="lg:col-span-8 space-y-10">
            {/* 1. Privacy Overview */}
            <article id="overview" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <FileText size={15} />
                <span>Clause 1.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                1. Privacy Overview &amp; Introduction
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  LeadsVero (&ldquo;Platform&rdquo;, &ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates an intent-driven lead discovery marketplace. We respect the personal privacy of both our registered business customers (&ldquo;Buyers&rdquo;) and the consumer profiles indexed across public marketing inquiries.
                </p>
                <p>
                  This Privacy Policy sets forth our practices regarding the collection, retention, disclosure, and protection of information obtained through our website, user accounts, and API gateways.
                </p>
              </div>
            </article>

            {/* 2. Data We Collect */}
            <article id="collection" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <Database size={15} />
                <span>Clause 2.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                2. Information We Collect
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>We process two distinct categories of data:</p>
                <div className="p-4 rounded-2xl bg-[#fafcfb] border border-slate-200 space-y-3">
                  <div>
                    <p className="text-xs font-normal text-slate-900 mb-1">A. Account &amp; Billing Data (Buyers):</p>
                    <p className="text-xs text-slate-600">
                      When you register on LeadsVero, we collect your full name, work email address, WhatsApp/telephone contact number, company name, GSTIN (if applicable), and transactional history. Payment credentials (card/UPI details) are tokenized via PCI-DSS compliant payment gateways and are never stored on our servers.
                    </p>
                  </div>
                  <div className="border-t border-slate-100 pt-3">
                    <p className="text-xs font-normal text-slate-900 mb-1">B. Directory Contact Attributes (Leads):</p>
                    <p className="text-xs text-slate-600">
                      Our lead catalogues contain business-card level directory entries, including contact person name, active phone number, approximate demographic bracket (age/gender), geographic territory (city/state), professional category, and origin acquisition tag.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* 3. Lead Sourcing & Intent */}
            <article id="sourcing" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <Server size={15} />
                <span>Clause 3.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                3. Lead Sourcing &amp; Intent Verification
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  Unlike legacy web-scraping services that rip non-consensual private emails from arbitrary websites, LeadsVero leads are indexed exclusively from:
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600 pl-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#0c4731] shrink-0 mt-0.5" />
                    <span>Inbound expressions of interest across social platforms (Instagram DMs, Reels, Facebook Group inquiries).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#0c4731] shrink-0 mt-0.5" />
                    <span>Voluntary registration forms for educational webinars, skill development courses, and product consultations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-[#0c4731] shrink-0 mt-0.5" />
                    <span>B2B directory listings and publicly indexed commercial profile points (LinkedIn B2B professionals).</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* 4. How Data is Used */}
            <article id="usage" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <Eye size={15} />
                <span>Clause 4.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                4. Purpose of Processing &amp; Use of Information
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>We utilize the collected information strictly for:</p>
                <ul className="space-y-1.5 text-xs text-slate-600 pl-2">
                  <li>• Compiling targeted, category-specific CSV catalogues for legitimate commercial sales outreach.</li>
                  <li>• Validating active telecommunication connectivity and WhatsApp availability before catalog listing.</li>
                  <li>• Generating GST-compliant tax invoices and fulfilling financial audit standards.</li>
                  <li>• Facilitating 24-hour lead replacement credits in accordance with our platform SLA.</li>
                </ul>
              </div>
            </article>

            {/* 5. Single-Buyer Data Lock */}
            <article id="single-buyer" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <Lock size={15} />
                <span>Clause 5.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                5. Single-Buyer Locking &amp; Anti-Reselling Architecture
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  A primary concern in the digital lead ecosystem is the uncontrolled recirculation of contact data. LeadsVero operates under a strict <strong>Single-Buyer Exclusive Locking Protocol</strong>:
                </p>
                <div className="p-4 rounded-2xl bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] space-y-2 text-xs">
                  <p className="font-normal text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-[#0c4731]" />
                    Permanent Pool Retirement:
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    The moment a Buyer checks out a batch of leads, our automated inventory engine flags every individual phone number and profile entry in that batch as &ldquo;Retired&rdquo;. Those records are permanently excluded from future catalog queries and will never be resold to competing businesses.
                  </p>
                </div>
              </div>
            </article>

            {/* 6. Security & Encryption */}
            <article id="protection" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <ShieldCheck size={15} />
                <span>Clause 6.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                6. Data Security, Storage &amp; Encryption Standards
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  We implement administrative, technical, and physical safeguards designed to prevent unauthorized access, tampering, or loss of information:
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600 pl-2">
                  <li>• <strong>Encryption:</strong> All transmissions to and from the platform are encrypted using TLS 1.3 / SSL protocols. Database volumes are encrypted at rest using AES-256.</li>
                  <li>• <strong>Masked Previews:</strong> Contact phone numbers are strictly masked on the public marketplace and are only decipherable upon authorized order fulfillment.</li>
                  <li>• <strong>Access Control:</strong> Administrative access to lead databases is restricted using role-based permissions and mandatory Multi-Factor Authentication (MFA).</li>
                </ul>
              </div>
            </article>

            {/* 7. Cookies & Analytics */}
            <article id="cookies" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <Share2 size={15} />
                <span>Clause 7.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                7. Cookies, Web Beacons &amp; Tracking Technologies
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  We use essential cookies to maintain user session persistence, remember dashboard filters, and prevent automated bot scrapers. We do not sell tracking cookies to third-party behavioral advertising networks.
                </p>
                <p>
                  You may configure your web browser to reject non-essential cookies; however, certain portal functions (such as instant CSV downloads or saved filters) may not function optimally.
                </p>
              </div>
            </article>

            {/* 8. User & Consumer Rights */}
            <article id="rights" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <UserCheck size={15} />
                <span>Clause 8.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                8. Consumer Opt-Out &amp; Database Erasure Rights
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  Any individual whose phone number or contact record is indexed within our pre-sales directory holds the fundamental right to request immediate removal from our databases:
                </p>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <p className="text-slate-900 font-normal">How to Request Immediate Database Removal:</p>
                  <p className="text-slate-600 leading-relaxed">
                    Send an email to <strong className="text-[#0c4731] font-mono">optout@leadsvero.com</strong> containing your contact number and &ldquo;REMOVE MY RECORD&rdquo; in the subject line. We process and purge all matching records from active marketplace pools within <strong>24 business hours</strong>, no questions asked.
                  </p>
                </div>
              </div>
            </article>

            {/* 9. DPDP & Regulatory Laws */}
            <article id="compliance" className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-9 shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-normal text-[#0c4731]">
                <AlertCircle size={15} />
                <span>Clause 9.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-slate-900 tracking-tight">
                9. Digital Personal Data Protection (DPDP) Compliance
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed space-y-3">
                <p>
                  LeadsVero aligns its data collection and storage pipelines with the principles of the Digital Personal Data Protection Act (DPDPA) of India. We adhere strictly to data minimization, storage limitation, and secure disposal protocols.
                </p>
                <p>
                  Buyers acquiring leads through our platform are explicitly considered independent Data Fiduciaries / Data Controllers upon file export and must uphold ethical telecalling guidelines and respect the National Do Not Disturb (DND / NDNC) registries.
                </p>
              </div>
            </article>

            {/* 10. Grievance Officer */}
            <article id="officer" className="rounded-[28px] bg-gradient-to-br from-[#0c4731] via-[#08281c] to-[#04120d] text-white p-7 sm:p-9 shadow-lg border border-emerald-800/70 space-y-4">
              <div className="flex items-center gap-2 text-xs font-normal text-[#a3e635]">
                <Mail size={15} />
                <span>Clause 10.0</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-white tracking-tight">
                10. Grievance Redressal &amp; Data Protection Officer (DPO)
              </h2>
              <div className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed space-y-3">
                <p>
                  In compliance with Indian Information Technology rules and data protection mandates, we have designated a dedicated Grievance Officer to address any privacy inquiries or discrepancies:
                </p>
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-normal">
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 text-white space-y-1">
                    <p className="text-slate-400 text-[10px] uppercase tracking-wider">Designation:</p>
                    <p className="text-[#a3e635]">Data Protection &amp; Grievance Officer</p>
                    <p className="text-slate-300">LeadsVero Technologies India</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 text-white space-y-1">
                    <p className="text-slate-400 text-[10px] uppercase tracking-wider">Direct Email Address:</p>
                    <p className="font-mono text-[#a3e635]">grievance@leadsvero.com</p>
                    <p className="text-slate-300">SLA Response: &lt; 48 Working Hours</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

    </main>
      <ContactAndFooter/>
    </div>
  );
}