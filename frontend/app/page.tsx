
"use client";

import { useEffect, useRef, useState } from "react";

import Header from "@/components/common/Header";
import Hero from "@/components/common/HeroSection";
import CareerPathsSection from "@/components/ui/CareerPathsSection";
import ContactAndFooter from "@/components/ui/ContactAndFooter";
import EntrepreneursSection from "@/components/ui/EntrepreneursSection";
import FaqSection from "@/components/ui/FaqSection";
import LeadPacks from "@/components/ui/LeadPacks";
import MarqueeBanner from "@/components/ui/MarqueeBanner";
import ProcessSection from "@/components/ui/ProcessSection";
import WhyUsSection from "@/components/ui/WhyUsSection";

export default function Home() {
  const [isVideoOpen, setIsVideoOpen] = useState(true);
  const [needsSoundClick, setNeedsSoundClick] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideoOpen) return;

    // Browser allows sound autoplay? Try playing with sound first.
    video.muted = false;
    video.volume = 1;

    video.play()
      .then(() => {
        setNeedsSoundClick(false);
      })
      .catch(() => {
        // Audible autoplay may be blocked by the browser.
        setNeedsSoundClick(true);
      });
  }, [isVideoOpen]);

  const enableSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;

    try {
      await video.play();
      setNeedsSoundClick(false);
    } catch {
      setNeedsSoundClick(true);
    }
  };

  const closeVideo = () => {
    videoRef.current?.pause();
    setIsVideoOpen(false);
  };

  return (
    <>
      {/* Home Page Video Popup */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-700 bg-[#0f172a] shadow-2xl">

            {/* Popup Header */}
            <div className="flex items-center justify-between border-b border-slate-700 bg-[#1e293b] px-5 py-4">
              <h2 className="text-base font-semibold text-white sm:text-lg">
                Welcome to LeadsVero
              </h2>

              <button
                type="button"
                onClick={closeVideo}
                aria-label="Close video popup"
                className="flex h-9 w-9 items-center justify-center rounded-full text-2xl text-slate-300 transition hover:bg-slate-700 hover:text-white"
              >
                ×
              </button>
            </div>

            {/* Video */}
            <div className="relative aspect-video w-full bg-black">
              <video
                ref={videoRef}
                src="/videos/IMG_5024.mp4"
                autoPlay
                playsInline
                controls
                preload="auto"
                onEnded={closeVideo}
                onPlay={() => setNeedsSoundClick(false)}
                className="h-full w-full object-contain"
              >
                Your browser does not support the video tag.
              </video>

              {/* Enable sound if autoplay is blocked */}
              {needsSoundClick && (
                <button
                  type="button"
                  onClick={enableSound}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400 px-6 py-3 font-semibold text-black shadow-lg transition hover:bg-lime-300"
                >
                  🔊 Play with Sound
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Existing Home Page */}
      <main>
        <Header />
        <Hero />
        <LeadPacks />
        <MarqueeBanner />
        <ProcessSection />
        <EntrepreneursSection />
        <CareerPathsSection />
        <WhyUsSection />
        <FaqSection />
        <ContactAndFooter />
      </main>
    </>
  );
}
