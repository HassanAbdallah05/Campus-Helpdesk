import React from "react";
import { Link } from "react-router-dom";

function SignUpPage() {
  return (
    <>
      <div className="auth-card">
        <div className="auth-logo">CH</div>
        <h1 className="auth-title">Campus Helpdesk — Sign Up</h1>
        <p className="auth-subtitle">Create a new student account</p>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input className="form-input" type="text" placeholder="e.g. Ahmed" />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input className="form-input" type="text" placeholder="e.g. Hassan" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">University ID</label>
            <input className="form-input" type="text" placeholder="e.g. 2223425678" />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" placeholder="e.g. example@university.edu" />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="••••••••" />
            <div className="form-hint">Use at least 8 characters with numbers and letters.</div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input className="form-input" type="password" placeholder="••••••••" />
          </div>

          <Link to="/dashboard" className="btn btn-primary btn-block">Create Account</Link>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>

      <div className="auth-page-nav">
        <Link to="/login">1. Login</Link>
        <span className="current">2. Sign Up</span>
        <Link to="/submit-ticket">3. Report</Link>
        <Link to="/my-tickets">4. Tickets</Link>
        <Link to="/admin/login">5. Admin</Link>
      </div>
    </>
  );
}

export default SignUpPage;
