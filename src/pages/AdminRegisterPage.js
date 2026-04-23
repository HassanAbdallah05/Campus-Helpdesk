import React from "react";
import { Link } from "react-router-dom";

function AdminRegisterPage() {
  return (
    <div className="auth-card auth-card-admin">
      <div className="auth-logo">ADM</div>
      <h1 className="auth-title">Admin Registration</h1>
      <p className="auth-subtitle">Create a new administrator account for the helpdesk system</p>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input className="form-input" type="text" placeholder="e.g. Maria" />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input className="form-input" type="text" placeholder="e.g. Santos" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Staff / Employee ID</label>
          <input className="form-input" type="text" placeholder="e.g. ADM-20260001" />
          <div className="form-hint">Your university staff identification number</div>
        </div>

        <div className="form-group">
          <label className="form-label">University Email</label>
          <input className="form-input" type="email" placeholder="e.g. m.santos@univ.edu" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Department / Unit</label>
            <select className="form-select" defaultValue="">
              <option value="" disabled>Select department...</option>
              <option>IT Services</option>
              <option>Facilities Management</option>
              <option>Library</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Admin Role</label>
            <select className="form-select" defaultValue="">
              <option value="" disabled>Select role...</option>
              <option>IT Support</option>
              <option>Facilities Manager</option>
              <option>Library Admin</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="Create a password" />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input className="form-input" type="password" placeholder="Re-enter password" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Admin Access Code</label>
          <input className="form-input" type="text" placeholder="Enter the admin invitation code" />
          <div className="form-hint">Provided by the IT administrator or department head</div>
        </div>

        <div className="checkbox-group">
          <input type="checkbox" id="agree" />
          <label htmlFor="agree">
            I agree to the university's data privacy policy and accept responsibility for
            administrative actions performed under this account.
          </label>
        </div>

        <Link to="/admin/dashboard" className="btn btn-primary btn-block">[ Create Admin Account ]</Link>
      </form>

      <div className="auth-footer">
        <Link to="/admin/login">← Back to Login</Link>
      </div>
    </div>
  );
}

export default AdminRegisterPage;
