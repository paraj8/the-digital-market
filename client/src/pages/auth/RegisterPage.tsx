import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { Eye, EyeOff } from "lucide-react";

import {
  registerSchema,
  type RegisterFormData,
} from "../../features/auth/schemas/registerSchema";

import { registerUser } from "../../api/authApi";

function RegisterPage() {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Show / Hide password states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setServerError("");
      setIsSubmitting(true);

      await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      navigate("/verify-otp", {
        state: {
          email: data.email,
        },
      });
      toast.success("Registration successful!");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data?.message ||
          "Registration failed");

        setServerError(message);
        toast.error(message);
      } else {
        setServerError("Registration failed");
        toast.error("Registration failed");
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

          <p className="mt-2 text-slate-400">
            Create your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Full Name */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Full Name
            </label>

            <input
              {...register("fullName")}
              type="text"
              className="
                w-full
                rounded-xl
                border border-white/10
                bg-[#0B0F19]
                px-4
                py-3
                text-white
                outline-none
                focus:border-violet-500
              "
              placeholder="John Doe"
            />

            {errors.fullName && (
              <p className="mt-1 text-sm text-red-400">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <input
              {...register("email")}
              type="email"
              className="
                w-full
                rounded-xl
                border border-white/10
                bg-[#0B0F19]
                px-4
                py-3
                text-white
                outline-none
                focus:border-violet-500
              "
              placeholder="you@example.com"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <div className="relative">
              <input
                {...register("password")}
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                className="
                  w-full
                  rounded-xl
                  border border-white/10
                  bg-[#0B0F19]
                  px-4
                  py-3
                  pr-12
                  text-white
                  outline-none
                  focus:border-violet-500
                "
                placeholder="********"
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
                  transition
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

            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Confirm Password
            </label>

            <div className="relative">
              <input
                {...register(
                  "confirmPassword"
                )}
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                className="
                  w-full
                  rounded-xl
                  border border-white/10
                  bg-[#0B0F19]
                  px-4
                  py-3
                  pr-12
                  text-white
                  outline-none
                  focus:border-violet-500
                "
                placeholder="********"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                  transition
                  hover:text-violet-400
                "
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">
                {
                  errors.confirmPassword
                    .message
                }
              </p>
            )}
          </div>

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
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        {/* Login */}

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() =>
              navigate("/login")
            }
            className="
              text-sm
              text-violet-400
              hover:text-violet-300
            "
          >
            Already have an account?
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;