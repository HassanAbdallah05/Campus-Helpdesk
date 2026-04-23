import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../common/NavBar";
import Footer from "../common/Foorter";

function AdminLayout() {
  return (
    <div className="app-shell">
      <NavBar variant="admin" />
      <main className="app-main">
        <div className="container"><Outlet /></div>
      </main>
      <Footer />
    </div>
  );
}

export default AdminLayout;
