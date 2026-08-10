interface Props {
  report: {
    totalUsers: number;
    totalPlatforms: number;
    totalLeads: number;
    totalOrders: number;
    totalDownloads: number;
    totalRevenue: number;
  };
}

export default function ReportCards({
  report,
}: Props) {
  const cards = [
    {
      title: "Users",
      value: report.totalUsers,
    },
    {
      title: "Platforms",
      value: report.totalPlatforms,
    },
    {
      title: "Leads",
      value: report.totalLeads,
    },
    {
      title: "Orders",
      value: report.totalOrders,
    },
    {
      title: "Downloads",
      value: report.totalDownloads,
    },
    {
      title: "Revenue",
      value: `₹${report.totalRevenue}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {cards.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-xl shadow p-6"
        >
          <h3 className="text-gray-500">
            {item.title}
          </h3>

          <h2 className="text-3xl font-bold mt-3">
            {item.value}
          </h2>
        </div>
      ))}
    </div>
  );
}