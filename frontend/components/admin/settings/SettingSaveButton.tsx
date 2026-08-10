interface Props {
  loading: boolean;
}

export default function SettingSaveButton({
  loading,
}: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
    >
      {loading
        ? "Saving..."
        : "Save Settings"}
    </button>
  );
}