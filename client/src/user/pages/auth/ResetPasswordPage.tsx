
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { resetPassword } from "../../features/auth/api/authApi";
function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [serverError, setServerError] =
    useState("");
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setServerError("Passwords do not match");
      return;
    }
    try {
      setServerError("");
      setIsSubmitting(true);
      await resetPassword({
        email,
        password,
      });
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setServerError(
          error.response?.data?.message ||
          "Password reset failed"
        );
      } else {
        setServerError(
          "Password reset failed"
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-4">
      {serverError && (
        <div className="fixed left-1/2 top-6 -translate-x-1/2 rounded-xl border border-red-500/20 bg-red-500/10 px-6 py-3 text-red-400">
          {serverError}
        </div>
      )}
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#121826] p-8">
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent">
            TDM
          </h1>
          <p className="mt-2 text-slate-400">
            Create New Password
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="relative">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="New Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-[#0B0F19] px-4 py-3 pr-12"
            />
            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword
                ? <EyeOff size={20}/>
                : <Eye size={20}/>}
            </button>
          </div>
          <div className="relative">
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-white/10 bg-[#0B0F19] px-4 py-3 pr-12"
            />
            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword
                ? <EyeOff size={20}/>
                : <Eye size={20}/>}
            </button>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 py-3 font-semibold"
          >
            {isSubmitting
              ? "Updating..."
              : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ResetPasswordPage;