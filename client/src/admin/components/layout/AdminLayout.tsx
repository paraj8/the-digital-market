import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="
        h-screen

        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-950

        text-white

        flex

        overflow-hidden
      "
    >
      {/* Sidebar */}

      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Right Side */}

      <div
        className="
          flex-1
          min-w-0
          min-h-0

          flex
          flex-col
        "
      >
        {/* Topbar */}

        <AdminTopbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page Content */}

        <main
          className="
            flex-1
            min-h-0

            overflow-y-auto

            p-4
            md:p-8
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;