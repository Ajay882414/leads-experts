interface Props {
  status: string;
}

export default function PaymentStatusBadge({
  status,
}: Props) {
  let classes =
    "bg-gray-100 text-gray-700";

  if (status === "Paid") {
    classes =
      "bg-green-100 text-green-700";
  }

  if (status === "Pending") {
    classes =
      "bg-yellow-100 text-yellow-700";
  }

  if (status === "Failed") {
    classes =
      "bg-red-100 text-red-700";
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${classes}`}
    >
      {status}
    </span>
  );
}