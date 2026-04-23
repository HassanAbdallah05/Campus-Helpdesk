import React from "react";
import { Link } from "react-router-dom";

function AdminLoginPage() {
  return (
    <div className="auth-card auth-card-admin">
      <div className="auth-logo">ADM</div>
      <h1 className="auth-title">Admin Login</h1>
      <p className="auth-subtitle">Sign in to the administrator panel</p>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label className="form-label">Staff / Employee ID</label>
          <input className="form-input" type="text" placeholder="e.g. ADM-20260001" />
          <div className="form-hint">Your university staff identification number</div>
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="Enter your password" />
          <div className="form-hint" style={{ textAlign: "right" }}>
            <a href="#forgot">Forgot password?</a>
          </div>
        </div>

        <Link to="/admin/dashboard" className="btn btn-primary btn-block">[ Admin Login ]</Link>
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
