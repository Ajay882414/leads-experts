interface OrderStatsProps {
  stats: {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    cancelledOrders: number;
  };
}

export default function OrderStats({
  stats,
}: OrderStatsProps) {
  const cards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      wrapper: "bg-white",
      text: "text-gray-500",
    },
    {
      title: "Pending",
      value: stats.pendingOrders,
      wrapper: "bg-yellow-50",
      text: "text-yellow-700",
    },
    {
      title: "Completed",
      value: stats.completedOrders,
      wrapper: "bg-green-50",
      text: "text-green-700",
    },
    {
      title: "Cancelled",
      value: stats.cancelledOrders,
      wrapper: "bg-red-50",
      text: "text-red-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-2xl p-5 shadow ${card.wrapper}`}
        >
          <p className={`text-sm font-medium ${card.text}`}>
            {card.title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}