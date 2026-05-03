import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTickets } from "../api/api";
import "../styles/Dashboard.css";

function DashboardHome() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const studentName = user ? `${user.fname} ${user.lname}` : "Student";

  useEffect(() => {
    async function loadTickets() {
      try {
        const data = await getTickets("All");

        if (Array.isArray(data)) {
          setTickets(data);
        } else {
          setError(data.message || "Failed to load activity");
        }
      } catch (err) {
        console.error(err);
        setError("Server error");
      }
    }

    loadTickets();
  }, []);

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "Open").length;
  const inProgress = tickets.filter((t) => t.status === "In Progress").length;
  const resolved = tickets.filter((t) => t.status === "Resolved").length;
  const closed = tickets.filter((t) => t.status === "Closed").length;

  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">Dashboard</div>
        <h1 className="page-title">Welcome, {studentName}</h1>
        <p className="page-subtitle">
          Report a new issue or check the status of your existing tickets.
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="dashboard-icon">+</div>
          <h3>Report a Problem</h3>
          <p>Submit a new helpdesk ticket for an issue on campus.</p>
          <Link to="/submit-ticket" className="btn btn-primary">
            Submit Ticket
          </Link>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-icon">#</div>
          <h3>My Tickets</h3>
          <p>View and track the status of all your submitted tickets.</p>
          <Link to="/my-tickets" className="btn btn-secondary">
            View My Tickets
          </Link>
        </div>
      </div>

      <div className="dashboard-stats">
        <h2 className="section-title">Your Activity</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="stats-row">
          <div className="stat-box">
            <div className="stat-label">TOTAL TICKETS</div>
            <div className="stat-value">{total}</div>
            <div className="stat-hint">All time</div>
          </div>

          <div className="stat-box">
            <div className="stat-label">OPEN</div>
            <div className="stat-value">{open}</div>
            <div className="stat-hint">Awaiting action</div>
          </div>

          <div className="stat-box">
            <div className="stat-label">IN PROGRESS</div>
            <div className="stat-value">{inProgress}</div>
            <div className="stat-hint">Being handled</div>
          </div>

          <div className="stat-box">
            <div className="stat-label">RESOLVED</div>
            <div className="stat-value">{resolved}</div>
            <div className="stat-hint">Completed</div>
          </div>

          <div className="stat-box">
            <div className="stat-label">Closed</div>
            <div className="stat-value">{closed}</div>
            <div className="stat-hint">Finished</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardHome;