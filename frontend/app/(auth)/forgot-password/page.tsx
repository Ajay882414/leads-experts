"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/services/authApi";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await forgotPassword(email);

      alert(res.message);

     sessionStorage.setItem(
  "resetEmail",
  res.email
);

router.push("/reset-password");
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-8">
        Forgot Password
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="border p-3 w-full rounded-lg"
        />

        <button
          className="bg-black text-white w-full py-3 rounded-lg"
        >
          {loading
            ? "Sending OTP..."
            : "Send OTP"}
        </button>
      </form>
    </div>
  );
}