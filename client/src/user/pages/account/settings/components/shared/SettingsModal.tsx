import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import {
  changePassword,
  requestEmailChangeOtp,
  updatePhone,
  verifyEmailChangeOtp,
  type AccountUser,
} from "../../../../../features/account/api/accountApi";
import {
  getAccountSettingsErrorMessage,
  isValidIndianPhoneNumber,
} from "../../utils/accountSettingsUtils";
import PasswordInput from "./PasswordInput";

export type SettingsModalType = "email" | "phone" | "password";

const inputClassName =
  "mt-1.5 w-full min-w-0 rounded-lg border border-white/10 bg-[#0b0f19] px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/60";
const buttonClassName =
  "inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-slate-100 transition hover:border-violet-300/50 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto";

function SettingsModal({
  type,
  user,
  onClose,
  onUserUpdated,
}: {
  type: SettingsModalType;
  user: AccountUser;
  onClose: () => void;
  onUserUpdated: (user: AccountUser) => void;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  const [emailOtpStep, setEmailOtpStep] = useState(false);
  const title = type === "email"
    ? emailOtpStep ? "Verification required" : "Change email"
    : type === "phone"
      ? user.phone ? "Change phone number" : "Add phone number"
      : "Change password";

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const appRoot = document.getElementById("root");
    const previousInert = appRoot?.inert ?? false;
    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const focusFrame = window.requestAnimationFrame(() => {
      const firstInput = dialogRef.current?.querySelector<HTMLElement>("[data-modal-autofocus]");
      (firstInput ?? dialogRef.current)?.focus();
    });

    document.body.style.overflow = "hidden";
    if (appRoot) {
      appRoot.inert = true;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (appRoot) {
        appRoot.inert = previousInert;
      }
      if (previousFocus?.isConnected && previousFocus.getClientRects().length > 0) {
        previousFocus.focus();
      }
    };
  }, [onClose]);

  const content = type === "email" ? (
    <EmailChangeForm
      onOtpStepChange={setEmailOtpStep}
      onClose={onClose}
      onUserUpdated={onUserUpdated}
    />
  ) : type === "phone" ? (
    <PhoneChangeForm
      user={user}
      onClose={onClose}
      onUserUpdated={onUserUpdated}
    />
  ) : (
    <PasswordChangeForm onClose={onClose} />
  );

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/65 px-4 py-5 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-modal-title"
        tabIndex={-1}
        className="my-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#121826] p-5 shadow-2xl shadow-black/50 sm:p-6"
      >
        <header className="mb-5 flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase text-violet-300">Account security</p>
            <h2 id="settings-modal-title" className="mt-1 text-lg font-semibold text-white">
              {title}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close dialog"
            title="Close"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
          >
            <X size={18} />
          </button>
        </header>
        {content}
      </section>
    </div>,
    document.body
  );
}

