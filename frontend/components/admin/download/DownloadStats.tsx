interface Props {
  stats: {
    totalDownloads: number;
    totalLeads: number;
  };
}

export default function DownloadStats({
  stats,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-6">

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-gray-500">
          Total Downloads
        </h2>

        <p className="text-3xl font-bold mt-2">
          {stats.totalDownloads}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-gray-500">
          Total Leads Downloaded
        </h2>

        <p className="text-3xl font-bold mt-2">
          {stats.totalLeads}
        </p>
      </div>

    </div>
  );
}