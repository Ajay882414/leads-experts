"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Lock,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Pin,
  FileText,
  Video,
  Mic,
  ExternalLink,
  Clock,
  Layers,
} from "lucide-react";
import {
  getSecretGrowthHubFeed,
  HubPost,
} from "@/services/secretGrowthHubApi";

export default function UserSecretGrowthHubPage() {
  const [loading, setLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [posts, setPosts] = useState<HubPost[]>([]);

  // Backend API URL for uploaded static files
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
    "http://localhost:5000";

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        const data = await getSecretGrowthHubFeed();
        setIsUnlocked(Boolean(data.isUnlocked));
        setPosts(data.posts || []);
      } catch (err) {
        console.error("Failed to load hub feed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  if (loading) {
    return (
      <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6">
        <div className="h-28 rounded-3xl bg-slate-100 animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-56 rounded-3xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // ========================================================
  // 1. LOCKED VIEW (User Has NOT Placed 1st Order)
  // ========================================================
  if (!isUnlocked) {
    return (
      <div className="p-4 sm:p-8 max-w-3xl mx-auto flex items-center justify-center min-h-[75vh]">
        <div className="relative overflow-hidden rounded-[32px] border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/80 p-8 sm:p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.06)] space-y-6 w-full">
          {/* Lock Icon */}
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-50 border border-amber-200/80 text-amber-600 shadow-inner">
            <Lock size={36} />
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-white"></span>
            </span>
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              <Sparkles size={12} className="text-amber-500" /> Exclusive VIP Vault
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Secret Growth Hub is Locked
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Yeh private hub sirf verified buyers ke liye unlock hota hai. Yahan daily secret training sessions, private voice pitches, PDF closing scripts aur direct WhatsApp community links share hote hain.
            </p>
          </div>

          {/* Benefits List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto text-left pt-2">
            <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-100 shadow-2xs text-xs font-medium text-slate-700">
              <ShieldCheck size={16} className="text-[#0c4731] shrink-0" />
              <span>Private WhatsApp / Community Groups</span>
            </div>
            <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-100 shadow-2xs text-xs font-medium text-slate-700">
              <ShieldCheck size={16} className="text-[#0c4731] shrink-0" />
              <span>High-Converting Call Strategy Videos</span>
            </div>
            <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-100 shadow-2xs text-xs font-medium text-slate-700">
              <ShieldCheck size={16} className="text-[#0c4731] shrink-0" />
              <span>Tested Objection Handling Voice Notes</span>
            </div>
            <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-slate-100 shadow-2xs text-xs font-medium text-slate-700">
              <ShieldCheck size={16} className="text-[#0c4731] shrink-0" />
              <span>Free Closing PDF Frameworks</span>
            </div>
          </div>

          {/* Call to Action Button */}
          <div className="pt-4">
            <Link
              href="/browse-leads"
              className="inline-flex items-center gap-2.5 rounded-2xl bg-[#0c4731] hover:bg-[#083021] text-white px-7 py-3.5 text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-md shadow-emerald-950/20"
            >
              <ShoppingBag size={16} className="text-[#a3e635]" />
              <span>Place 1st Order to Unlock Hub</span>
              <ArrowRight size={14} />
            </Link>
            <p className="text-[11px] text-slate-400 mt-2.5">
              Koi bhi lead package purchase karte hi ye vault permanently unlock ho jayega.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // 2. UNLOCKED VIEW (Active Buyer)
  // ========================================================
  return (
    <div className="pt-20 sm:pt-20 max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#0c4731] to-[#12573d] p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 space-y-2 max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-[#a3e635] backdrop-blur-md">
            <Sparkles size={12} /> VIP Buyer Access Unlocked
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Secret Growth Hub
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Aapka exclusive private channel. Yahan daily practical call recordings, video masterclasses, scripts aur direct community channels post kiye jaate hain.
          </p>
        </div>
      </div>

      {/* Posts Feed */}
      {posts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-dashed border-slate-200 bg-white">
          <Layers size={28} className="mx-auto text-slate-300 mb-2" />
          <p className="text-sm font-semibold text-slate-700">No updates yet</p>
          <p className="text-xs text-slate-400 mt-1">
            Naye sessions aur resources jald hi yahan publish honge.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {posts.map((post) => {
            const fullFileUrl = post.fileUrl ? `${API_URL}${post.fileUrl}` : "";

            return (
              <div
                key={post._id}
                className="relative rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                {/* Post Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-emerald-50 text-[#0c4731] border border-emerald-200/60 font-bold text-[10px] uppercase px-2.5 py-0.5 tracking-wider">
                      {post.postType}
                    </span>
                    {post.isPinned && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200/70">
                        <Pin size={11} className="fill-amber-600" /> Pinned
                      </span>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock size={12} />
                    {new Date(post.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* Message Content */}
                {post.content && (
                  <p className="text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                    {post.content}
                  </p>
                )}

                {/* Media Players & Documents */}
                {post.postType === "IMAGE" && fullFileUrl && (
                  <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
                    <img
                      src={fullFileUrl}
                      alt={post.fileName || "Hub attachment"}
                      className="w-full max-h-[460px] object-contain rounded-2xl"
                    />
                  </div>
                )}

                {post.postType === "VIDEO" && fullFileUrl && (
                  <div className="rounded-2xl overflow-hidden border border-slate-200 bg-black shadow-sm">
                    <video
                      src={fullFileUrl}
                      controls
                      className="w-full max-h-[460px]"
                      preload="metadata"
                    />
                  </div>
                )}

                {post.postType === "AUDIO" && fullFileUrl && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700">
                      <Mic size={20} />
                    </div>
                    <audio src={fullFileUrl} controls className="w-full" />
                  </div>
                )}

                {post.postType === "PDF" && fullFileUrl && (
                  <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2.5 rounded-xl bg-amber-200/80 text-amber-800 shrink-0">
                        <FileText size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                          {post.fileName || "Exclusive Guide.pdf"}
                        </p>
                        <p className="text-[11px] text-amber-800/80 mt-0.5">
                          PDF Document Resource
                        </p>
                      </div>
                    </div>

                    <a
                      href={fullFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold shadow-xs shrink-0"
                    >
                      <span>Download / View PDF</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                )}

                {/* External Action Button (WhatsApp, Community, Zoom) */}
                {post.externalLink && (
                  <div className="pt-2">
                    <a
                      href={post.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#0c4731] hover:bg-[#083021] text-white px-5 py-2.5 text-xs font-bold transition-all active:scale-95 shadow-sm"
                    >
                      <span>{post.buttonText || "Open Link"}</span>
                      <ExternalLink size={13} className="text-[#a3e635]" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}