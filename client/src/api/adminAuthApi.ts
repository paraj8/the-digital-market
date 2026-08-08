import API from "./axios";

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export const adminLogin = async (
  data: AdminLoginRequest
) => {
  const response = await API.post(
    "/auth/admin/login",
    data
  );

  return response.data;
};