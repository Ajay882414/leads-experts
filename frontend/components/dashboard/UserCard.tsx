"use client";

import { useState, useRef } from "react";
import Link from "next/link";

interface UserCardProps {
  user: {
    fullName?: string;
    email?: string;
    role?: string;
  } | null;
  videoSrc?: string;
}

export default function UserCard({
  user,
  videoSrc = "/videos/IMG_5024.mp4",
}: UserCardProps) {
  const firstName = user?.fullName ? user.fullName.split(" ")[0] : "Farhin";
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-[28px] bg-gradient-to-r from-[#0a1512] via-[#0f2820] to-[#143d2c] p-6 sm:p-8 lg:p-9 text-white shadow-sm border border-emerald-950/40">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute right-4 -bottom-10 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="pointer-events-none absolute right-28 top-2 h-44 w-44 rounded-full bg-[#a3e635]/10 blur-2xl" />

      {/* Main Container: Mobile me column, desktop me row */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        
        {/* Left Side: Welcome Content */}
        <div className="flex flex-col items-start max-w-xl">
          <h2 className="text-2xl sm:text-[32px] font-black tracking-tight text-white flex items-center gap-2">
            Welcome! {firstName} <span className="inline-block text-2xl sm:text-3xl">👋</span>
          </h2>

          <p className="mt-2.5 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-lg">
            Track your lead purchases, download CSVs, and manage your wallet — all in one place.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <Link
              href="/browse-leads"
              className="inline-flex items-center justify-center rounded-xl bg-[#a3e635] hover:bg-[#b2f046] px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 transition-all duration-150 active:scale-95 shadow-sm"
            >
              Browse Leads
            </Link>
          </div>
        </div>

        {/* Right Side: Video Player (Infinite Loop + Mute/Unmute) */}
        <div className="relative w-full lg:w-72 xl:w-80 shrink-0 aspect-video rounded-2xl overflow-hidden border border-emerald-500/30 bg-black/60 shadow-lg">
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Speaker Button (Mute / Unmute Toggle) */}
          <button
            onClick={toggleSound}
            type="button"
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
            className="absolute bottom-2.5 right-2.5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition-all active:scale-90 border border-white/20"
          >
            {isMuted ? (
              /* Mute Icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              /* Speaker / Unmute Icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}