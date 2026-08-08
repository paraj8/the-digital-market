import { Navigate, Outlet } from "react-router-dom";

function AdminProtectedRoute() {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  if (!token || !userData) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  let user;

  try {
    user = JSON.parse(userData);
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

  const isAdmin =
    user.role === "admin" ||
    user.role === "staff";

  if (!isAdmin) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return <Outlet />;
}

export default AdminProtectedRoute;