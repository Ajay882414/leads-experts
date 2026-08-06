"use client";

import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <Link
          href="/admin/platforms/create"
          className="bg-blue-600 text-white rounded-xl py-4 text-center"
        >
          Add Platform
        </Link>

        <Link
          href="/admin/leads/create"
          className="bg-green-600 text-white rounded-xl py-4 text-center"
        >
          Add Lead
        </Link>

        <Link
          href="/admin/leads/uploads"
          className="bg-purple-600 text-white rounded-xl py-4 text-center"
        >
          Upload CSV
        </Link>

        <Link
          href="/admin/users"
          className="bg-orange-600 text-white rounded-xl py-4 text-center"
        >
          Users
        </Link>

      </div>

    </div>
  );
}