"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
export default function SignupPage() {
  const router = useRouter();

  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    platform: "",
    state: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
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

    await signup(formData);

alert("Account Created Successfully");

router.push("/login");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Signup Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20">

      <h1 className="text-3xl font-bold mb-8">
        Signup
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <select
          name="platform"
          onChange={handleChange}
          className="border p-3 w-full"
        >
          <option value="">
            Select Platform
          </option>

          <option>
            Instagram
          </option>

          <option>
            Facebook
          </option>

          <option>
            Snapchat
          </option>

          <option>
            YouTube
          </option>

          <option>
            LinkedIn
          </option>

          <option>
            TikTok
          </option>

          <option>
            Twitter
          </option>

        </select>

        <input
          type="text"
          name="state"
          placeholder="State"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <button
          disabled={loading}
          className="bg-black text-white w-full py-3"
        >
          {loading
            ? "Creating..."
            : "Create Account"}
        </button>
      </form>

      <p className="text-center mt-5">
  Already have an account?{" "}
  <Link
    href="/login"
    className="text-blue-600 font-semibold"
  >
    Login
  </Link>
</p>
    </div>
  );
}