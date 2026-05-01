import React, { useRef, useState } from "react";
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

const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg"];

function SubmitTicketPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [category, setCategory] = useState("");
  const [college, setCollege] = useState("");
  const [building, setBuilding] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const studentName = user
    ? `${user.fname} ${user.lname}`
    : "Logged-in Student";

  function handleRoomNumberChange(e) {
    const value = e.target.value;

    // Allow only numbers and maximum 4 digits
    if (/^\d{0,4}$/.test(value)) {
      setRoomNumber(value);
    }
  }

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
        image: imageFile || null,
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

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) {
      setImageFile(null);
      setSelectedImageName("");
      return;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Only PNG and JPEG images are allowed.");
      setImageFile(null);
      setSelectedImageName("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    setError("");
    setImageFile(file);
    setSelectedImageName(file.name);
  }

  function handleReset() {
    setCategory("");
    setCollege("");
    setBuilding("");
    setRoomNumber("");
    setTitle("");
    setDescription("");
    setImageFile(null);
    setSelectedImageName("");
    setError("");
    setSuccess("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/dashboard">Dashboard</Link> &nbsp;/&nbsp; Report a Problem
        </div>

        <h1 className="page-title">Report a Problem</h1>

        <p className="page-subtitle">
          Fill in the form below to submit a new support ticket. Our team will
          review it shortly.
        </p>
      </div>

      <div className="submit-grid">
        <form className="card submit-form" onSubmit={handleSubmit}>
          <h3 className="section-title">New Ticket Submission</h3>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

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
              <option value="IT & Equipment Support">
                IT & Equipment Support
              </option>
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
            <label className="form-label">Room / Lab Number</label>
            <input
              className="form-input"
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={roomNumber}
              onChange={handleRoomNumberChange}
            />
            <div className="form-hint">Numbers only. Max 4 digits.</div>
          </div>

          <div className="form-group">
            <label className="form-label">Ticket Title *</label>
            <input
              className="form-input"
              type="text"
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
            <label className="form-label">Attach Image Optional</label>
            <input
              ref={fileInputRef}
              className="form-input"
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleImageChange}
            />

            <div className="form-hint">
              Allowed file types: PNG, JPG, JPEG only.
            </div>

            {selectedImageName && (
              <div className="form-hint">
                Selected file: {selectedImageName}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
            >
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
              <strong>{studentName}</strong>
            </div>

            <div className="kv">
              <span>COLLEGE</span>
              <strong>{college || "Not selected"}</strong>
            </div>

            <div className="kv">
              <span>BUILDING</span>
              <strong>{building || "Not selected"}</strong>
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
          </div>
        </aside>
      </div>
    </>
  );
}

export default SubmitTicketPage;