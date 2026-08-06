"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  resetPassword,
  resendOtp,
} from "@/services/authApi";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [timer, setTimer] =
    useState(30);

  useEffect(() => {
    const savedEmail =
      sessionStorage.getItem(
        "resetEmail"
      );

    if (!savedEmail) {
      router.push(
        "/forgot-password"
      );
      return;
    }

    setEmail(savedEmail);
  }, [router]);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () =>
      clearInterval(interval);
  }, [timer]);

  const handleResend =
    async () => {
      try {
        const res =
          await resendOtp(email);

        alert(res.message);

        setTimer(30);
      } catch (error: any) {
        alert(
          error.response?.data
            ?.message ||
            "Failed to resend OTP"
        );
      }
    };

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        const res =
          await resetPassword({
            email,
            otp,
            password,
            confirmPassword,
          });

        alert(res.message);

        sessionStorage.removeItem(
          "resetEmail"
        );

        router.push("/login");
      } catch (error: any) {
        alert(
          error.response?.data
            ?.message ||
            "Reset Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="max-w-md mx-auto mt-20 border rounded-xl p-8 shadow">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Reset Password
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="email"
          value={email}
          readOnly
          className="border p-3 w-full rounded-lg bg-gray-100"
        />

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) =>
            setOtp(
              e.target.value
            )
          }
          className="border p-3 w-full rounded-lg"
        />

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="border p-3 w-full rounded-lg"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={
            confirmPassword
          }
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          className="border p-3 w-full rounded-lg"
        />

        <button
          type="submit"
          className="bg-black text-white w-full py-3 rounded-lg"
        >
          {loading
            ? "Updating..."
            : "Reset Password"}
        </button>

        <div className="text-center mt-3">

          {timer > 0 ? (
            <p className="text-gray-500">
              Resend OTP in{" "}
              <b>{timer}s</b>
            </p>
          ) : (
            <button
              type="button"
              onClick={
                handleResend
              }
              className="text-blue-600 font-semibold hover:underline"
            >
              Resend OTP
            </button>
          )}

        </div>

      </form>

    </div>
  );
}