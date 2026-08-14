import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { adminLogin } from "../api/adminAuthApi";

export function useAdminLogin() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const login = async (
    email: string,
    password: string
  ) => {
    try {
      setLoading(true);
      setError("");

      const response =
        await adminLogin({
          email,
          password,
        });

      const { token, user } =
        response.data;

      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      navigate("/admin");
        } catch (err) {
    if (axios.isAxiosError(err)) {
        setError(
        err.response?.data?.message ??
        "Login failed"
        );
    } else {
        setError("Something went wrong");
    }
    }
  };

  return {
    login,

    loading,

    error,
  };
}