"use client";

interface Props {
  platforms: any[];
}

export default function PlatformChart({
  platforms,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-xl font-bold mb-6">
        Platforms
      </h2>

      <div className="space-y-4">

        {platforms.map((platform) => (
          <div
            key={platform._id}
            className="border rounded-xl p-4"
          >
            <div className="flex justify-between">

              <h3 className="font-semibold">
                {platform.name}
              </h3>

              <span className="font-bold text-blue-600">
                {platform.totalLeads}
              </span>

            </div>

            <div className="flex gap-6 mt-3 text-sm text-gray-500">

              <span>
                Available :
                {" "}
                {platform.availableLeads}
              </span>

              <span>
                Sold :
                {" "}
                {platform.soldLeads}
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}