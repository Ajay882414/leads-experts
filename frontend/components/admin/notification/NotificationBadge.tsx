interface Props {
  type: string;
}

export default function NotificationBadge({
  type,
}: Props) {

  let classes =
    "bg-gray-100 text-gray-700";

  switch (type) {

    case "User":
      classes =
        "bg-blue-100 text-blue-700";
      break;

    case "Lead":
      classes =
        "bg-green-100 text-green-700";
      break;

    case "Platform":
      classes =
        "bg-purple-100 text-purple-700";
      break;

    case "Order":
      classes =
        "bg-orange-100 text-orange-700";
      break;

    default:
      classes =
        "bg-gray-100 text-gray-700";
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${classes}`}
    >
      {type}
    </span>
  );
}