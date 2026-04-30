import React, { useState } from "react"; // added useState
import { Link, useNavigate } from "react-router-dom"; // added useNavigate
import { loginUser } from "../api/api"; // use same backend login API

function AdminLoginPage() {
  const [staffId, setStaffId] = useState(""); // stores staff/admin ID
  const [password, setPassword] = useState(""); // stores password
  const [error, setError] = useState(""); // stores error message

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); // prevent page refresh
    setError("");

    try {
      const data = await loginUser({
        university_id: staffId, // backend expects university_id
        password,
      });

      if (data.token && data.user?.role_id === 2) {
        localStorage.setItem("token", data.token); // save JWT token
        localStorage.setItem("user", JSON.stringify(data.user)); // save admin user
        navigate("/admin/dashboard"); // go to admin dashboard
      } else if (data.token && data.user?.role_id !== 2) {
        setError("Access denied. This account is not an admin.");
      } else {
        setError(data.message || "Admin login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  }

  return (
    <div className="auth-card auth-card-admin">
      <div className="auth-logo">ADM</div>
      <h1 className="auth-title">Admin Login</h1>
      <p className="auth-subtitle">Sign in to the administrator panel</p>

      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="form-group">
          <label className="form-label">Staff / Employee ID</label>
          <input
            className="form-input"
            type="text"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="form-hint" style={{ textAlign: "right" }}>
            <a href="#forgot">Forgot password?</a>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          [ Admin Login ]
        </button>

        <Link to="/admin/register" className="btn btn-secondary btn-block auth-switch-btn">
          [ Create Admin Account ]
        </Link>
      </form>

      <div className="auth-footer">
        <Link to="/login">← Back to Student Login</Link>
      </div>
    </div>
  );
}

export default AdminLoginPage;