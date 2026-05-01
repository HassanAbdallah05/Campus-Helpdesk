import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

function SignUpPage() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    universityId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  function clearErrors() {
    setError("");
    setFieldErrors({
      universityId: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  function handleBackendError(message) {
    const errors = {
      universityId: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (
      message.includes("KU ID") ||
      message.includes("University ID") ||
      message.includes("university ID")
    ) {
      errors.universityId = message;
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

    try {
      const data = await registerUser({
        university_id: universityId,
        fname,
        lname,
        email,
        password,
        confirmPassword,
        role_id: 1,
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        handleBackendError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  }

  return (
    <>
      <div className="auth-card">
        <div className="auth-logo">CH</div>
        <h1 className="auth-title">Campus Helpdesk — Sign Up</h1>
        <p className="auth-subtitle">Create a new student account</p>

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
            <label className="form-label">University ID</label>
            <input
              className="form-input"
              type="text"
              value={universityId}
              onChange={(e) => setUniversityId(e.target.value)}
              required
            />

            {fieldErrors.universityId && (
              <p style={{ color: "red", marginTop: "6px" }}>
                {fieldErrors.universityId}
              </p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
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

          <button type="submit" className="btn btn-primary btn-block">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;