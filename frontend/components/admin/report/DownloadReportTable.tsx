interface Props {
  downloads: any[];
}

export default function DownloadReportTable({
  downloads,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4 text-left">
              User
            </th>

            <th className="text-left">
              Platform
            </th>

            <th className="text-left">
              File
            </th>

            <th className="text-left">
              Leads
            </th>

            <th className="text-left">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {downloads.map((item) => (

            <tr
              key={item._id}
              className="border-b"
            >

              <td className="p-4">
                {item.user?.fullName}
              </td>

              <td>
                {item.platform?.name}
              </td>

              <td>
                {item.fileName}
              </td>

              <td>
                {item.totalLeads}
              </td>

              <td>
                {new Date(
                  item.createdAt
                ).toLocaleDateString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}