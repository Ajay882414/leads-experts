"use client";

import { useEffect, useState } from "react";

import { getSettings } from "@/services/settingApi";

import SettingForm from "@/components/admin/settings/SettingForm";
import SettingLoading from "@/components/admin/settings/SettingLoading";

export default function SettingsPage() {
  const [settings, setSettings] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);

      const res =
        await getSettings();

      if (res.success) {
        setSettings(
          res.settings
        );
      } else {
        setError(
          "Failed to load settings."
        );
      }
    } catch (error: any) {
      console.log(error);

      setError(
        error?.response?.data
          ?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <SettingLoading />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h2 className="text-red-600 font-semibold text-lg">
          Error
        </h2>

        <p className="text-red-500 mt-2">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your website settings
        </p>

      </div>

      {/* Form */}

      {settings ? (
        <SettingForm
          settings={settings}
        />
      ) : (
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6">

          <h2 className="font-semibold text-yellow-700">
            No Settings Found
          </h2>

          <p className="text-yellow-600 mt-2">
            Please create website settings first.
          </p>

        </div>
      )}

    </div>
  );
}