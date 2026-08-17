import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

function AdminLayout() {
  return (
    <div
      className="
        min-h-screen

        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-950

        text-white

        flex
      "
    >
      {/* Sidebar */}

      <AdminSidebar />

      {/* Right Side */}

      <div
        className="
          flex-1

          flex
          flex-col

          overflow-hidden
        "
      >
        {/* Topbar */}

        <AdminTopbar />

        {/* Page Content */}

        <main
          className="
            flex-1

            overflow-y-auto

            p-8
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;