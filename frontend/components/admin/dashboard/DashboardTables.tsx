"use client";

import RecentUsers from "./RecentUsers";
import RecentLeads from "./RecentLeads";

interface Props {
  users: any[];
  leads: any[];
}

export default function DashboardTables({
  users,
  leads,
}: Props) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      <RecentUsers
        users={users}
      />

      <RecentLeads
        leads={leads}
      />

    </div>
  );
}