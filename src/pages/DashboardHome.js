import React from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

function DashboardHome() {
  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">Dashboard</div>
        <h1 className="page-title">Welcome, Student</h1>
        <p className="page-subtitle">Report a new issue or check the status of your existing tickets.</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="dashboard-icon">+</div>
          <h3>Report a Problem</h3>
          <p>Submit a new helpdesk ticket for an issue on campus.</p>
          <Link to="/submit-ticket" className="btn btn-primary">Submit Ticket</Link>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-icon">#</div>
          <h3>My Tickets</h3>
          <p>View and track the status of all your submitted tickets.</p>
          <Link to="/my-tickets" className="btn btn-secondary">View My Tickets</Link>
        </div>
       
      </div>

      <div className="dashboard-stats">
        <h2 className="section-title">Your Activity</h2>
        <div className="stats-row">
          <div className="stat-box"><div className="stat-label">Total</div><div className="stat-value">3</div></div>
          <div className="stat-box"><div className="stat-label">Open</div><div className="stat-value">1</div></div>
          <div className="stat-box"><div className="stat-label">In Progress</div><div className="stat-value">1</div></div>
          <div className="stat-box"><div className="stat-label">Resolved</div><div className="stat-value">1</div></div>
          <div className="stat-box"><div className="stat-label">Closed</div><div className="stat-value">0</div></div>
        </div>
      </div>
    </>
  );
}

export default DashboardHome;
