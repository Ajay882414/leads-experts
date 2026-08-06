"use client";

import Header from "@/components/common/Header";
// import { useEffect, useState } from "react";
// import { testBackend } from "@/services/testApi";
import HeroSection from "@/components/common/HeroSection";

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
    <div className="">
      <Header/>
      <HeroSection />
    </div>
  );
}