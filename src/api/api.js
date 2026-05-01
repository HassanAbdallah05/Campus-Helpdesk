const API_URL = "http://localhost:5001/api/auth";
const TICKET_API_URL = "http://localhost:5001/api/tickets";
const REPLY_API_URL = "http://localhost:5001/api/replies";

// LOGIN
export async function loginUser(userData) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return res.json();
}

// REGISTER
export async function registerUser(userData) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return res.json();
}

// CREATE TICKET WITH IMAGE UPLOAD
export async function createTicket(ticketData) {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("category", ticketData.category);
  formData.append("title", ticketData.title);
  formData.append("description", ticketData.description);
  formData.append("college", ticketData.college);
  formData.append("building", ticketData.building);

  if (ticketData.room_number) {
    formData.append("room_number", ticketData.room_number);
  }

  if (ticketData.image) {
    formData.append("image", ticketData.image);
  }

  const res = await fetch(TICKET_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
}

// GET TICKETS
export async function getTickets(status = "All") {
  const token = localStorage.getItem("token");

  const res = await fetch(`${TICKET_API_URL}?status=${status}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

// GET ONE TICKET
export async function getTicketById(id) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${TICKET_API_URL}/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

// GET TICKET HISTORY
export async function getTicketHistory(id) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${TICKET_API_URL}/${id}/history`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

// UPDATE TICKET STATUS
export async function updateTicketStatus(id, status) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${TICKET_API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  return res.json();
}

// CREATE REPLY WITH OPTIONAL IMAGE UPLOAD
export async function createReply(replyData) {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("ticket_id", replyData.ticket_id);
  formData.append("message", replyData.message);

  if (replyData.image) {
    formData.append("image", replyData.image);
  }

  const res = await fetch(REPLY_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
}

// GET REPLIES FOR ONE TICKET
export async function getRepliesByTicket(ticketId) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${REPLY_API_URL}/${ticketId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}