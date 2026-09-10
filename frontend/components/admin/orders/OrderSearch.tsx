"use client";

interface Props {
  search: string;

  setSearch: (
    value: string
  ) => void;
}

export default function OrderSearch({
  search,
  setSearch,
}: Props) {
  return (
    <div className="w-full">

      <input
        type="text"
        placeholder="Search customer, email, platform or order ID..."
        value={search}
        onChange={(event) =>
          setSearch(
            event.target.value
          )
        }
        className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
}