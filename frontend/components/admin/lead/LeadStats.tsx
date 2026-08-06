"use client";

interface Props {
  stats: {
    totalLeads: number;
    availableLeads: number;
    soldLeads: number;
    reservedLeads: number;
  };
}

export default function LeadStats({
  stats,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      <div className="bg-white rounded-xl shadow p-6">

        <p className="text-gray-500">
          Total Leads
        </p>

        <h2 className="text-4xl font-bold mt-3">
          {stats.totalLeads}
        </h2>

      </div>

      <div className="bg-green-50 rounded-xl shadow p-6">

        <p className="text-green-700">
          Available
        </p>

        <h2 className="text-4xl font-bold mt-3 text-green-700">
          {stats.availableLeads}
        </h2>

      </div>

      <div className="bg-blue-50 rounded-xl shadow p-6">

        <p className="text-blue-700">
          Sold
        </p>

        <h2 className="text-4xl font-bold mt-3 text-blue-700">
          {stats.soldLeads}
        </h2>

      </div>

      <div className="bg-yellow-50 rounded-xl shadow p-6">

        <p className="text-yellow-700">
          Reserved
        </p>

        <h2 className="text-4xl font-bold mt-3 text-yellow-700">
          {stats.reservedLeads}
        </h2>

      </div>

    </div>
  );
}