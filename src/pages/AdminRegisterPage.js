import React, { useState } from "react"; // added useState
import { Link, useNavigate } from "react-router-dom"; // added useNavigate
import { registerUser } from "../api/api"; // backend register API

function AdminRegisterPage() {
  const [fname, setFname] = useState(""); // first name
  const [lname, setLname] = useState(""); // last name
  const [staffId, setStaffId] = useState(""); // backend uses university_id
  const [email, setEmail] = useState(""); // email
  const [password, setPassword] = useState(""); // password
  const [confirmPassword, setConfirmPassword] = useState(""); // confirm password
  const [accessCode, setAccessCode] = useState(""); // simple admin code
  const [error, setError] = useState(""); // error message

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // temporary frontend-only admin code check
    if (accessCode !== "ADMIN123") {
      setError("Invalid admin access code");
      return;
    }

    try {
      const data = await registerUser({
        university_id: staffId, // backend expects university_id
        fname,
        lname,
        email,
        password,
        confirmPassword,
        role_id: 2, // admin role
      });

      if (data.token) {
        localStorage.setItem("token", data.token); // save token
        localStorage.setItem("user", JSON.stringify(data.user)); // save admin data
        navigate("/admin/dashboard"); // go to admin dashboard
      } else {
        setError(data.message || "Admin registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  }

  return (
    <div className="auth-card auth-card-admin">
      <div className="auth-logo">ADM</div>
      <h1 className="auth-title">Admin Registration</h1>
      <br />

      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              className="form-input"
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              className="form-input"
              type="text"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
            />
          </div>
        </div>

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
          <label className="form-label">University Email</label>
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Admin Access Code</label>
          <input
            className="form-input"
            type="text"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          [ Create Admin Account ]
        </button>
      </form>

      <div className="auth-footer">
        <Link to="/admin/login">← Back to Login</Link>
      </div>
    </div>
  );
}

export default AdminRegisterPage;