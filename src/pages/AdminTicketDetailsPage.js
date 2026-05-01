import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getTicketById,
  getTicketHistory,
  updateTicketStatus,
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

const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg"];

function AdminTicketDetailsPage() {
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [ticket, setTicket] = useState(null);
  const [history, setHistory] = useState([]);
  const [replies, setReplies] = useState([]);

  const [replyMessage, setReplyMessage] = useState("");
  const [replyImageFile, setReplyImageFile] = useState(null);
  const [selectedReplyImageName, setSelectedReplyImageName] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  async function loadTicketDetails() {
    try {
      setLoading(true);
      setError("");

      const ticketData = await getTicketById(id);
      const historyData = await getTicketHistory(id);
      const repliesData = await getRepliesByTicket(id);

      if (ticketData._id) {
        setTicket(ticketData);
        setSelectedStatus(ticketData.status);
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

  function handleReplyImageChange(e) {
    const file = e.target.files[0];

    if (!file) {
      setReplyImageFile(null);
      setSelectedReplyImageName("");
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      alert("Only PNG and JPEG images are allowed.");

      setReplyImageFile(null);
      setSelectedReplyImageName("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setReplyImageFile(file);
    setSelectedReplyImageName(file.name);
  }

  async function handleStatusUpdate() {
    if (!selectedStatus) {
      alert("Please select a status");
      return;
    }

    if (selectedStatus === ticket.status) {
      alert("Ticket already has this status");
      return;
    }

    try {
      const data = await updateTicketStatus(id, selectedStatus);

      if (data.ticket) {
        alert("Ticket status updated successfully");
        loadTicketDetails();
      } else {
        alert(data.message || "Status update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

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
        image: replyImageFile,
      });

      if (data.reply) {
        setReplyMessage("");
        setReplyImageFile(null);
        setSelectedReplyImageName("");

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

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
    return <p>Loading admin ticket details...</p>;
  }

  if (error) {
    return (
      <>
        <p style={{ color: "red" }}>{error}</p>
        <Link to="/admin/dashboard" className="btn btn-secondary">
          ← Back to Dashboard
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
        <div className="flex-between">
          <div>
            <div className="ticket-id-row">
              <span className="ticket-id-tag">{ticket.ticket_code}</span>
              <span className={statusBadgeClass(ticket.status)}>
                {ticket.status}
              </span>
            </div>

            <h1 className="page-title">{ticket.title}</h1>

            <p className="page-subtitle">
              Submitted by {ticket.user_id?.fname} {ticket.user_id?.lname} (
              {ticket.user_id?.university_id})
            </p>
          </div>

          <Link to="/admin/dashboard" className="btn btn-secondary">
            ← Back to Dashboard
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
                <div className="info-label">COLLEGE</div>
                <div className="info-value">
                  {ticket.location_id?.college || "N/A"}
                </div>
              </div>

              <div>
                <div className="info-label">BUILDING</div>
                <div className="info-value">
                  {ticket.location_id?.building || "N/A"}
                </div>
              </div>

              <div>
                <div className="info-label">ROOM / LAB</div>
                <div className="info-value">
                  {ticket.location_id?.room_number || "N/A"}
                </div>
              </div>

              <div>
                <div className="info-label">STATUS</div>
                <div className="info-value">{ticket.status}</div>
              </div>

              <div>
                <div className="info-label">DATE SUBMITTED</div>
                <div className="info-value">
                  {formatDate(ticket.created_at)}
                </div>
              </div>

              <div>
                <div className="info-label">LAST UPDATED</div>
                <div className="info-value">
                  {formatDate(ticket.updated_at)}
                </div>
              </div>

              <div>
                <div className="info-label">STUDENT NAME</div>
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

              <div>
                <div className="info-label">STUDENT EMAIL</div>
                <div className="info-value">
                  {ticket.user_id?.email || "N/A"}
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
                <img
                  src={`http://localhost:5001${ticket.image_path}`}
                  alt="Ticket attachment"
                  className="clickable-preview-image"
                  onClick={() =>
                    setPreviewImage(`http://localhost:5001${ticket.image_path}`)
                  }
                />
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

            <form className="reply-box-modern" onSubmit={handleSendReply}>
              <label className="form-label">Admin Reply</label>

              <textarea
                className="form-textarea reply-textarea-modern"
                placeholder="Type your admin response here..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
              />

              <div className="reply-bottom-actions">
                <div className="reply-upload-area">
                  <label className="upload-corner-btn">
                    Choose Image
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg"
                      onChange={handleReplyImageChange}
                      hidden
                    />
                  </label>

                  <div className="reply-file-note">
                    {selectedReplyImageName ? (
                      <span>Selected file: {selectedReplyImageName}</span>
                    ) : (
                      <span>Allowed attachment types: PNG, JPG, JPEG only.</span>
                    )}
                  </div>
                </div>

                <button className="btn btn-primary" type="submit">
                  [ Send Reply ] →
                </button>
              </div>
            </form>

            <div className="thread">
              {replies.length === 0 && <p className="muted">No replies yet.</p>}

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
                        <img
                          src={`http://localhost:5001${reply.image_path}`}
                          alt="Reply attachment"
                          className="reply-image-preview clickable-preview-image"
                          onClick={() =>
                            setPreviewImage(
                              `http://localhost:5001${reply.image_path}`
                            )
                          }
                        />
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
            <h4 className="section-title">Admin Actions</h4>

            <div className="form-group">
              <label className="form-label">Update Status</label>
              <select
                className="form-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
            </div>

            <button
              className="btn btn-primary btn-block"
              onClick={handleStatusUpdate}
            >
              Save Changes
            </button>
          </div>

          <div className="card">
            <h4 className="section-title">Status Timeline</h4>

            <ul className="timeline">
              {["Open", "In Progress", "Resolved", "Closed"].map((status) => {
                const statusOrder = [
                  "Open",
                  "In Progress",
                  "Resolved",
                  "Closed",
                ];

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

      {previewImage && (
        <div
          className="image-preview-overlay"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="image-preview-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="image-preview-close"
              type="button"
              onClick={() => setPreviewImage(null)}
            >
              ×
            </button>

            <img src={previewImage} alt="Preview" />
          </div>
        </div>
      )}
    </>
  );
}

export default AdminTicketDetailsPage;