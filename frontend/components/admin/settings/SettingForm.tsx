"use client";

import { useState } from "react";

import {
  updateSettings,
} from "@/services/settingApi";

import SettingSaveButton from "./SettingSaveButton";

export default function SettingForm({
  settings,
}: any) {

  const [form, setForm] =
    useState(settings);

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e: any
  ) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });

  };

  const handleSubmit =
    async (
      e: any
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        await updateSettings(
          form
        );

        alert(
          "Settings Updated Successfully"
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 space-y-5"
    >

      <div>

        <label className="block font-semibold mb-2">
          Website Name
        </label>

        <input
          type="text"
          name="websiteName"
          value={form.websiteName}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

      </div>

      <div>

        <label className="block font-semibold mb-2">
          Support Email
        </label>

        <input
          type="email"
          name="supportEmail"
          value={form.supportEmail}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

      </div>

      <div>

        <label className="block font-semibold mb-2">
          Support Phone
        </label>

        <input
          type="text"
          name="supportPhone"
          value={form.supportPhone}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

      </div>

      <div>

        <label className="block font-semibold mb-2">
          Currency
        </label>

        <input
          type="text"
          name="currency"
          value={form.currency}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

      </div>

      <div>

        <label className="block font-semibold mb-2">
          Currency Symbol
        </label>

        <input
          type="text"
          name="currencySymbol"
          value={form.currencySymbol}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

      </div>

      <div>

        <label className="block font-semibold mb-2">
          Company Address
        </label>

        <textarea
          rows={4}
          name="companyAddress"
          value={form.companyAddress}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

      </div>

      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          name="maintenanceMode"
          checked={form.maintenanceMode}
          onChange={handleChange}
        />

        <label>
          Maintenance Mode
        </label>

      </div>

      <SettingSaveButton
        loading={loading}
      />

    </form>

  );

}