import Link from "next/link";

interface Props {
  title: string;
  leads: number;
}

export default function PlatformCard({
  title,
  leads,
}: Props) {
  return (
    <Link
      href="/browse-leads"
      className="bg-white border rounded-2xl p-6 hover:shadow-lg transition-all"
    >
      <h2 className="text-xl font-bold">
        {title}
      </h2>

      <p className="text-gray-500 mt-2">
        Available Leads
      </p>

      <h3 className="text-3xl font-bold mt-3">
        {leads}
      </h3>

      <button className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-xl">
        View
      </button>
    </Link>
  );
}