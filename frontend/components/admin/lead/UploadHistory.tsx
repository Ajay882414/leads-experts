"use client";

interface Props {
  uploads: any[];
}

export default function UploadHistory({
  uploads,
}: Props) {
  if (!uploads.length) {
    return (
      <div className="bg-white rounded-2xl p-10 shadow text-center text-gray-500">
        No Upload History Found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4 text-left">
              File
            </th>

            <th className="p-4 text-left">
              Total
            </th>

            <th className="p-4 text-left">
              Imported
            </th>

            <th className="p-4 text-left">
              Duplicate
            </th>

            <th className="p-4 text-left">
              Uploaded By
            </th>

            <th className="p-4 text-left">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {uploads.map((item) => (
            <tr
              key={item._id}
              className="border-t"
            >

              <td className="p-4">
                {item.fileName}
              </td>

              <td className="p-4">
                {item.totalRows}
              </td>

              <td className="p-4 text-green-600 font-semibold">
                {item.inserted}
              </td>

              <td className="p-4 text-red-600">
                {item.duplicates}
              </td>

              <td className="p-4">
                {item.uploadedBy?.fullName}
              </td>

              <td className="p-4">
                {new Date(
                  item.createdAt
                ).toLocaleString()}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}