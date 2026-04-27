import React from "react";
import { Link } from "react-router-dom";

function AdminRegisterPage() {
  return (
    <div className="auth-card auth-card-admin">
      <div className="auth-logo">ADM</div>
      <h1 className="auth-title">Admin Registration</h1>
     <br></br>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input className="form-input" type="text"  />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input className="form-input" type="text" placeholder="" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Staff / Employee ID</label>
          <input className="form-input" type="text"  />
        </div>

        <div className="form-group">
          <label className="form-label">University Email</label>
          <input className="form-input" type="email"  />
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
          <input className="form-input" type="text"  />
         
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
