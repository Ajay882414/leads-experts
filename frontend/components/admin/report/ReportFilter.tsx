"use client";

interface Props {
  value: string;
  onChange: (
    value: string
  ) => void;
}

export default function ReportFilter({
  value,
  onChange,
}: Props) {

  return (
    <div className="flex justify-end">

      <select
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="border rounded-lg px-4 py-2"
      >

        <option value="dashboard">
          Dashboard
        </option>

        <option value="sales">
          Sales
        </option>

        <option value="platforms">
          Platforms
        </option>

        <option value="users">
          Users
        </option>

        <option value="orders">
          Orders
        </option>

        <option value="downloads">
          Downloads
        </option>

      </select>

    </div>
  );
}