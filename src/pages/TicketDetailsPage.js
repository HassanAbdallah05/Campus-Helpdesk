import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getTicketById,
  getTicketHistory,
  getRepliesByTicket,
  createReply,
} from "../api/api";
import "../styles/TicketDetails.css";

const statusBadgeClass = (status) => {
  const map = {
    Open: "badge badge-open",
    "In Progress": "badge badge-in-progress",
    Resolved: "badge badge-resolved",
    Closed: "badge badge-closed",
  };

  return map[status] || "badge";
};

function TicketDetailsPage() {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [history, setHistory] = useState([]);
  const [replies, setReplies] = useState([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTicketDetails() {
    try {
      setLoading(true);
      setError("");

      const ticketData = await getTicketById(id);
      const historyData = await getTicketHistory(id);
      const repliesData = await getRepliesByTicket(id);

      if (ticketData._id) {
        setTicket(ticketData);
      } else {
        setError(ticketData.message || "Ticket not found");
      }

      if (Array.isArray(historyData)) {
        setHistory(historyData);
      }

      if (Array.isArray(repliesData)) {
        setReplies(repliesData);
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTicketDetails();
  }, [id]);

  async function handleSendReply(e) {
    e.preventDefault();

    if (!replyMessage.trim()) {
      alert("Please write a reply first");
      return;
    }

    try {
      const data = await createReply({
        ticket_id: id,
        message: replyMessage,
        image_path: null,
      });

      if (data.reply) {
        setReplyMessage("");
        loadTicketDetails();
      } else {
        alert(data.message || "Failed to send reply");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

  function formatDate(dateValue) {
    if (!dateValue) return "N/A";
    return new Date(dateValue).toLocaleString();
  }

  function formatLocation(location) {
    if (!location) return "No location";

    return [location.college, location.building, location.room_number]
      .filter(Boolean)
      .join(" — ");
  }

  function getInitials(user) {
    if (!user) return "U";

    const first = user.fname?.charAt(0) || "";
    const last = user.lname?.charAt(0) || "";

    return `${first}${last}`.toUpperCase() || "U";
  }

  function getStatusDate(status) {
    if (status === "Open") {
      return formatDate(ticket.created_at);
    }

    const item = history.find((h) => h.new_status === status);
    return item ? formatDate(item.changed_at) : "Pending";
  }

  if (loading) {
    return <p>Loading ticket details...</p>;
  }

  if (error) {
    return (
      <>
        <p style={{ color: "red" }}>{error}</p>
        <Link to="/my-tickets" className="btn btn-secondary">
          ← Back to My Tickets
        </Link>
      </>
    );
  }

  if (!ticket) {
    return <p>No ticket found.</p>;
  }

  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/dashboard">Dashboard</Link> &nbsp;/&nbsp;
          <Link to="/my-tickets">My Tickets</Link> &nbsp;/&nbsp;
          {ticket.ticket_code}
        </div>

        <div className="flex-between">
          <div>
            <div className="ticket-id-row">
              <span className="ticket-id-tag">{ticket.ticket_code}</span>
              <span className={statusBadgeClass(ticket.status)}>
                {ticket.status}
              </span>
            </div>

            <h1 className="page-title">{ticket.title}</h1>
          </div>

          <Link to="/my-tickets" className="btn btn-secondary">
            ← Back to My Tickets
          </Link>
        </div>
      </div>

      <div className="ticket-details-grid">
        <section className="ticket-details-main">
          <div className="card">
            <h4 className="section-title">Ticket Information</h4>

            <div className="info-grid">
              <div>
                <div className="info-label">TICKET ID</div>
                <div className="info-value">{ticket.ticket_code}</div>
              </div>

              <div>
                <div className="info-label">CATEGORY</div>
                <div className="info-value">{ticket.category}</div>
              </div>

              <div>
                <div className="info-label">LOCATION</div>
                <div className="info-value">
                  {formatLocation(ticket.location_id)}
                </div>
              </div>

              <div>
                <div className="info-label">STATUS</div>
                <div className="info-value">{ticket.status}</div>
              </div>

              <div>
                <div className="info-label">DATE SUBMITTED</div>
                <div className="info-value">{formatDate(ticket.created_at)}</div>
              </div>

              <div>
                <div className="info-label">LAST UPDATED</div>
                <div className="info-value">{formatDate(ticket.updated_at)}</div>
              </div>

              <div>
                <div className="info-label">SUBMITTED BY</div>
                <div className="info-value">
                  {ticket.user_id?.fname} {ticket.user_id?.lname}
                </div>
              </div>

              <div>
                <div className="info-label">STUDENT ID</div>
                <div className="info-value">
                  {ticket.user_id?.university_id || "N/A"}
                </div>
              </div>
            </div>

            <div className="attached-image">
              <div className="info-label">DESCRIPTION</div>
              <p>{ticket.description}</p>
            </div>

            <div className="attached-image">
              <div className="info-label">ATTACHED IMAGE</div>
              {ticket.image_path ? (
                <div className="image-placeholder">{ticket.image_path}</div>
              ) : (
                <div className="image-placeholder">No attachment</div>
              )}
            </div>
          </div>

          <div className="card">
            <div className="flex-between">
              <h4 className="section-title">Conversation</h4>
              <span className="muted">{replies.length} replies</span>
            </div>

            <form className="reply-box" onSubmit={handleSendReply}>
              <label className="form-label">Your Reply</label>
              <textarea
                className="form-textarea"
                placeholder="Type your reply here..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
              />

              <div className="reply-actions">
                <button className="btn btn-secondary" type="button" disabled>
                  Attach File
                </button>
                <button className="btn btn-primary" type="submit">
                  [ Send Reply ] →
                </button>
              </div>
            </form>

            <div className="thread">
              {replies.length === 0 && (
                <p className="muted">No replies yet.</p>
              )}

              {replies.map((reply) => {
                const isAdmin = reply.sender_id?.role_id === 2;

                return (
                  <div className="thread-msg" key={reply._id}>
                    <div
                      className={
                        isAdmin
                          ? "thread-avatar thread-avatar-admin"
                          : "thread-avatar"
                      }
                    >
                      {isAdmin ? "AD" : getInitials(reply.sender_id)}
                    </div>

                    <div className="thread-body">
                      <div className="thread-head">
                        <strong>
                          {reply.sender_id?.fname} {reply.sender_id?.lname}
                        </strong>

                        <span className={isAdmin ? "tag tag-admin" : "tag"}>
                          {isAdmin ? "Admin" : "Student"}
                        </span>

                        <span className="muted">
                          {formatDate(reply.created_at)}
                        </span>
                      </div>

                      <p>{reply.message}</p>

                      {reply.image_path && (
                        <div className="image-placeholder">
                          {reply.image_path}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <aside className="ticket-details-side">
          <div className="card">
            <h4 className="section-title">Status Timeline</h4>

            <ul className="timeline">
              {["Open", "In Progress", "Resolved", "Closed"].map((status) => {
                const statusOrder = ["Open", "In Progress", "Resolved", "Closed"];
                const currentIndex = statusOrder.indexOf(ticket.status);
                const statusIndex = statusOrder.indexOf(status);

                const isDone = statusIndex < currentIndex;
                const isActive = statusIndex === currentIndex;

                return (
                  <li
                    key={status}
                    className={isActive ? "active" : isDone ? "done" : ""}
                  >
                    <div>{status}</div>
                    <span>
                      {isDone || isActive ? getStatusDate(status) : "Pending"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

export default TicketDetailsPage;