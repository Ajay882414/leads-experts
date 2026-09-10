export default function BrowseLeadsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-64 rounded-xl bg-gray-200" />
      <div className="h-5 w-96 max-w-full rounded-lg bg-gray-100" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
          >
            <div className="h-36 bg-gray-200" />
            <div className="space-y-4 p-5">
              <div className="h-5 w-32 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-100" />
              <div className="flex justify-between items-center pt-2">
                <div className="h-8 w-24 rounded bg-gray-200" />
                <div className="h-10 w-28 rounded-xl bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}