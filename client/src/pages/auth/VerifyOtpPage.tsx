import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

import { verifyOtp } from "../../api/authApi";

function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email || "";

  const [otp, setOtp] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [serverError, setServerError] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setServerError("");
      setIsSubmitting(true);

      await verifyOtp({
        email,
        otp,
      });

      navigate("/login");
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error)
      ) {
        setServerError(
          error.response?.data
            ?.message ||
            "OTP verification failed"
        );
      } else {
        setServerError(
          "OTP verification failed"
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[#0B0F19]
        px-4
      "
    >
      {serverError && (
        <div
          className="
            fixed
            left-1/2
            top-6
            z-50
            -translate-x-1/2
            rounded-xl
            border border-red-500/20
            bg-red-500/10
            px-6 py-3
            text-red-400
          "
        >
          {serverError}
        </div>
      )}

      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border border-white/10
          bg-[#121826]
          p-8
        "
      >
        <h1 className="text-3xl font-bold">
          Verify OTP
        </h1>

        <p className="mt-2 text-slate-400">
          OTP sent to:
        </p>

        <p className="mb-6 text-violet-400">
          {email}
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value
              )
            }
            placeholder="Enter OTP"
            className="
              w-full
              rounded-xl
              border border-white/10
              bg-[#0B0F19]
              px-4 py-3
            "
          />

          <button
            type="submit"
            disabled={
              isSubmitting
            }
            className="
              w-full
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              to-blue-600
              py-3
              font-semibold
            "
          >
            {isSubmitting
              ? "Verifying..."
              : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtpPage;