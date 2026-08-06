import PlatformForm from "@/components/admin/platform/PlatformForm";

export default function CreatePlatformPage() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Create Platform
        </h1>

        <p className="text-gray-500">
          Add a new platform
        </p>

      </div>

      <PlatformForm />

    </div>
  );
}