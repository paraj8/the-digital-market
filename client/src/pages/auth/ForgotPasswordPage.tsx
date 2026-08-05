import { forgotPassword } from "../../api/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setServerError("");
      setIsSubmitting(true);

      await forgotPassword({ email,});


      toast.success(
        "OTP sent successfully."
      );

      navigate("/verify-forgot-password-otp", {
        state: {
          email: email,
        },
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Something went wrong";

        setServerError(message);
        toast.error(message);
      } else {
        setServerError("Something went wrong");
        toast.error("Something went wrong");
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
      {/* Server Error */}

      {serverError && (
        <div
          className="
            fixed
            left-1/2
            top-6
            z-50
            -translate-x-1/2
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            px-6
            py-3
            text-sm
            text-red-400
            backdrop-blur-md
            shadow-lg
          "
        >
          {serverError}
        </div>
      )}

      {/* Card */}

      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border border-white/10
          bg-[#121826]
          p-8
          shadow-2xl
        "
      >
        {/* Logo */}

        <div className="mb-8 text-center">
          <h1
            className="
              bg-gradient-to-r
              from-violet-400
              via-blue-400
              to-cyan-400
              bg-clip-text
              text-4xl
              font-bold
              text-transparent
            "
          >
            TDM
          </h1>

          <h2 className="mt-6 text-2xl font-semibold text-white">
            Forgot Password?
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Enter your registered email address and
            we'll send you an OTP to reset your password.
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Email */}

          <div>
            <label
              htmlFor="email"
              className="
                mb-2
                block
                text-sm
                text-slate-300
              "
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              autoComplete="email"
              className="
                w-full
                rounded-xl
                border border-white/10
                bg-[#0B0F19]
                px-4
                py-3
                text-white
                outline-none
                transition
                placeholder:text-slate-600
                focus:border-violet-500
              "
            />
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              to-blue-600
              py-3
              font-semibold
              text-white
              transition
              hover:scale-[1.02]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isSubmitting
              ? "Sending OTP..."
              : "Send OTP"}
          </button>
        </form>

        {/* Back to Login */}

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="
              text-sm
              text-violet-400
              transition
              hover:text-violet-300
            "
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;