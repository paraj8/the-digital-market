import api from "../../../../api/axios";

export interface AccountUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  accountStatus: string;
}

interface AccountUserResponse {
  success: boolean;
  data: AccountUser;
}

interface MessageResponse {
  success: boolean;
  message: string;
}

export const getCurrentUser = async (): Promise<AccountUser> => {
  const response = await api.get<AccountUserResponse>("/users/me");
  return response.data.data;
};

export const requestEmailChangeOtp = async (data: {
  newEmail: string;
  currentPassword: string;
}): Promise<MessageResponse> => {
  const response = await api.post<MessageResponse>(
    "/users/me/email/change/otp",
    data
  );
  return response.data;
};

export const verifyEmailChangeOtp = async (data: {
  newEmail: string;
  otp: string;
}): Promise<AccountUser> => {
  const response = await api.post<AccountUserResponse>(
    "/users/me/email/change/verify",
    data
  );
  return response.data.data;
};

export const updatePhone = async (data: {
  phone: string;
  currentPassword: string;
}): Promise<AccountUser> => {
  const response = await api.patch<AccountUserResponse>(
    "/users/me/phone",
    data
  );
  return response.data.data;
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}): Promise<MessageResponse> => {
  const response = await api.patch<MessageResponse>(
    "/users/me/password",
    data
  );
  return response.data;
};