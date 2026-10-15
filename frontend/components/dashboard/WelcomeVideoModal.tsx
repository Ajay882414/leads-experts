
"use client";

import { useState, useRef, useEffect } from "react";

interface WelcomeVideoModalProps {
  videoSrc?: string;
}

export default function WelcomeVideoModal({
  videoSrc = "/videos/IMG_5024.mp4",
}: WelcomeVideoModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;

    const playVideo = async () => {
      try {
        await video.play();
        setNeedsInteraction(false);
      } catch {
        // Browser ne autoplay with sound block kar diya.
        setNeedsInteraction(true);
      }
    };

    void playVideo();
  }, [videoSrc]);

  const handleEnableSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = false;
      video.volume = 1;
      setIsMuted(false);

      await video.play();
      setNeedsInteraction(false);
    } catch {
      setNeedsInteraction(true);
    }
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;

    if (!nextMuted) {
      video.volume = 1;
    }

    setIsMuted(nextMuted);
  };

  const handleClose = () => {
    videoRef.current?.pause();
    setIsOpen(false);
  };

  const handleVideoEnded = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-700 bg-[#0f172a] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700 bg-[#1e293b] px-4 py-3">
          <span className="text-sm font-semibold tracking-wide text-white">
            Welcome to LeadsVero
          </span>

          <button
            onClick={handleClose}
            aria-label="Close welcome video"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Video Player */}
        <div className="relative flex aspect-video w-full items-center justify-center bg-black">
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted={isMuted}
            playsInline
            controls
            preload="auto"
            onEnded={handleVideoEnded}
            onVolumeChange={(event) => {
              setIsMuted(event.currentTarget.muted);
            }}
            onPlay={() => setNeedsInteraction(false)}
            className="h-full w-full object-contain"
          >
            Your browser does not support the video tag.
          </video>

          {/* Sound enable button: shown if autoplay with sound is blocked */}
          {needsInteraction && (
            <button
              onClick={handleEnableSound}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400 px-6 py-3 font-semibold text-black shadow-lg transition hover:bg-lime-300"
            >
              🔊 Play with Sound
            </button>
          )}

          {/* Sound toggle */}
          <button
            onClick={handleToggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="absolute right-4 top-4 rounded-full bg-black/70 px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
          >
            {isMuted ? "🔇 Unmute" : "🔊 Sound On"}
          </button>
        </div>
      </div>
    </div>
  );
}
