const mongoose = require("mongoose");

const ticketStatusHistorySchema = new mongoose.Schema({
  ticket_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
    required: true,
  },

  changed_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  old_status: {
    type: String,
    enum: ["Open", "In Progress", "Resolved", "Closed"],
    required: true,
  },

  new_status: {
    type: String,
    enum: ["Open", "In Progress", "Resolved", "Closed"],
    required: true,
  },

  changed_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "TicketStatusHistory",
  ticketStatusHistorySchema
);