"use client";

import React, { useState } from "react";
import { Send, Sparkles, Quote, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ContactFormConsole() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    platform: "Instagram Leads",
    volume: "1,000 - 5,000 Leads",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        platform: "Instagram Leads",
        volume: "1,000 - 5,000 Leads",
        message: "",
      });
    }, 4000);
  };

  return (
    <section id="contact-form" className="relative w-full py-16 sm:py-20 px-4 sm:px-6 bg-[#fafcfb] overflow-hidden border-b border-slate-100">
      
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

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Main Dark Console Container */}
        <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#071d14] via-[#0a271b] to-[#04100b] text-white p-7 sm:p-12 md:p-14 border border-emerald-900/60 shadow-[0_25px_60px_rgba(7,29,20,0.4)]">
          
          {/* Subtle Ambient Radial Lights */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full bg-[#a3e635]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: From The Founder's Desk */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#a3e635] text-xs font-normal border border-white/10 backdrop-blur-md">
                <Sparkles size={13} />
                <span>Executive Lead Advisory</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-white leading-tight">
                From the Founder&apos;s Desk!!
              </h2>

              <div className="relative p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm space-y-3">
                <Quote size={28} className="text-[#a3e635]/70" />
                <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed italic">
                  &ldquo;Businesses don&apos;t fail due to bad products; they fail because of a lack of targeted, high-intent buyers. LeadsVero is built to eliminate cold outreach friction and give entrepreneurs, creators, and sales professionals instant access to genuine, verified leads.&rdquo;
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-normal text-white">Founder &amp; CEO</p>
                    <p className="text-[11px] font-normal text-emerald-300/80">LeadsVero Data Engine</p>
                  </div>
                  <div className="flex -space-x-1.5">
                    <span className="h-6 w-6 rounded-full bg-emerald-700 border border-emerald-400/40 text-[9px] flex items-center justify-center font-normal">LV</span>
                    <span className="h-6 w-6 rounded-full bg-[#a3e635] text-slate-950 border border-black/20 text-[9px] flex items-center justify-center font-normal">★</span>
                  </div>
                </div>
              </div>

              {/* Quality Commitments */}
              <div className="space-y-2.5 pt-1 text-xs text-slate-300 font-normal">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#a3e635]" />
                  <span>Dedicated telecalling strategy for your target niche</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#a3e635]" />
                  <span>Custom demographic &amp; state-wise filtering options</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#a3e635]" />
                  <span>Guaranteed data replacement SLA within 24 hours</span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Interactive Inquiry Form */}
            <div className="lg:col-span-7 rounded-[26px] bg-white/[0.06] border border-white/15 p-6 sm:p-9 backdrop-blur-xl shadow-inner">
              
              <div className="mb-6 space-y-1">
                <h3 className="text-lg sm:text-xl font-normal text-white tracking-tight">
                  Inquire For Custom Packs &amp; Enterprise Support
                </h3>
                <p className="text-xs text-slate-400 font-normal">
                  Fill in your requirements below and our data specialist will get back within 15 minutes.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="mx-auto h-12 w-12 rounded-full bg-[#a3e635] text-slate-950 flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-lg font-normal text-white">Inquiry Received Successfully!</h4>
                  <p className="text-xs text-slate-300 font-normal max-w-sm mx-auto">
                    Our lead sourcing specialist has been notified. We will reach out to your WhatsApp &amp; Email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-300 font-normal">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full h-11 rounded-xl bg-white/[0.07] border border-white/15 px-3.5 text-xs sm:text-sm text-white font-normal placeholder-slate-500 outline-none focus:border-[#a3e635] focus:bg-white/[0.1] transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-300 font-normal">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full h-11 rounded-xl bg-white/[0.07] border border-white/15 px-3.5 text-xs sm:text-sm text-white font-normal placeholder-slate-500 outline-none focus:border-[#a3e635] focus:bg-white/[0.1] transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-slate-300 font-normal">Work Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full h-11 rounded-xl bg-white/[0.07] border border-white/15 px-3.5 text-xs sm:text-sm text-white font-normal placeholder-slate-500 outline-none focus:border-[#a3e635] focus:bg-white/[0.1] transition-all"
                    />
                  </div>

                  {/* Channel & Volume Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-300 font-normal">Preferred Channel</label>
                      <select
                        value={formData.platform}
                        onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                        className="w-full h-11 rounded-xl bg-[#092219] border border-white/15 px-3.5 text-xs sm:text-sm text-white font-normal outline-none focus:border-[#a3e635]"
                      >
                        <option value="Instagram Leads">Instagram Leads (DMs &amp; Reels)</option>
                        <option value="LinkedIn B2B Leads">LinkedIn B2B Decision Makers</option>
                        <option value="Facebook Leads">Facebook Groups &amp; Ads</option>
                        <option value="YouTube Leads">YouTube Subscribed Audiences</option>
                        <option value="Custom Mixed Pool">Custom Multi-Platform Batch</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-300 font-normal">Expected Lead Volume</label>
                      <select
                        value={formData.volume}
                        onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                        className="w-full h-11 rounded-xl bg-[#092219] border border-white/15 px-3.5 text-xs sm:text-sm text-white font-normal outline-none focus:border-[#a3e635]"
                      >
                        <option value="1,000 - 5,000 Leads">1,000 - 5,000 Leads</option>
                        <option value="5,000 - 15,000 Leads">5,000 - 15,000 Leads</option>
                        <option value="15,000+ Enterprise Leads">15,000+ Enterprise Batch</option>
                        <option value="Existing Order Support">Existing Order / Account Query</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-slate-300 font-normal">Specific Requirements / Target Audience</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Need real estate buyers in Mumbai or e-commerce store founders across Tier-1 cities..."
                      className="w-full rounded-xl bg-white/[0.07] border border-white/15 p-3 text-xs sm:text-sm text-white font-normal placeholder-slate-500 outline-none focus:border-[#a3e635] focus:bg-white/[0.1] transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-[#0c4731] hover:bg-[#093524] text-white border border-emerald-500/40 text-xs sm:text-sm font-normal shadow-[0_4px_16px_rgba(12,71,49,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit Direct Inquiry</span>
                    <Send size={14} className="text-[#a3e635]" />
                  </button>

                  <p className="text-[10px] text-center text-slate-400 font-normal">
                    We maintain single-buyer confidentiality. Your contact info is never shared or spammed.
                  </p>

                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}