import React from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/TicketDetails.css";

function AdminTicketDetailsPage() {
  const { id } = useParams();

  return (
    <>
      <div className="page-header">
        <div className="flex-between">
          <div>
            <div className="ticket-id-row">
              <span className="ticket-id-tag">{id}</span>
              <span className="badge badge-in-progress">In Progress</span>
            </div>
            <h1 className="page-title">Projector not working in Lecture Hall B3</h1>
            <p className="page-subtitle">Submitted by John Dela Cruz (STU-20250001)</p>
          </div>
          <Link to="/admin/dashboard" className="btn btn-secondary">← Back to Dashboard</Link>
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
              <div><div className="info-label">STUDENT NAME</div><div className="info-value">John Dela Cruz</div></div>
              <div><div className="info-label">STUDENT ID</div><div className="info-value">STU-20250001</div></div>
              <div><div className="info-label">LAST UPDATED</div><div className="info-value">25 Feb 2026, 04:15 PM</div></div>
              <div><div className="info-label">ASSIGNED TO</div><div className="info-value">IT Technician — Unit 3</div></div>
              <div><div className="info-label">RESPONSE SLA</div><div className="info-value">24 hours</div></div>
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
              <label className="form-label">Admin Reply</label>
              <textarea className="form-textarea" placeholder="Type your admin response here..." />
              <div className="reply-actions">
                <button className="btn btn-secondary">Attach file</button>
                <select className="form-select form-select-sm">
                  <option>Template: None</option>
                  <option>Template: Received</option>
                  <option>Template: Resolved</option>
                </select>
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
                    finish our presentation. I have already reported this to the lab assistant but the
                    issue persists. This is urgent as we have another session tomorrow morning.
                  </p>
                </div>
              </div>

              <div className="thread-msg">
                <div className="thread-avatar thread-avatar-admin">IT</div>
                <div className="thread-body">
                  <div className="thread-head">
                    <strong>IT Support Team</strong>
                    <span className="tag tag-admin">Admin</span>
                    <span className="muted">25 Feb 2026, 10:32 AM</span>
                  </div>
                  <p>
                    Thank you for your report, John. We have received your ticket and assigned it to
                    our IT technician. A staff member will check the projector in Hall B3 this
                    afternoon between 2:00 — 4:00 PM. Please ensure the room is accessible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="ticket-details-side">
          <div className="card">
            <h4 className="section-title">Admin Actions</h4>
            <div className="form-group">
              <label className="form-label">Update Status</label>
              <select className="form-select" defaultValue="In Progress">
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Assign To</label>
              <select className="form-select" defaultValue="IT Technician">
                <option>IT Technician</option>
                <option>Library Staff</option>
                <option>Facilities Team</option>
              </select>
            </div>
            <button className="btn btn-primary btn-block">Save Changes</button>
            <button className="btn btn-secondary btn-block" style={{ marginTop: 8 }}>Mark as Resolved</button>
            <button className="btn btn-secondary btn-block" style={{ marginTop: 8 }}>Close Ticket</button>
          </div>

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

          <div className="card">
            <h4 className="section-title">Assigned Staff</h4>
            <div className="staff-row">
              <div className="thread-avatar thread-avatar-admin">IT</div>
              <div>
                <strong>IT Technician</strong>
                <div className="muted">Unit 3 — IT Services</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default AdminTicketDetailsPage;
