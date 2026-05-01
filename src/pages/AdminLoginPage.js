import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

function AdminLoginPage() {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // show/hide password
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser({
        university_id: staffId,
        password,
      });

      if (data.token && data.user?.role_id === 2) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/admin/dashboard");
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

          <div style={{ position: "relative" }}>
            <input
              className="form-input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingRight: "80px" }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "14px",
                color: "#334155",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
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