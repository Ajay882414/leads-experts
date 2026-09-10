interface OrderStatusBadgeProps {
  status: string;
}

export default function OrderStatusBadge({
  status,
}: OrderStatusBadgeProps) {
  const normalizedStatus =
    status?.toLowerCase() || "unknown";

  const getClasses = () => {
    switch (normalizedStatus) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";

      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";

      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";

      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${getClasses()}`}
    >
      {status || "Unknown"}
    </span>
  );
}