"use client";

import LeadChart from "./LeadChart";
import PlatformChart from "./PlatformChart";

interface Props {
  leadChart: any[];
  platformChart: any[];
}

export default function DashboardCharts({
  leadChart,
  platformChart,
}: Props) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      <LeadChart
        data={leadChart}
      />

      <PlatformChart
        platforms={platformChart}
      />

    </div>
  );
}