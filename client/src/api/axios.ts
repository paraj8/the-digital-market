import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api/v1",
});

// Attach JWT token and set Content-Type appropriately
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Attach JWT token automatically
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Do NOT manually set Content-Type for FormData.
    // The browser/Axios will automatically set:
    // multipart/form-data; boundary=...
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;