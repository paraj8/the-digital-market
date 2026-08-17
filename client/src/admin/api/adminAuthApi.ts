import api from "../../api/axios";

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export const adminLogin = async (
  data: AdminLoginRequest
) => {
  const response = await api.post(
    "/auth/admin/login",
    data
  );

  return response.data;
};