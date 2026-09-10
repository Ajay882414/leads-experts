export default function OrderEmpty() {
  return (
    <div className="rounded-2xl bg-white p-12 text-center shadow">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <span className="text-2xl">
          📦
        </span>
      </div>

      <h2 className="text-2xl font-bold text-gray-900">
        No Orders Found
      </h2>

      <p className="mt-2 text-gray-500">
        There are no orders matching your search or filter.
      </p>
    </div>
  );
}