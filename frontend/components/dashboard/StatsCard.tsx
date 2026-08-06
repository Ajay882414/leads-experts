import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

export default function StatsCard({
  title,
  value,
  icon,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition-all">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
          {icon}
        </div>

      </div>

    </div>
  );
}