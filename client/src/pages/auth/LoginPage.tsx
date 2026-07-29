import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

import { loginUser } from "../../api/authApi";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setServerError("");
      setIsSubmitting(true);

      const response = await loginUser({
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setServerError(
          error.response?.data?.message ||
            "Login failed"
        );
      } else {
        setServerError("Login failed");
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
          shadow-xl
          shadow-black/20
        "
      >
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

          <p className="mt-2 text-slate-400">
            Welcome back
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              rounded-xl
              border border-white/10
              bg-[#0B0F19]
              px-4 py-3
              text-white
              outline-none
              focus:border-violet-500
            "
          />

          {/* Password */}
          <div className="relative">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                rounded-xl
                border border-white/10
                bg-[#0B0F19]
                px-4 py-3
                pr-12
                text-white
                outline-none
                focus:border-violet-500
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-slate-400
                hover:text-violet-400
              "
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() =>
                navigate("/forgot-password")
              }
              className="
                text-sm
                text-slate-400
                hover:text-violet-400
              "
            >
              Forgot Password?
            </button>
          </div>

          {/* Login */}
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
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isSubmitting
              ? "Signing In..."
              : "Login"}
          </button>
        </form>

        {/* Register */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            Don't have an account?
          </p>

          <button
            onClick={() =>
              navigate("/register")
            }
            className="
              mt-2
              text-sm
              font-medium
              text-violet-400
              hover:text-violet-300
            "
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;