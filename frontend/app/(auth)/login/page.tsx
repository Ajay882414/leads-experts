"use client";

import { useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const { login } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await login(formData);

      alert("Login Successful");

      // jis page se login par aaya tha
      const redirect =
        searchParams.get("redirect");

      // Admin user
      if (redirect) {
        router.replace(redirect);
        return;
      }

      // Default Routing
      if (res.user.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/dashboard");
      }
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20">

      <h1 className="text-3xl font-bold mb-8">
        Login
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-3 w-full rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-3 w-full rounded-lg"
        />

        <button
          disabled={loading}
          className="bg-black text-white w-full py-3 rounded-lg"
        >
          {loading
            ? "Please Wait..."
            : "Login"}
        </button>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() =>
              router.push(
                "/forgot-password"
              )
            }
            className="text-blue-600 text-sm hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
}