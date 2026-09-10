"use client";

interface UploadItem {
  _id: string;

  fileName?: string;

  totalRows?: number;

  inserted?: number;

  duplicates?: number;

  invalid?: number;

  uploadedBy?: {
    _id?: string;
    fullName?: string;
    email?: string;
  };

  platform?: {
    _id?: string;
    name?: string;
  };

  createdAt: string;
}

interface Props {
  uploads: UploadItem[];

  loading?: boolean;
}

export default function UploadHistory({
  uploads,
  loading = false,
}: Props) {

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-500">
        Loading upload history...
      </div>
    );
  }

  // ==========================================
  // EMPTY
  // ==========================================

  if (!uploads.length) {
    return (
      <div className="bg-white rounded-2xl shadow p-12 text-center">

        <div className="text-5xl mb-4">
          📂
        </div>

        <h3 className="text-xl font-bold text-gray-700">
          No Upload History
        </h3>

        <p className="text-gray-500 mt-2">
          Bulk lead uploads will appear here.
        </p>

      </div>
    );
  }

  // ==========================================
  // TABLE
  // ==========================================

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">

      <div className="p-5 border-b">

        <h2 className="text-xl font-bold">
          Upload History
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Previous bulk lead uploads
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[950px]">

          <thead className="bg-gray-50">

            <tr className="border-b">

              <th className="p-4 text-left text-sm font-semibold">
                File
              </th>

              <th className="p-4 text-left text-sm font-semibold">
                Platform
              </th>

              <th className="p-4 text-left text-sm font-semibold">
                Total
              </th>

              <th className="p-4 text-left text-sm font-semibold">
                Imported
              </th>

              <th className="p-4 text-left text-sm font-semibold">
                Duplicate
              </th>

              <th className="p-4 text-left text-sm font-semibold">
                Invalid
              </th>

              <th className="p-4 text-left text-sm font-semibold">
                Uploaded By
              </th>

              <th className="p-4 text-left text-sm font-semibold">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {uploads.map(
              (item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50"
                >

                  {/* FILE */}

                  <td className="p-4">

                    <span className="font-medium">
                      {item.fileName ||
                        "Unknown file"}
                    </span>

                  </td>

                  {/* PLATFORM */}

                  <td className="p-4">
                    {item.platform?.name ||
                      "-"}
                  </td>

                  {/* TOTAL */}

                  <td className="p-4">
                    {item.totalRows ??
                      0}
                  </td>

                  {/* INSERTED */}

                  <td className="p-4">

                    <span className="text-green-600 font-semibold">
                      {item.inserted ??
                        0}
                    </span>

                  </td>

                  {/* DUPLICATES */}

                  <td className="p-4">

                    <span className="text-orange-600 font-semibold">
                      {item.duplicates ??
                        0}
                    </span>

                  </td>

                  {/* INVALID */}

                  <td className="p-4">

                    <span className="text-red-600 font-semibold">
                      {item.invalid ??
                        0}
                    </span>

                  </td>

                  {/* USER */}

                  <td className="p-4">

                    <div>
                      <p className="font-medium">
                        {item.uploadedBy
                          ?.fullName ||
                          "-"}
                      </p>

                      {item.uploadedBy
                        ?.email && (
                        <p className="text-xs text-gray-500">
                          {
                            item
                              .uploadedBy
                              .email
                          }
                        </p>
                      )}
                    </div>

                  </td>

                  {/* DATE */}

                  <td className="p-4 whitespace-nowrap">

                    {item.createdAt
                      ? new Date(
                          item.createdAt
                        ).toLocaleString()
                      : "-"}

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}