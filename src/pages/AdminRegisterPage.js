import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

function AdminRegisterPage() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [staffId, setStaffId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const [error, setError] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    staffId: "",
    email: "",
    password: "",
    confirmPassword: "",
    accessCode: "",
  });

  const navigate = useNavigate();

  function clearErrors() {
    setError("");
    setFieldErrors({
      staffId: "",
      email: "",
      password: "",
      confirmPassword: "",
      accessCode: "",
    });
  }

  function handleBackendError(message) {
    const errors = {
      staffId: "",
      email: "",
      password: "",
      confirmPassword: "",
      accessCode: "",
    };

    if (
      message.includes("KU ID") ||
      message.includes("University ID") ||
      message.includes("university ID")
    ) {
      errors.staffId = message;
    } else if (
      message.includes("email") ||
      message.includes("Email")
    ) {
      errors.email = message;
    } else if (message.includes("Password must")) {
      errors.password = message;
    } else if (message.includes("Passwords do not match")) {
      errors.confirmPassword = message;
    } else {
      setError(message);
    }

    setFieldErrors(errors);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    clearErrors();

    if (accessCode !== "ADMIN123") {
      setFieldErrors({
        staffId: "",
        email: "",
        password: "",
        confirmPassword: "",
        accessCode: "Invalid admin access code",
      });
      return;
    }

    try {
      const data = await registerUser({
        university_id: staffId,
        fname,
        lname,
        email,
        password,
        confirmPassword,
        role_id: 2,
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/admin/dashboard");
      } else {
        handleBackendError(data.message || "Admin registration failed");
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

          {fieldErrors.staffId && (
            <p style={{ color: "red", marginTop: "6px" }}>
              {fieldErrors.staffId}
            </p>
          )}
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

          {fieldErrors.email && (
            <p style={{ color: "red", marginTop: "6px" }}>
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="form-hint">
              Use at least 8 characters with uppercase, lowercase, number, and special character.
            </div>

            {fieldErrors.password && (
              <p style={{ color: "red", marginTop: "6px" }}>
                {fieldErrors.password}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              className="form-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {fieldErrors.confirmPassword && (
              <p style={{ color: "red", marginTop: "6px" }}>
                {fieldErrors.confirmPassword}
              </p>
            )}
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

          {fieldErrors.accessCode && (
            <p style={{ color: "red", marginTop: "6px" }}>
              {fieldErrors.accessCode}
            </p>
          )}
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