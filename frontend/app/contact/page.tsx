"use client";

import React from "react";
import ContactHero from "@/components/contact/ContactHero";
import ContactFormConsole from "@/components/contact/ContactFormConsole";
import PriorityChannelsStrip from "@/components/contact/PriorityChannelsStrip";
import ContactResolutionFAQ from "@/components/contact/ContactResolutionFAQ";
import ContactPageFooter from "@/components/contact/ContactPageFooter";
import Header from "@/components/common/Header";
import ContactAndFooter from "@/components/ui/ContactAndFooter";

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen bg-white">
      {/* Header */}
      <Header/>

      {/* 1. Contact Hero */}
      <ContactHero />

      {/* 2. Founder's Desk & Inquiry Console */}
      <ContactFormConsole />

      {/* 3. Priority WhatsApp & Enterprise Desk */}
      <PriorityChannelsStrip />

      {/* 4. Contact Resolution FAQ */}
      <ContactResolutionFAQ />

      {/* 5. Dedicated Footer */}
      <ContactAndFooter />
    </main>
  );
}