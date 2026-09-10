"use client";

interface Props {
  stats: {
    totalLeads: number;
    availableLeads: number;
    soldLeads: number;
    reservedLeads: number;
  };

  loading?: boolean;
}

export default function LeadStats({
  stats,
  loading = false,
}: Props) {

  // ==========================================
  // LOADING CARD
  // ==========================================

  const StatSkeleton = () => {
    return (
      <div className="bg-white rounded-2xl shadow p-6 animate-pulse">

        <div className="h-4 bg-gray-200 rounded w-24" />

        <div className="h-10 bg-gray-200 rounded w-20 mt-4" />

      </div>
    );
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />

      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {/* =====================================
          TOTAL
      ===================================== */}

      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-gray-500 font-medium">
          Total Leads
        </p>

        <h2 className="text-4xl font-bold mt-3">
          {stats.totalLeads}
        </h2>

      </div>

      {/* =====================================
          AVAILABLE
      ===================================== */}

      <div className="bg-green-50 rounded-2xl shadow p-6">

        <p className="text-green-700 font-medium">
          Available
        </p>

        <h2 className="text-4xl font-bold mt-3 text-green-700">
          {stats.availableLeads}
        </h2>

      </div>

      {/* =====================================
          SOLD
      ===================================== */}

      <div className="bg-blue-50 rounded-2xl shadow p-6">

        <p className="text-blue-700 font-medium">
          Sold
        </p>

        <h2 className="text-4xl font-bold mt-3 text-blue-700">
          {stats.soldLeads}
        </h2>

      </div>

      {/* =====================================
          RESERVED
      ===================================== */}

      <div className="bg-yellow-50 rounded-2xl shadow p-6">

        <p className="text-yellow-700 font-medium">
          Reserved
        </p>

        <h2 className="text-4xl font-bold mt-3 text-yellow-700">
          {stats.reservedLeads}
        </h2>

      </div>

    </div>
  );
}