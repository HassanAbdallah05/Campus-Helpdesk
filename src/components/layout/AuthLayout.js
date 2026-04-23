import React from "react";
import { Outlet } from "react-router-dom";
import "../../styles/AuthLayout.css";
import "../../styles/Login.css";
import "../../styles/SignUp.css";

function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-wrapper">
        <Outlet />
      </div>
      <div className="auth-footnote">
        &copy; {new Date().getFullYear()} Campus Helpdesk &middot; Kuwait University
      </div>
    </div>
  );
}

export default AuthLayout;
