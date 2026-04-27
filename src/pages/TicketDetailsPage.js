import React from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/TicketDetails.css";

function TicketDetailsPage() {
  const { id } = useParams();

  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/dashboard">Dashboard</Link> &nbsp;/&nbsp;{" "}
          <Link to="/my-tickets">My Tickets</Link> &nbsp;/&nbsp; {id}
        </div>
        <div className="flex-between">
          <div>
            <div className="ticket-id-row">
              <span className="ticket-id-tag">{id}</span>
              <span className="badge badge-in-progress">In Progress</span>
            </div>
            <h1 className="page-title">Projector not working in Lecture Hall B3</h1>
          </div>
          <Link to="/my-tickets" className="btn btn-secondary">← Back to My Tickets</Link>
        </div>
      </div>

      <div className="ticket-details-grid">
        <section className="ticket-details-main">
          <div className="card">
            <h4 className="section-title">Ticket Information</h4>
            <div className="info-grid">
              <div><div className="info-label">TICKET ID</div><div className="info-value">{id}</div></div>
              <div><div className="info-label">CATEGORY</div><div className="info-value">IT Support</div></div>
              <div><div className="info-label">LOCATION</div><div className="info-value">Block B — Hall 3</div></div>
              <div><div className="info-label">STATUS</div><div className="info-value">In Progress</div></div>
              <div><div className="info-label">DATE SUBMITTED</div><div className="info-value">25 Feb 2026</div></div>
              <div><div className="info-label">LAST UPDATED</div><div className="info-value">25 Feb 2026, 04:15 PM</div></div>
           
            </div>

            <div className="attached-image">
              <div className="info-label">ATTACHED IMAGE</div>
              <div className="image-placeholder">IMG PREVIEW</div>
            </div>
          </div>

          <div className="card">
            <div className="flex-between">
              <h4 className="section-title">Conversation Thread</h4>
              <span className="muted">4 messages</span>
            </div>

            <div className="reply-box">
              <label className="form-label">Your Reply</label>
              <textarea className="form-textarea" placeholder="Type your reply here..." />
              <div className="reply-actions">
                <button className="btn btn-secondary">Attach File</button>
                <button className="btn btn-primary">[ Send Reply ] →</button>
              </div>
            </div>

            <div className="thread">
              <div className="thread-msg">
                <div className="thread-avatar">JD</div>
                <div className="thread-body">
                  <div className="thread-head">
                    <strong>John Dela Cruz</strong>
                    <span className="tag">Student</span>
                    <span className="muted">25 Feb 2026, 09:14 AM</span>
                  </div>
                  <p>
                    The projector in Lecture Hall B3 stopped working mid-class. We were not able to
                    finish our presentation. I have already reported this to the lab assistant but
                    the issue persists. This is urgent as we have another session tomorrow morning.
                  </p>
                </div>
              </div>

              <div className="thread-msg">
                <div className="thread-avatar thread-avatar-admin">IT</div>
                <div className="thread-body">
                  <div className="thread-head">
                    <span className="tag tag-admin">Admin</span>
                    <span className="muted">25 Feb 2026, 10:32 AM</span>
                  </div>
                  <p>
                    Thank you for your report, John. We have received your ticket and assigned it to
                    our IT Technician. A staff member will check the projector in Hall B3 this
                    afternoon between 2:00 — 4:00 PM. Please ensure the room is accessible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="ticket-details-side">
          <div className="card">
            <h4 className="section-title">Status Timeline</h4>
            <ul className="timeline">
              <li className="done"><div>Submitted</div><span>25 Feb 2026, 09:14 AM</span></li>
              <li className="done"><div>Under Review</div><span>25 Feb 2026, 10:32 AM</span></li>
              <li className="active"><div>In Progress</div><span>25 Feb 2026, 04:15 PM</span></li>
              <li><div>Resolved</div><span>Pending</span></li>
              <li><div>Closed</div><span>Pending</span></li>
            </ul>
          </div>

        </aside>
      </div>
    </>
  );
}

export default TicketDetailsPage;
