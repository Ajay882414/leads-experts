interface Props {
  status: string;
}

export default function OrderStatusBadge({
  status,
}: Props) {
  const getClasses = () => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${getClasses()}`}
    >
      {status}
    </span>
  );
}