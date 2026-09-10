"use client";

import { SearchX } from "lucide-react";

interface EmptyLeadsProps {
  title?: string;
  message?: string;
  onReset?: () => void;
}

export default function EmptyLeads({
  title = "No Platforms Available",
  message = "There are currently no active platforms matching your criteria.",
  onReset,
}: EmptyLeadsProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <SearchX size={28} className="text-gray-500" />
      </div>
      <h2 className="mt-5 text-xl font-bold text-gray-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
        {message}
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Reset Search
        </button>
      )}
    </div>
  );
}