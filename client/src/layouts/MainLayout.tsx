import { useState } from "react";

import Navbar from "../components/layout/navbar/Navbar";
import Sidebar from "../components/layout/sidebar/Sidebar";
import Footer from "../components/layout/Footer";

import { Outlet } from "react-router-dom";

function MainLayout() {
  const [open, setOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <Navbar
        onMenuClick={() =>
          setOpen(true)
        }
      />

      <Sidebar
        open={open}
        onClose={() =>
          setOpen(false)
        }
      />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;