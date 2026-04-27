import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SubmitTicket.css";

function SubmitTicketPage() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/tickets/TKT-2600");
  };

  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/dashboard">Dashboard</Link> &nbsp;/&nbsp; Report a Problem
        </div>
        <h1 className="page-title">Report a Problem</h1>
        <p className="page-subtitle">
          Fill in the form below to submit a new support ticket. Our team will review it shortly.
        </p>
      </div>

      <div className="submit-grid">
        <form className="card submit-form" onSubmit={handleSubmit}>
          <h3 className="section-title">New Ticket Submission</h3>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select className="form-select" defaultValue="">
                <option value="" disabled>Select a category...</option>
                <option>IT & Equipment Support</option>
                <option>Facilities</option>
                <option>Library</option>
                <option>Maintenance</option>

              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Location *</label>
              <select className="form-select" defaultValue="">
                <option value="" disabled>Select a location...</option>
                <option>Block A</option>
                <option>Main Library</option>
                <option>Block B — Hall 3</option>
                <option>Block C — Lab 204</option>
                <option>Cafeteria</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Ticket Title *</label>
            <input className="form-input" type="text" placeholder="Brief description of the issue..." maxLength={100} />
            <div className="form-hint">Max 100 characters</div>
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              className="form-textarea"
             
              maxLength={500}
            />
            <div className="form-hint">Max 500 characters</div>
          </div>

          <div className="form-group">
            <label className="form-label">Attach Image (Optional)</label>
            <div className="upload-box">
              <div className="upload-icon">⬆</div>
              <div>Drag &amp; drop image here, or</div>
              <button type="button" className="btn btn-secondary">[ Browse File ]</button>
              <div className="form-hint">Supported: JPG, PNG, PDF &middot; Max 5MB</div>
            </div>
          </div>

          <div className="form-actions">
            <button type="reset" className="btn btn-secondary">[ Reset Form ]</button>
            <button type="submit" className="btn btn-primary">[ Submit Ticket ] →</button>
          </div>
        </form>

        <aside className="submit-sidebar">
          <div className="card sidebar-section">
            <h4>Submission Info</h4>
            <div className="kv"><span>SUBMITTED BY</span><strong>Student Name</strong></div>
            <div className="kv"><span>STUDENT ID</span><strong>STU-20250001</strong></div>
            <div className="kv"><span>DATE</span><strong>26 Feb 2026</strong></div>
            <div className="kv"><span>STATUS</span><strong>In progress</strong></div>
          </div>

          <div className="card sidebar-section">
            <h4>Categories</h4>
            <ul className="cat-list">
              <li>IT & Equipment Support</li>
              <li>Facilities</li>
              <li>Library</li>
              <li>Maintenance</li>
            </ul>
            <Link to="/my-tickets" className="btn btn-secondary btn-block">View My Tickets →</Link>
          </div>
        </aside>
      </div>
    </>
  );
}

export default SubmitTicketPage;
