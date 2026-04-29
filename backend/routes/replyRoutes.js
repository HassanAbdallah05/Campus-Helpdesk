const express = require("express");
const router = express.Router();

const {
  createReply,
  getRepliesByTicket,
} = require("../controllers/replyController");

const { protect } = require("../middleware/authMiddleware");

// Add reply
router.post("/", protect, createReply);

// Get replies for one ticket
router.get("/:ticketId", protect, getRepliesByTicket);

module.exports = router;