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
    <input
      type="text"
      placeholder="Search Customer..."
      value={search}
      onChange={(e) =>
        setSearch(
          e.target.value
        )
      }
      className="w-full border rounded-xl px-4 py-3"
    />
  );
}