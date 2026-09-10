export default function OrderLoading() {
  return (
    <div className="rounded-2xl bg-white p-12 text-center shadow">
      <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

      <p className="text-lg font-semibold text-gray-800">
        Loading Orders...
      </p>

      <p className="mt-1 text-sm text-gray-500">
        Please wait while orders are being loaded.
      </p>
    </div>
  );
}