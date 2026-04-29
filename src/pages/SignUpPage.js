import React, { useState } from "react"; // added useState
import { Link, useNavigate } from "react-router-dom"; // added useNavigate
import { registerUser } from "../api/api"; // backend API function

function SignUpPage() {
  const [fname, setFname] = useState(""); // backend expects fname
  const [lname, setLname] = useState(""); // backend expects lname
  const [universityId, setUniversityId] = useState(""); // input value
  const [email, setEmail] = useState(""); // input value
  const [password, setPassword] = useState(""); // input value
  const [confirmPassword, setConfirmPassword] = useState(""); // input value
  const [error, setError] = useState(""); // error message

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await registerUser({
        university_id: universityId, // backend expects university_id
        fname,
        lname,
        email,
        password,
        confirmPassword,
        role_id: 1, // student role
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.message || "Registration failed");
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
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="form-hint">
              Use at least 8 characters with numbers and letters.
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Create Account
          </button>
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