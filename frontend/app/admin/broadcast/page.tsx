"use client";

import { useState } from "react";
import axios from "axios";
import { Mail, Send, CheckCircle2, AlertCircle, User, Users } from "lucide-react";

export default function AdminBroadcastPage() {
  const [sendMode, setSendMode] = useState<"bulk" | "single">("bulk");
  const [singleEmail, setSingleEmail] = useState("");
  const [audience, setAudience] = useState("all");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject.trim() || !message.trim()) {
      setFeedback({ type: "error", text: "Subject aur message dono likhna zaroori hai." });
      return;
    }

    if (sendMode === "single" && !singleEmail.trim()) {
      setFeedback({ type: "error", text: "Kripya user ki email ID likhein." });
      return;
    }

    const confirmText =
      sendMode === "single"
        ? `Kya aap "${singleEmail}" ko yeh email bhejna chahte hain?`
        : "Kya aap sabhi users ko bulk email bhejna chahte hain?";

    if (!window.confirm(confirmText)) return;

    try {
      setLoading(true);
      setFeedback(null);

      const rawBase = (process.env.NEXT_PUBLIC_API_URL || "").trim();
      const baseUrl = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;
      const cleanEndpoint = baseUrl.endsWith("/api")
        ? `${baseUrl}/admin/broadcast-email`
        : `${baseUrl}/api/admin/broadcast-email`;

      const res = await axios.post(
        cleanEndpoint,
        {
          sendMode,
          singleEmail,
          audience,
          subject,
          message,
        },
        { withCredentials: true }
      );

      if (res.data?.success) {
        setFeedback({
          type: "success",
          text: res.data.message || "Email kamyabi ke sath bhej diya gaya!",
        });
        setSubject("");
        setMessage("");
        if (sendMode === "single") setSingleEmail("");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setFeedback({
          type: "error",
          text: err.response?.data?.message || "Email send karne me error aaya.",
        });
      } else {
        setFeedback({ type: "error", text: "Unexpected error occurred." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Mail className="h-6 w-6 text-emerald-600" />
            Send Custom Email
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Bulk ya kisi single user ko custom message direct noreply@leadsvero.com se bhejein.
          </p>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-center gap-2.5 text-sm font-medium ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSend} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        
        {/* Mode Selector Tabs: Bulk vs Single */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5">
            Sending Mode
          </label>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            <button
              type="button"
              onClick={() => setSendMode("bulk")}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold border transition cursor-pointer ${
                sendMode === "bulk"
                  ? "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Users className="h-4 w-4" />
              Bulk Users
            </button>

            <button
              type="button"
              onClick={() => setSendMode("single")}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold border transition cursor-pointer ${
                sendMode === "single"
                  ? "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <User className="h-4 w-4" />
              Single User
            </button>
          </div>
        </div>

        {/* Dynamic Input based on Mode */}
        {sendMode === "single" ? (
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              User Email Address
            </label>
            <input
              type="email"
              required
              placeholder="e.g. user@example.com"
              value={singleEmail}
              onChange={(e) => setSingleEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 font-medium"
            />
          </div>
        ) : (
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Bulk Audience
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="audience"
                  value="all"
                  checked={audience === "all"}
                  onChange={(e) => setAudience(e.target.value)}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                All Active Users
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="audience"
                  value="verified"
                  checked={audience === "verified"}
                  onChange={(e) => setAudience(e.target.value)}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                Verified Users Only
              </label>
            </div>
          </div>
        )}

        {/* Subject */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Email Subject
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Account update ya Special Offer..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 font-medium"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Message Body
          </label>
          <textarea
            required
            rows={7}
            placeholder="Apna email message yahan likhein..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 font-normal leading-relaxed"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0c4731] hover:bg-[#083021] text-white px-6 py-3 text-sm font-bold transition active:scale-95 disabled:opacity-50 cursor-pointer shadow-sm"
          >
            {loading ? (
              <span>Sending...</span>
            ) : (
              <>
                <Send className="h-4 w-4 text-[#a3e635]" />
                <span>{sendMode === "single" ? "Send to User" : "Send Bulk Broadcast"}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}