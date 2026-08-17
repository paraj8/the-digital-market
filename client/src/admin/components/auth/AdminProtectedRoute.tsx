import { Navigate, Outlet } from "react-router-dom";

interface AdminUser {
  role: "admin" | "staff" | string;
}

function AdminProtectedRoute() {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  // Not logged in
  if (!token || !userData) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  let user: AdminUser;

  try {
    user = JSON.parse(userData) as AdminUser;
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  // Check admin/staff access
  const isAdmin =
    user.role === "admin" ||
    user.role === "staff";

  if (!isAdmin) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // Authorized user
  return <Outlet />;
}

export default AdminProtectedRoute;