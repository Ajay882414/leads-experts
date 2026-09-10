"use client";

import { useState } from "react";
import { Download, FileSpreadsheet, Calendar, CheckCircle2 } from "lucide-react";
import { Download as DownloadType } from "@/types/download";
import { triggerCsvDownload } from "@/services/downloadApi";

interface DownloadCardProps {
  item: DownloadType;
}

export default function DownloadCard({ item }: DownloadCardProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await triggerCsvDownload(item.order._id, item.platform?.name || "leads");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to download CSV file.");
    } finally {
      setDownloading(false);
    }
  };

  const formattedDate = new Date(
    item.downloadedAt || Date.now()
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="group rounded-[26px] border border-slate-200/80 bg-white p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        {/* Left Section: Info */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef7ee] text-[#0c4731] border border-[#d6ecd6] shadow-inner">
            <FileSpreadsheet size={22} className="stroke-[1.8]" />
          </div>

          <div className="min-w-0">
            <h3 className="font-normal text-slate-900 text-sm sm:text-base tracking-tight truncate">
              {item.platform?.name || "Platform"} Leads
            </h3>

            <div className="flex flex-wrap items-center gap-3.5 mt-1.5 text-xs text-slate-500 font-normal">
              <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100">
                <CheckCircle2 size={13} className="text-emerald-600" />
                {item.totalLeads} Leads
              </span>

              <span className="flex items-center gap-1 text-slate-400">
                <Calendar size={13} />
                {formattedDate}
              </span>

              <span className="font-mono text-slate-400">
                Order #{item.order?._id?.slice(-6).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Button */}
        <div className="flex items-center justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
          <button
            type="button"
            disabled={downloading}
            onClick={handleDownload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0c4731] hover:bg-[#083021] active:scale-95 px-5 py-2.5 text-xs sm:text-sm font-normal text-white transition-all disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed shadow-sm shadow-emerald-950/10 cursor-pointer"
          >
            <Download size={14} className="text-[#a3e635]" />
            <span>{downloading ? "Preparing File..." : "Download CSV"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}