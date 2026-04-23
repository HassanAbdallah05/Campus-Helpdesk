import React from "react";
import { Link } from "react-router-dom";
import "../styles/MyTicket.css";

const DUMMY_TICKETS = [
  {
    id: "TKT-0042",
    title: "Projector not working in Lecture Hall B3",
    category: "IT Support",
    location: "Block B — Hall 3",
    date: "25 Feb 2026",
    status: "In Progress",
  },
  {
    id: "TKT-0039",
    title: "Air conditioning broken in Library Reading Room",
    category: "Facilities",
    location: "Main Library — Floor 2",
    date: "23 Feb 2026",
    status: "Open",
  },
  {
    id: "TKT-0031",
    title: "Cannot access online database portal",
    category: "Library",
    location: "Student Portal (Online)",
    date: "18 Feb 2026",
    status: "Resolved",
  },
  {
    id: "TKT-0021",
    title: "Broken chair in Computer Lab 204",
    category: "Facilities",
    location: "Block C — Lab 204",
    date: "02 Feb 2026",
    status: "Resolved",
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

function MyTicketPage() {
  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/dashboard">Dashboard</Link> &nbsp;/&nbsp; My Tickets
        </div>
        <div className="flex-between">
          <div>
            <h1 className="page-title">My Tickets</h1>
            <p className="page-subtitle">Track and manage all your submitted support requests.</p>
          </div>
          <Link to="/submit-ticket" className="btn btn-primary">+ Submit New Ticket</Link>
        </div>
      </div>

      <div className="tickets-stats">
        <div className="stat-box"><div className="stat-value">4</div><div className="stat-label">Total</div></div>
        <div className="stat-box"><div className="stat-value">1</div><div className="stat-label">Open</div></div>
        <div className="stat-box"><div className="stat-value">1</div><div className="stat-label">In Progress</div></div>
        <div className="stat-box"><div className="stat-value">2</div><div className="stat-label">Resolved</div></div>
        <div className="stat-box"><div className="stat-value">0</div><div className="stat-label">Closed</div></div>
      </div>

      <div className="tickets-toolbar">
        <div className="tickets-tabs">
          <button className="tab active">All</button>
          <button className="tab">Open</button>
          <button className="tab">In Progress</button>
          <button className="tab">Resolved</button>
          <button className="tab">Closed</button>
        </div>
        <div className="tickets-search">
          <input className="form-input" type="text" placeholder="Search tickets..." />
          <select className="form-select">
            <option>Sort: Newest</option>
            <option>Sort: Oldest</option>
          </select>
        </div>
      </div>

      <div className="tickets-list">
        {DUMMY_TICKETS.map((t) => (
          <div className="ticket-row" key={t.id}>
            <div className="ticket-col ticket-col-id">
              <div className="col-label">TICKET ID</div>
              <div className="col-value">{t.id}</div>
            </div>
            <div className="ticket-col ticket-col-main">
              <div className="ticket-title">{t.title}</div>
              <div className="ticket-meta">
                {t.category} &middot; {t.location} &middot; {t.date}
              </div>
            </div>
            <div className="ticket-col">
              <div className="col-label">STATUS</div>
              <span className={statusBadgeClass(t.status)}>{t.status}</span>
            </div>
            <div className="ticket-col ticket-col-action">
              <Link to={`/tickets/${t.id}`} className="btn btn-secondary">View Details →</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="tickets-pagination">
        <span className="pagination-info">Showing 4 of 4 tickets</span>
        <div className="pagination-controls">
          <button className="tab">←</button>
          <button className="tab active">1</button>
          <button className="tab">→</button>
        </div>
      </div>
    </>
  );
}

export default MyTicketPage;
