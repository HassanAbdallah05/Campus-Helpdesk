import React, { useState } from "react"; // added state
import { Link, useNavigate } from "react-router-dom"; // added navigation
import { loginUser } from "../api/api"; // backend API function

function LoginPage() {
  const [universityId, setUniversityId] = useState(""); // input value
  const [password, setPassword] = useState(""); // input value
  const [error, setError] = useState(""); // error message

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser({
        university_id: universityId, // backend expects university_id
        password,
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
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
        <h1 className="auth-title">Campus Helpdesk — Login</h1>
        <br />

        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="form-group">
            <label className="form-label" htmlFor="universityId">
              University ID
            </label>
            <input
              id="universityId"
              className="form-input"
              type="text"
              value={universityId}
              onChange={(e) => setUniversityId(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>

          <Link to="/signup" className="btn btn-secondary btn-block auth-switch-btn">
            Sign Up
          </Link>
        </form>
      </div>

      <div className="auth-page-nav">
        <Link to="/admin/login">Admin</Link>
      </div>
    </>
  );
}

export default LoginPage;