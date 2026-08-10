interface Props {
  platforms: any[];
}

export default function PlatformReportTable({
  platforms,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4 text-left">
              Platform
            </th>

            <th className="text-left">
              Total
            </th>

            <th className="text-left">
              Available
            </th>

            <th className="text-left">
              Sold
            </th>

          </tr>

        </thead>

        <tbody>

          {platforms.map((item) => (

            <tr
              key={item._id}
              className="border-b"
            >

              <td className="p-4">
                {item.name}
              </td>

              <td>
                {item.totalLeads}
              </td>

              <td>
                {item.availableLeads}
              </td>

              <td>
                {item.soldLeads}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}