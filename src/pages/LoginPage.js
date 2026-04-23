import React from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <>
      <div className="auth-card">
        <div className="auth-logo">CH</div>
        <h1 className="auth-title">Campus Helpdesk — Login</h1>
        <p className="auth-subtitle">Sign in with your university credentials</p>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label className="form-label" htmlFor="universityId">University ID</label>
            <input id="universityId" className="form-input" type="text" placeholder="e.g. U12345678" />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input id="password" className="form-input" type="password" placeholder="Enter your password" />
          </div>

          <Link to="/dashboard" className="btn btn-primary btn-block">Login</Link>
          <Link to="/signup" className="btn btn-secondary btn-block auth-switch-btn">Sign Up</Link>
        </form>
      </div>

      <div className="auth-page-nav">
        <span className="current">1. Login</span>
        <Link to="/signup">2. Sign Up</Link>
        <Link to="/submit-ticket">3. Report</Link>
        <Link to="/my-tickets">4. Tickets</Link>
        <Link to="/admin/login">5. Admin</Link>
      </div>
    </>
  );
}

export default LoginPage;