function EmailChangeForm({
  onOtpStepChange,
  onClose,
  onUserUpdated,
}: {
  onOtpStepChange: (sent: boolean) => void;
  onClose: () => void;
  onUserUpdated: (user: AccountUser) => void;
}) {
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await requestEmailChangeOtp({
        newEmail: newEmail.trim(),
        currentPassword,
      });
      setOtpSent(true);
      setCurrentPassword("");
      onOtpStepChange(true);
      toast.success(response.message || "Verification code sent.");
    } catch (error: unknown) {
      toast.error(getAccountSettingsErrorMessage(error, "Unable to send verification code."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const updatedUser = await verifyEmailChangeOtp({
        newEmail: newEmail.trim(),
        otp,
      });
      onUserUpdated(updatedUser);
      toast.success("Email address updated.");
      onClose();
    } catch (error: unknown) {
      toast.error(getAccountSettingsErrorMessage(error, "Unable to verify the new email address."));
    } finally {
      setIsLoading(false);
    }
  };

  if (otpSent) {
    return (
      <form onSubmit={handleOtpVerify} className="min-w-0 space-y-5">
        <p className="break-words text-sm leading-6 text-slate-300">
          Enter the verification code sent to:
          <span className="mt-1 block break-all font-medium text-white">{newEmail}</span>
        </p>
        <label className="block text-sm text-slate-300">
          Verification code
          <input
            required
            autoFocus
            data-modal-autofocus
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            className={inputClassName}
          />
        </label>
        <div className="grid gap-2 sm:flex sm:flex-wrap">
          <button type="submit" disabled={isLoading} className={buttonClassName}>
            {isLoading ? "Verifying..." : "Verify email"}
          </button>
          <button
            type="button"
            className={buttonClassName}
            onClick={() => {
              setOtpSent(false);
              setOtp("");
              onOtpStepChange(false);
            }}
          >
            Use a different email
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleOtpRequest} className="min-w-0 space-y-5">
      <label className="block text-sm text-slate-300">
        New email address
        <input
          required
          autoFocus
          data-modal-autofocus
          type="email"
          autoComplete="email"
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
          className={inputClassName}
        />
      </label>
      <PasswordInput
        id="modal-email-current-password"
        label="Current password"
        value={currentPassword}
        onChange={setCurrentPassword}
        autoComplete="current-password"
      />
      <div className="grid gap-2 sm:flex sm:flex-wrap">
        <button type="submit" disabled={isLoading} className={buttonClassName}>
          {isLoading ? "Sending..." : "Send verification code"}
        </button>
        <button type="button" className={buttonClassName} onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}

function PhoneChangeForm({
  user,
  onClose,
  onUserUpdated,
}: {
  user: AccountUser;
  onClose: () => void;
  onUserUpdated: (user: AccountUser) => void;
}) {
  const [phone, setPhone] = useState(user.phone || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidIndianPhoneNumber(phone)) {
      toast.error("Enter a valid Indian mobile number.");
      return;
    }

    setIsLoading(true);
    try {
      const updatedUser = await updatePhone({ phone, currentPassword });
      onUserUpdated(updatedUser);
      toast.success(updatedUser.phone ? "Phone saved." : "Phone number updated.");
      onClose();
    } catch (error: unknown) {
      toast.error(getAccountSettingsErrorMessage(error, "Unable to save the phone number."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handlePhoneUpdate} className="min-w-0 space-y-5">
      <label className="block text-sm text-slate-300">
        New phone number
        <input
          required
          autoFocus
          data-modal-autofocus
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={18}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className={inputClassName}
        />
      </label>
      <PasswordInput
        id="modal-phone-current-password"
        label="Current password"
        value={currentPassword}
        onChange={setCurrentPassword}
        autoComplete="current-password"
      />
      <div className="grid gap-2 sm:flex sm:flex-wrap">
        <button type="submit" disabled={isLoading} className={buttonClassName}>
          {isLoading ? "Saving..." : "Save phone number"}
        </button>
        <button type="button" className={buttonClassName} onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}

function PasswordChangeForm({ onClose }: { onClose: () => void }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword.length < 6 || newPassword.length > 128) {
      toast.error("New password must be between 6 and 128 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await changePassword({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success(response.message || "Password updated successfully.");
      onClose();
    } catch (error: unknown) {
      toast.error(getAccountSettingsErrorMessage(error, "Unable to change the password."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handlePasswordChange} className="min-w-0 space-y-5">
      <PasswordInput
        id="modal-password-current-password"
        label="Current password"
        value={currentPassword}
        onChange={setCurrentPassword}
        autoComplete="current-password"
        autoFocus
      />
      <PasswordInput
        id="modal-password-new-password"
        label="New password"
        value={newPassword}
        onChange={setNewPassword}
        autoComplete="new-password"
      />
      <PasswordInput
        id="modal-password-confirm-password"
        label="Confirm new password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        autoComplete="new-password"
      />
      <div className="grid gap-2 sm:flex sm:flex-wrap">
        <button type="submit" disabled={isLoading} className={buttonClassName}>
          {isLoading ? "Updating..." : "Update password"}
        </button>
        <button type="button" className={buttonClassName} onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}

export default SettingsModal;