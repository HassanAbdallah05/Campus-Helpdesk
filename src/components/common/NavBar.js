import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../../styles/NavBar.css";

function NavBar({ variant = "student" }) {
  const isAdmin = variant === "admin";

  // Get logged-in user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Display real user name if available
  const displayName = user
    ? `${user.fname} ${user.lname}`
    : isAdmin
    ? "IT Support Team"
    : "Student Name";

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to={isAdmin ? "/admin/dashboard" : "/dashboard"} className="navbar-brand">
          <span className="navbar-logo">CH</span>
          <span className="navbar-title">
            Campus Helpdesk {isAdmin && <small>/ Admin</small>}
          </span>
        </Link>

        <ul className="navbar-links">
          {!isAdmin && (
            <>
              <li>
                <NavLink to="/dashboard" end>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-tickets">
                  My Tickets
                </NavLink>
              </li>
              <li>
                <NavLink to="/submit-ticket">
                  Report a Problem
                </NavLink>
              </li>
            </>
          )}

          {isAdmin && (
            <li>
              <NavLink to="/admin/dashboard" end>
                Admin Panel
              </NavLink>
            </li>
          )}
        </ul>

        <div className="navbar-user">
          <span className="navbar-user-name">{displayName}</span>
          <Link
            to={isAdmin ? "/admin/login" : "/login"}
            className="navbar-logout"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
            }}
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;