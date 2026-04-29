const express = require("express");
const router = express.Router();

const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  getTicketHistory,
} = require("../controllers/ticketController");

const { protect } = require("../middleware/authMiddleware");

// Create ticket
router.post("/", protect, createTicket);

// Get all tickets
router.get("/", protect, getAllTickets);

// Get ticket status history
router.get("/:id/history", protect, getTicketHistory);

// Get single ticket
router.get("/:id", protect, getTicketById);

// Update ticket status
router.put("/:id", protect, updateTicket);

module.exports = router;