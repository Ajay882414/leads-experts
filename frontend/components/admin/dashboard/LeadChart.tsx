"use client";

interface Props {
  data: any[];
}

export default function LeadChart({
  data,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-xl font-bold mb-6">
        Lead Status
      </h2>

      <div className="space-y-5">

        {data.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center"
          >
            <span className="font-medium">
              {item._id}
            </span>

            <span className="font-bold text-blue-600">
              {item.total}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}