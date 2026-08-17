import api from "../../../api/axios";

export const registerUser = async (
  data: {
    fullName: string;
    email: string;
    password: string;
  }
) => {
  const response =
    await api.post(
      "/auth/register",
      data
    );

  return response.data;
};

export const verifyOtp = async (
  data: {
    email: string;
    otp: string;
  }
) => {
  const response =
    await api.post(
      "/auth/verify-otp",
      data
    );

  return response.data;
};

export const loginUser = async (
  data: {
    email: string;
    password: string;
  }
) => {
  const response =
    await api.post(
      "/auth/login",
      data
    );

  return response.data;
};

export const forgotPassword = async (
  data: {
    email: string;
  }
) => {
  const response = await api.post(
    "/auth/forgot-password",
    data
  );
  return response.data;
};
export const verifyForgotPasswordOtp = async (
  data: {
    email: string;
    otp: string;
  }
) => {
  const response = await api.post(
    "/auth/verify-forgot-password-otp",
    data
  );
  return response.data;
};
export const resetPassword = async (
  data: {
    email: string;
    password: string;
  }
) => {
  const response = await api.post(
    "/auth/reset-password",
    data
  );
  return response.data;
};