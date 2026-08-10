interface Props {
  title: string;
  value: string | number | boolean;
}

export default function SettingCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h3 className="text-gray-500 text-sm font-medium">
        {title}
      </h3>

      <p className="mt-3 text-2xl font-bold">

        {typeof value === "boolean"
          ? value
            ? "Enabled"
            : "Disabled"
          : value || "-"}

      </p>

    </div>
  );
}