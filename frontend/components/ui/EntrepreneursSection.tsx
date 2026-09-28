"use client";

import React, { useRef } from "react";
import Image from "next/image";

interface Entrepreneur {
  id: string;
  firstName: string;
  highlightedName: string;
  role: string;
  company: string;
  quote: string;
  image: string;
}

const entrepreneursData: Entrepreneur[] = [
  {
    id: "1",
    firstName: "Aman",
    highlightedName: "Gupta",
    role: "Co-Founder & CMO",
    company: "boAt Lifestyle",
    quote: "Building a consumer brand requires continuous relevance, sharp pricing, and understanding what the modern Indian youth actually wants.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    firstName: "Peyush",
    highlightedName: "Bansal",
    role: "Founder & CEO",
    company: "Lenskart",
    quote: "Customer obsession and disciplined operational technology turn traditional, unorganized offline markets into high-efficiency businesses.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    firstName: "Anupam",
    highlightedName: "Mittal",
    role: "Founder & Director",
    company: "Shaadi.com (People Group)",
    quote: "The core of enterprise scaling is sustainable unit economics and identifying genuine high-intent customer segments early.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    firstName: "Ashneer",
    highlightedName: "Grover",
    role: "Fintech Leader & Founder",
    company: "Third Unicorn",
    quote: "Growth is nothing without profitability. If your sales funnel cannot close real cash-paying users with speed, nothing else matters.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    firstName: "Akash",
    highlightedName: "Aanand",
    role: "Founder",
    company: "Bella Vita Organic",
    quote: "Agile performance distribution and targeted direct-to-consumer outreach create compounding trust faster than any broad campaign.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
];

export default function EntrepreneursSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative w-full bg-[#fafcfb] py-16 sm:py-24 px-4 sm:px-8 lg:px-12 overflow-hidden selection:bg-[#99db32] selection:text-black border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] text-[11px] font-semibold uppercase tracking-wider">
              <span>Execution Philosophies</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              Scaling Principles Inspired by{" "}
              <span className="text-[#0c4731] underline decoration-[#97df2c] decoration-4 underline-offset-4">
                India&apos;s Top Builders
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Real high-performing enterprises aren&apos;t built on random cold calls—they are engineered on intent, relentless verification, and data-backed closing loops.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2.5 self-start md:self-end">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous card"
              className="w-10 h-10 rounded-full bg-[#0c4731] hover:bg-[#082f21] text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next card"
              className="w-10 h-10 rounded-full bg-[#0c4731] hover:bg-[#082f21] text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ================= CARDS SLIDER CONTAINER ================= */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {entrepreneursData.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[260px] sm:w-[285px] h-[390px] sm:h-[430px] rounded-[26px] overflow-hidden relative group shadow-md border border-slate-200 snap-start select-none bg-slate-900"
            >
              {/* Background Photo */}
              <Image
                src={item.image}
                alt={`${item.firstName} ${item.highlightedName}`}
                fill
                sizes="(max-width: 640px) 260px, 285px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-95"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

              {/* Top Tag: Company/Brand */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium text-[#a3e635]">
                  {item.company}
                </span>
              </div>

              {/* Card Footer Details */}
              <div className="absolute bottom-0 inset-x-0 p-5 z-10 space-y-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                    {item.firstName}{" "}
                    <span className="text-[#a3e635]">
                      {item.highlightedName}
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400 font-normal">
                    {item.role}
                  </p>
                </div>

                <div className="pt-1 border-t border-white/10">
                  <p className="text-xs text-slate-200 italic font-normal leading-relaxed line-clamp-3">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}