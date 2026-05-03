import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTickets } from "../api/api";
import "../styles/MyTicket.css";

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
  const [tickets, setTickets] = useState([]); // stores tickets from backend
  const [statusFilter, setStatusFilter] = useState("All"); // filter by status
  const [search, setSearch] = useState(""); // search input
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(""); // error message

  useEffect(() => {
    async function loadTickets() {
      try {
        setLoading(true);
        setError("");

        const data = await getTickets(statusFilter); // GET /api/tickets

        if (Array.isArray(data)) {
          setTickets(data);
        } else {
          setError(data.message || "Failed to load tickets");
        }
      } catch (err) {
        console.error(err);
        setError("Server error");
      } finally {
        setLoading(false);
      }
    }

    loadTickets();
  }, [statusFilter]);

  const filteredTickets = tickets.filter((ticket) => {
    const text = `${ticket.ticket_code} ${ticket.title} ${ticket.category} ${ticket.description}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "Open").length;
  const inProgress = tickets.filter((t) => t.status === "In Progress").length;
  const resolved = tickets.filter((t) => t.status === "Resolved").length;
  const closed = tickets.filter((t) => t.status === "Closed").length;

  function formatDate(dateValue) {
    if (!dateValue) return "N/A";
    return new Date(dateValue).toLocaleDateString();
  }

  function formatLocation(location) {
    if (!location) return "No location";

    const parts = [
      location.college,
      location.building,
      location.room_number,
    ].filter(Boolean);

    return parts.join(" — ");
  }

  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/dashboard">Dashboard</Link> &nbsp;/&nbsp; My Tickets
        </div>

        <div className="flex-between">
          <div>
            <h1 className="page-title">My Tickets</h1>
            <p className="page-subtitle">
              Track and manage all your submitted support requests.
            </p>
          </div>

          <Link to="/submit-ticket" className="btn btn-primary">
            + Submit New Ticket
          </Link>
        </div>
      </div>

      <div className="tickets-stats">
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

      <div className="tickets-toolbar">
        <div className="tickets-tabs">
          {["All", "Open", "In Progress", "Resolved", "Closed"].map((status) => (
            <button
              key={status}
              className={statusFilter === status ? "tab active" : "tab"}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="tickets-search">
          <input
            className="form-input"
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>
      </div>

      {loading && <p>Loading tickets...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && filteredTickets.length === 0 && (
        <p>No tickets found.</p>
      )}

      <div className="tickets-list">
        {filteredTickets.map((t) => (
          <div className="ticket-row" key={t._id}>
            <div className="ticket-col ticket-col-id">
              <div className="col-label">TICKET ID</div>
              <div className="col-value">{t.ticket_code}</div>
            </div>

            <div className="ticket-col ticket-col-main">
              <div className="ticket-title">{t.title}</div>
              <div className="ticket-meta">
                {t.category} &middot; {formatLocation(t.location_id)} &middot;{" "}
                {formatDate(t.created_at)}
              </div>
            </div>

            <div className="ticket-col">
              <div className="col-label">STATUS</div>
              <span className={statusBadgeClass(t.status)}>{t.status}</span>
            </div>

            <div className="ticket-col ticket-col-action">
              <Link to={`/tickets/${t._id}`} className="btn btn-secondary">
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="tickets-pagination">
        <span className="pagination-info">
          Showing {filteredTickets.length} of {tickets.length} tickets
        </span>

      
      </div>
    </>
  );
}

export default MyTicketPage;