"use client";

import { FileSpreadsheet, Lock, Sparkles, CheckCircle2 } from "lucide-react";

export default function LeadAnatomyPreview() {
  const sampleLeads = [
    { name: "Rahul S.", phone: "+91 98201 •••••", age: "28", city: "Mumbai, MH", source: "Instagram Reel DM" },
    { name: "Priya V.", phone: "+91 97114 •••••", age: "32", city: "Delhi, DL", source: "Facebook Ad Click" },
    { name: "Amit K.", phone: "+91 98860 •••••", age: "35", city: "Bengaluru, KA", source: "LinkedIn InMail Lead" },
  ];

  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#eef7ee] border border-[#d6ecd6] text-[#0c4731] text-[11px] font-normal mb-1">
            <FileSpreadsheet size={12} />
            <span>CSV Data Preview</span>
          </div>
          <h3 className="text-lg sm:text-xl font-normal text-slate-900 tracking-tight">
            What Data You Receive in Each CSV Batch
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-normal">
          <Lock size={13} className="text-emerald-700" />
          <span>Full phone numbers revealed immediately after purchase</span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-100">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#f8fafc] text-slate-500 font-normal uppercase text-[10px] tracking-wider border-b border-slate-100">
            <tr>
              <th className="px-4 py-3">Lead Contact</th>
              <th className="px-4 py-3">Phone Number</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Acquisition Point</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {sampleLeads.map((lead, idx) => (
              <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-4 py-3 font-normal text-slate-900">{lead.name}</td>
                <td className="px-4 py-3 font-mono font-normal text-[#0c4731]">{lead.phone}</td>
                <td className="px-4 py-3 font-normal">{lead.age}</td>
                <td className="px-4 py-3 font-normal">{lead.city}</td>
                <td className="px-4 py-3 font-normal flex items-center gap-1.5 text-slate-500">
                  <CheckCircle2 size={12} className="text-emerald-600" /> {lead.source}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}