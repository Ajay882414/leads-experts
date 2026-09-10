interface OrderHeaderProps {
  totalOrders?: number;
}

export default function OrderHeader({
  totalOrders,
}: OrderHeaderProps) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Orders
        </h1>

        <p className="mt-1 text-gray-500">
          Manage customer lead purchases and orders
        </p>
      </div>

      {typeof totalOrders === "number" && (
        <div className="rounded-xl bg-blue-50 px-4 py-2">
          <span className="text-sm text-blue-600">
            Total Orders
          </span>

          <span className="ml-2 font-bold text-blue-700">
            {totalOrders}
          </span>
        </div>
      )}
    </div>
  );
}