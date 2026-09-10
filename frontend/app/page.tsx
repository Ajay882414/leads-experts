"use client";

import Header from "@/components/common/Header";
import Hero from "@/components/common/HeroSection";
// import { useEffect, useState } from "react";
// import { testBackend } from "@/services/testApi";
import CareerPathsSection from "@/components/ui/CareerPathsSection";
import ContactAndFooter from "@/components/ui/ContactAndFooter";
import EntrepreneursSection from "@/components/ui/EntrepreneursSection";
import FaqSection from "@/components/ui/FaqSection";
import LeadPacks from "@/components/ui/LeadPacks";
import MarqueeBanner from "@/components/ui/MarqueeBanner";
import ProcessSection from "@/components/ui/ProcessSection";
import WhyUsSection from "@/components/ui/WhyUsSection";

export default function Home() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await testBackend();
  //       setMessage(data.message);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    // <main className="flex items-center justify-center h-screen">
    //   <h1 className="text-3xl font-bold">{message}</h1>
    //   hello sir
    // </main>
    <main className="">
      <Header />
      <Hero />
      <LeadPacks/>
      <MarqueeBanner/>
      <ProcessSection/>
      <EntrepreneursSection/>
      <CareerPathsSection/>
      <WhyUsSection/>
      <FaqSection/>
      <ContactAndFooter/>
    </main>
  );
}