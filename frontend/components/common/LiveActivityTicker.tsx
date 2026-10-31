"use client";

import React, { useEffect, useState, useRef } from "react";
import { ShoppingBag, UserCheck, Download, Users, X } from "lucide-react";

interface ActivityItem {
  id: string;
  name: string;
  location: string;
  action: string;
  detail: string;
  type: "purchase" | "signup" | "download" | "referral";
}

const ACTIVITIES_POOL: ActivityItem[] = [
  {
    id: "act-1",
    name: "Rahul S.",
    location: "Delhi",
    action: "purchased",
    detail: "50 Affiliate Marketing Leads",
    type: "purchase",
  },
  {
    id: "act-2",
    name: "Priya M.",
    location: "Mumbai",
    action: "purchased",
    detail: "100 Network Marketing Leads",
    type: "purchase",
  },
  {
    id: "act-3",
    name: "Vikram K.",
    location: "Jaipur",
    action: "downloaded",
    detail: "Verified Leads CSV",
    type: "download",
  },
  {
    id: "act-4",
    name: "Sneha D.",
    location: "Lucknow",
    action: "just created an account from",
    detail: "Direct Selling",
    type: "signup",
  },
  {
    id: "act-5",
    name: "Arun V.",
    location: "Ahmedabad",
    action: "joined via Referral Partner",
    detail: "FARHAN10",
    type: "referral",
  },
  {
    id: "act-6",
    name: "Amit P.",
    location: "Pune",
    action: "purchased",
    detail: "80 Direct Selling Leads",
    type: "purchase",
  },
  {
    id: "act-7",
    name: "Neha T.",
    location: "Indore",
    action: "downloaded",
    detail: "Order #LV-8924 Leads",
    type: "download",
  },
  {
    id: "act-8",
    name: "Rohan B.",
    location: "Bengaluru",
    action: "purchased",
    detail: "30 Affiliate Marketing Leads",
    type: "purchase",
  },
  {
    id: "act-9",
    name: "Kavita R.",
    location: "Bhopal",
    action: "joined via Referral Partner",
    detail: "ARIFA10",
    type: "referral",
  },
  {
    id: "act-10",
    name: "Mohit J.",
    location: "Surat",
    action: "just created an account from",
    detail: "Network Marketing",
    type: "signup",
  },
];

export default function LiveActivityTicker() {
  const [currentActivity, setCurrentActivity] = useState<ActivityItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [timeAgo, setTimeAgo] = useState("Just now");
  const [dismissed, setDismissed] = useState(false);

  // Queue references to avoid repeating entries
  const queueRef = useRef<ActivityItem[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const shuffleArray = (array: ActivityItem[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const getNextActivity = (): ActivityItem => {
    if (queueRef.current.length === 0) {
      queueRef.current = shuffleArray(ACTIVITIES_POOL);
    }
    return queueRef.current.shift()!;
  };

  const getRandomTimeAgo = () => {
    const minutes = Math.floor(Math.random() * 8) + 1;
    return minutes === 1 ? "1 min ago" : `${minutes} mins ago`;
  };

  const showNext = () => {
    if (dismissed) return;

    const nextItem = getNextActivity();
    setCurrentActivity(nextItem);
    setTimeAgo(getRandomTimeAgo());
    setIsVisible(true);

    // Display for 5 seconds, then hide
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);

      // Random wait between 9s and 16s before showing the next one
      const nextDelay = Math.floor(Math.random() * 7000) + 9000;
      timeoutRef.current = setTimeout(showNext, nextDelay);
    }, 5000);
  };

  useEffect(() => {
    queueRef.current = shuffleArray(ACTIVITIES_POOL);

    // First popup after 4 seconds on page load
    const initialTimer = setTimeout(showNext, 4000);

    return () => {
      clearTimeout(initialTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [dismissed]);

  if (dismissed || !currentActivity) return null;

  const renderIcon = () => {
    switch (currentActivity.type) {
      case "purchase":
        return (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#0c4731] border border-emerald-100">
            <ShoppingBag size={17} className="text-[#0c4731]" />
          </div>
        );
      case "download":
        return (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 border border-teal-100">
            <Download size={17} className="text-teal-700" />
          </div>
        );
      case "referral":
        return (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
            <Users size={17} className="text-blue-700" />
          </div>
        );
      case "signup":
      default:
        return (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-100">
            <UserCheck size={17} className="text-amber-700" />
          </div>
        );
    }
  };

  return (
    <div
      className={`fixed z-40 transition-all duration-500 ease-out pointer-events-auto
        /* Mobile: Centered near bottom above navigation */
        bottom-4 left-3 right-3 sm:right-auto sm:left-6 sm:bottom-6 sm:max-w-[360px]
        ${
          isVisible
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-6 opacity-0 scale-95 pointer-events-none"
        }
      `}
    >
      <div className="relative flex items-center gap-3 rounded-2xl bg-white p-3.5 sm:p-4 shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-slate-100/90 backdrop-blur-sm">
        {/* Pulsing Live indicator */}
        <span className="absolute -top-1.5 -left-1.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>

        {/* Dynamic Category Icon */}
        {renderIcon()}

        {/* Text Block */}
        <div className="flex-1 min-w-0 pr-4">
          <p className="text-[12px] sm:text-[13px] font-semibold text-slate-800 leading-snug truncate">
            {currentActivity.name}{" "}
            <span className="font-normal text-slate-500">
              ({currentActivity.location})
            </span>
          </p>
          <p className="text-[11px] sm:text-[12px] text-slate-600 leading-tight truncate mt-0.5">
            {currentActivity.action}{" "}
            <span className="font-semibold text-slate-900">
              {currentActivity.detail}
            </span>
          </p>
          <p className="text-[10px] text-slate-400 font-medium mt-1">
            {timeAgo} • <span className="text-emerald-700 font-semibold">Verified</span>
          </p>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={() => {
            setIsVisible(false);
            setDismissed(true);
          }}
          className="absolute top-2.5 right-2.5 text-slate-300 hover:text-slate-600 transition-colors p-1"
          aria-label="Close notification"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}