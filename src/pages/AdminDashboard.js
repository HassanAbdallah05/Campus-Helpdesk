import React from "react";
import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css";

const DUMMY_TICKETS = [
  {
    id: "TKT-0042",
    student: "John Dela Cruz",
    studentId: "STU-20250001",
    category: "IT Support",
    location: "Block B — Hall 3",
    status: "In Progress",
    date: "25 Feb 2026",
    assignee: "IT Technician",
  },
  {
    id: "TKT-0041",
    student: "Maria Santos",
    studentId: "STU-20250007",
    category: "Facilities",
    location: "Main Library — F2",
    status: "Open",
    date: "24 Feb 2026",
    assignee: "—",
  },
  {
    id: "TKT-0039",
    student: "Ana Lim",
    studentId: "STU-20250301",
    category: "Library",
    location: "Online Portal",
    status: "In Progress",
    date: "23 Feb 2026",
    assignee: "Library Staff",
  },
  {
    id: "TKT-0037",
    student: "Rosa Mendoza",
    studentId: "STU-20250206",
    category: "IT Support",
    location: "Computer Lab 204",
    status: "Resolved",
    date: "20 Feb 2026",
    assignee: "IT Technician",
  },
];

const statusBadgeClass = (s) => {
  const map = {
    Open: "badge badge-open",
    "In Progress": "badge badge-in-progress",
    Resolved: "badge badge-resolved",
    Closed: "badge badge-closed",
  };
  return map[s] || "badge";
};

function AdminDashboard() {
  return (
    <>
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">Admin Panel</h1>
            <p className="page-subtitle">
              Manage, assign, and update all helpdesk tickets across the university.
            </p>
          </div>
          <div className="admin-toolbar">
            <input className="form-input" type="text" placeholder="Search tickets..." />
            <button className="btn btn-secondary">Export CSV</button>
          </div>
        </div>
      </div>

      <div className="admin-stats">
        <div className="stat-box">
          <div className="stat-label">TOTAL TICKETS</div>
          <div className="stat-value">4</div>
          <div className="stat-hint">All time</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">OPEN</div>
          <div className="stat-value">1</div>
          <div className="stat-hint">Awaiting action</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">IN PROGRESS</div>
          <div className="stat-value">2</div>
          <div className="stat-hint">Being handled</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">RESOLVED</div>
          <div className="stat-value">1</div>
          <div className="stat-hint">Completed</div>
        </div>
      </div>

      <div className="tickets-toolbar">
        <div className="tickets-tabs">
          <button className="tab active">All Tickets (4)</button>
          <button className="tab">Open (1)</button>
          <button className="tab">In Progress (2)</button>
          <button className="tab">Resolved (1)</button>
          <button className="tab">Closed (0)</button>
        </div>
        <select className="form-select">
          <option>Category: All</option>
          <option>IT Support</option>
          <option>Facilities</option>
          <option>Library</option>
          <option>Other</option>
        </select>
      </div>

      <div className="admin-table-wrap card">
        <table className="admin-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>TICKET ID</th>
              <th>STUDENT NAME</th>
              <th>CATEGORY</th>
              <th>LOCATION</th>
              <th>STATUS</th>
              <th>DATE SUBMITTED</th>
              <th>UPDATE STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {DUMMY_TICKETS.map((t) => (
              <tr key={t.id}>
                <td><input type="checkbox" /></td>
                <td><strong>{t.id}</strong></td>
                <td>
                  <div>{t.student}</div>
                  <div className="muted">{t.studentId}</div>
                </td>
                <td>{t.category}</td>
                <td>{t.location}</td>
                <td><span className={statusBadgeClass(t.status)}>{t.status}</span></td>
                <td>{t.date}</td>
               
                <td>
                  <select className="form-select form-select-sm" defaultValue={t.status}>
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                    <option>Closed</option>
                  </select>
                </td>
                <td className="actions-cell">
                  <Link to={`/admin/tickets/${t.id}`} className="btn-link">View</Link>
                  <button className="btn-link btn-link-primary">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminDashboard;
