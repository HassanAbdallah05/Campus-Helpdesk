import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createTicket } from "../api/api";
import "../styles/SubmitTicket.css";

const COLLEGES = [
  "College of Education",
  "College of Law",
  "College of Public Health",
  "College of Life Sciences",
  "College of Social Sciences",
  "College of Allied Health Sciences",
  "College of Science",
  "College of Pharmacy",
  "College of Graduate Studies",
  "College of Medicine",
  "College of Arts",
  "College of Dentistry",
  "College of Engineering and Petroleum",
  "College of Sharia and Islamic Studies",
  "College of Architecture",
  "College of Business Administration",
];

const BUILDINGS = ["Building A", "Building B", "Building C", "Building D"];

function SubmitTicketPage() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [college, setCollege] = useState("");
  const [building, setBuilding] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const data = await createTicket({
        category,
        title,
        description,
        college,
        building,
        room_number: roomNumber || null,
        image_path: imagePath || null,
      });

      if (data.ticket) {
        setSuccess("Ticket submitted successfully");
        navigate(`/tickets/${data.ticket._id}`);
      } else {
        setError(data.message || "Ticket submission failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  }

  function handleReset() {
    setCategory("");
    setCollege("");
    setBuilding("");
    setRoomNumber("");
    setTitle("");
    setDescription("");
    setImagePath("");
    setError("");
    setSuccess("");
  }

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

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select a category...
                </option>
                <option value="IT & Equipment Support">IT & Equipment Support</option>
                <option value="Facilities">Facilities</option>
                <option value="Library">Library</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">College *</label>
              <select
                className="form-select"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select a college...
                </option>

                {COLLEGES.map((collegeName) => (
                  <option key={collegeName} value={collegeName}>
                    {collegeName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Building *</label>
              <select
                className="form-select"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select a building...
                </option>

                {BUILDINGS.map((buildingName) => (
                  <option key={buildingName} value={buildingName}>
                    {buildingName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Room Number</label>
              <input
                className="form-input"
                type="text"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Ticket Title *</label>
            <input
              className="form-input"
              type="text"
              placeholder="Brief description of the issue..."
              maxLength={100}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div className="form-hint">Max 100 characters</div>
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea
              className="form-textarea"
              maxLength={500}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div className="form-hint">Max 500 characters</div>
          </div>

          <div className="form-group">
            <label className="form-label">Image Path / Attachment Path Optional</label>
            <input
              className="form-input"
              type="text"
              placeholder="e.g. /uploads/image.png"
              value={imagePath}
              onChange={(e) => setImagePath(e.target.value)}
            />
            <div className="form-hint">
              Current backend accepts image_path as text. File upload can be added later.
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              [ Reset Form ]
            </button>
            <button type="submit" className="btn btn-primary">
              [ Submit Ticket ] →
            </button>
          </div>
        </form>

        <aside className="submit-sidebar">
          <div className="card sidebar-section">
            <h4>Submission Info</h4>
            <div className="kv">
              <span>SUBMITTED BY</span>
              <strong>Logged-in Student</strong>
            </div>
            <div className="kv">
              <span>STATUS</span>
              <strong>Open</strong>
            </div>
          </div>

          <div className="card sidebar-section">
            <h4>Categories</h4>
            <ul className="cat-list">
              <li>IT & Equipment Support</li>
              <li>Facilities</li>
              <li>Library</li>
              <li>Maintenance</li>
            </ul>
            <Link to="/my-tickets" className="btn btn-secondary btn-block">
              View My Tickets →
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

export default SubmitTicketPage;