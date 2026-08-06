"use client";

interface Props {
  leads: any[];
}

export default function RecentLeads({
  leads,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow border">

      <div className="p-5 border-b">

        <h2 className="text-xl font-bold">
          Recent Leads
        </h2>

      </div>

      <div className="divide-y">

        {leads.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No Leads Found
          </div>
        ) : (
          leads.map((lead) => (
            <div
              key={lead._id}
              className="p-5 flex justify-between items-center"
            >
              <div>

                <h3 className="font-semibold">
                  {lead.fullName}
                </h3>

                <p className="text-sm text-gray-500">
                  {lead.email}
                </p>

              </div>

              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                {lead.platform?.name}
              </span>

            </div>
          ))
        )}

      </div>

    </div>
  );
}