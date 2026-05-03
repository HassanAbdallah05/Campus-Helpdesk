import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTickets, updateTicketStatus } from "../api/api";
import "../styles/AdminDashboard.css";

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
  const [tickets, setTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [statusChanges, setStatusChanges] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTickets() {
    try {
      setLoading(true);
      setError("");

      const data = await getTickets(statusFilter);

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

  useEffect(() => {
    loadTickets();
  }, [statusFilter]);

  async function handleUpdate(ticketId, currentStatus) {
    const newStatus = statusChanges[ticketId] || currentStatus;

    if (newStatus === currentStatus) {
      alert("Ticket already has this status");
      return;
    }

    try {
      const data = await updateTicketStatus(ticketId, newStatus);

      if (data.ticket) {
        alert("Ticket status updated successfully");
        loadTickets();
      } else {
        alert(data.message || "Status update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

  function formatDate(dateValue) {
    if (!dateValue) return "N/A";
    return new Date(dateValue).toLocaleDateString();
  }

  function formatLocation(location) {
    if (!location) return "No location";

    return [location.college].filter(Boolean).join(" — ");
  }

  const filteredTickets = tickets.filter((ticket) => {
    const studentName = `${ticket.user_id?.fname || ""} ${
      ticket.user_id?.lname || ""
    }`;

    const text = `${ticket.ticket_code} ${ticket.title} ${
      ticket.category
    } ${studentName} ${ticket.user_id?.university_id || ""}`.toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || ticket.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "Open").length;
  const inProgress = tickets.filter((t) => t.status === "In Progress").length;
  const resolved = tickets.filter((t) => t.status === "Resolved").length;
  const closed = tickets.filter((t) => t.status === "Closed").length;

  return (
    <>
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title">Admin Panel</h1>
          </div>

          <div className="admin-toolbar">
            <input
              className="form-input"
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="admin-stats">
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
          <div className="stat-label">CLOSED</div>
          <div className="stat-value">{closed}</div>
          <div className="stat-hint">Finished</div>
        </div>
      </div>

      <div className="tickets-toolbar">
        <div className="tickets-tabs">
          {[
            { label: `All Tickets (${total})`, value: "All" },
            { label: `Open (${open})`, value: "Open" },
            { label: `In Progress (${inProgress})`, value: "In Progress" },
            { label: `Resolved (${resolved})`, value: "Resolved" },
            { label: `Closed (${closed})`, value: "Closed" },
          ].map((tab) => (
            <button
              key={tab.value}
              className={statusFilter === tab.value ? "tab active" : "tab"}
              onClick={() => setStatusFilter(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <select
          className="form-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">Category: All</option>
          <option value="IT & Equipment Support">IT & Equipment Support</option>
          <option value="Facilities">Facilities</option>
          <option value="Library">Library</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      {loading && <p>Loading tickets...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && filteredTickets.length === 0 && (
        <p>No tickets found.</p>
      )}

      <div className="admin-table-wrap card">
        <table className="admin-table">
          <thead>
            <tr>
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
            {filteredTickets.map((t) => (
              <tr key={t._id}>
                <td>
                  <strong>{t.ticket_code}</strong>
                </td>

                <td>
                  <div>
                    {t.user_id?.fname} {t.user_id?.lname}
                  </div>
                  <div className="muted">{t.user_id?.university_id}</div>
                </td>

                <td>{t.category}</td>

                <td>{formatLocation(t.location_id)}</td>

                <td>
                  <span className={statusBadgeClass(t.status)}>
                    {t.status}
                  </span>
                </td>

                <td>{formatDate(t.created_at)}</td>

                <td>
                  <select
                    className="form-select form-select-sm"
                    value={statusChanges[t._id] || t.status}
                    onChange={(e) =>
                      setStatusChanges({
                        ...statusChanges,
                        [t._id]: e.target.value,
                      })
                    }
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                    <option>Closed</option>
                  </select>
                </td>

                <td className="actions-cell">
                  <Link to={`/admin/tickets/${t._id}`} className="btn-link">
                    View
                  </Link>

                  <button
                    className="btn-link btn-link-primary"
                    onClick={() => handleUpdate(t._id, t.status)}
                  >
                    Update
                  </button>
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