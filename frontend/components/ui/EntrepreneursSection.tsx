"use client";

import React, { useRef } from "react";
import Image from "next/image";

interface Entrepreneur {
  id: string;
  firstName: string;
  highlightedName: string;
  description: string;
  image: string;
}

const entrepreneursData: Entrepreneur[] = [
  {
    id: "1",
    firstName: "Akash",
    highlightedName: "Aanand",
    description: "Scaled Bella Vita with smart branding, consistency, and execution excellence.",
    image: "/image.png",
  },
  {
    id: "2",
    firstName: "Aman",
    highlightedName: "Gupta",
    description: "Turned boAt into a household name with bold marketing, quality products, and vision.",
    image: "/image.png",
  },
  {
    id: "3",
    firstName: "Aseemm",
    highlightedName: "Ghavri",
    description: "Helping businesses scale globally using tech, high-intent leads, and strong execution.",
    image: "/image.png",
  },
  {
    id: "4",
    firstName: "Ashneer",
    highlightedName: "Grover",
    description: "Built BharatPe with fearless decisions, data-backed scaling, and sharp practical business insights.",
    image: "/image.png",
  },
  {
    id: "5",
    firstName: "Anupam",
    highlightedName: "Mittal",
    description: "Pioneered Shaadi.com and transformed online matchmaking across the country.",
    image: "/image.png",
  },
  {
    id: "6",
    firstName: "Peyush",
    highlightedName: "Bansal",
    description: "Revolutionized eyewear with Lenskart using cutting-edge technology and customer-first focus.",
    image: "/image.png",
  },
  {
    id: "7",
    firstName: "Ritesh",
    highlightedName: "Agarwal",
    description: "Built OYO from scratch into one of the largest hospitality chains worldwide.",
    image: "/image.png",
  },
];

export default function EntrepreneursSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full bg-white py-20 sm:py-28 px-4 sm:px-8 lg:px-14 overflow-hidden selection:bg-[#99db32] selection:text-black">
      <div className="max-w-6xl mx-auto">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            {/* Header Pill Badge */}
            <div className="inline-block px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-widest mb-4">
              INDUSTRY VOICES
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-black leading-tight">
              India&apos;s Top Entrepreneurs Believe in What We&apos;re Doing
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-11 h-11 rounded-full bg-[#063b27] hover:bg-[#04281a] text-white flex items-center justify-center transition-all duration-200 active:scale-90 shadow-md cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-11 h-11 rounded-full bg-[#063b27] hover:bg-[#04281a] text-white flex items-center justify-center transition-all duration-200 active:scale-90 shadow-md cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ================= CARDS SLIDER CONTAINER (ALL SCREENS SCROLLABLE) ================= */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {entrepreneursData.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[270px] sm:w-[290px] h-[420px] sm:h-[460px] rounded-[32px] overflow-hidden relative group shadow-lg border border-slate-100 snap-start select-none"
            >
              {/* Background Photo */}
              <Image
                src={item.image}
                alt={`${item.firstName} ${item.highlightedName}`}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 640px) 270px, 290px"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

              

              {/* Card Footer Details */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                  {item.firstName}{" "}
                  <span className="text-[#a3e635]">
                    {item.highlightedName}
                  </span>
                </h3>
                <p className="mt-2 text-xs sm:text-[13px] text-slate-300 font-normal leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        

      </div>
    </section>
  );
}