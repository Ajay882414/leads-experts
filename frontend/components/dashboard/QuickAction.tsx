import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  title: string;
  href: string;
  icon: ReactNode;
}

export default function QuickAction({
  title,
  href,
  icon,
}: Props) {
  return (
    <Link
      href={href}
      className="bg-white border rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
    >
      <div>{icon}</div>

      <p className="mt-3 font-semibold">
        {title}
      </p>
    </Link>
  );
}