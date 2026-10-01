import axios from "axios";
import type { AccountUser } from "../../../../features/account/api/accountApi";

export function getAccountSettingsErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || fallback;
  }
  return fallback;
}

export function maskPhoneNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const countryCode = digits.length === 12 && digits.startsWith("91") ? "+91 " : "";
  return `${countryCode}******${digits.slice(-4)}`;
}

export function isValidIndianPhoneNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const localNumber = digits.length === 12 && digits.startsWith("91")
    ? digits.slice(2)
    : digits.length === 11 && digits.startsWith("0")
      ? digits.slice(1)
      : digits;

  return /^[6-9]\d{9}$/.test(localNumber);
}

export function persistAccountUser(user: AccountUser) {
  try {
    const storedUser = localStorage.getItem("user");
    const previousUser: Record<string, unknown> = storedUser
      ? JSON.parse(storedUser) as Record<string, unknown>
      : {};
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...previousUser,
        email: user.email,
        phone: user.phone,
        isVerified: user.emailVerified,
        phoneVerified: user.phoneVerified,
      })
    );
  } catch {
    // The authenticated account query remains the source of truth.
  }
}