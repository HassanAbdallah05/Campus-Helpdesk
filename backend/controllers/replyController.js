const Reply = require("../models/Reply");
const Ticket = require("../models/Ticket");

// Create a new reply
const createReply = async (req, res) => {
  try {
    const { ticket_id, message, image_path } = req.body;

    if (!ticket_id || !message) {
      return res.status(400).json({
        message: "Ticket ID and message are required",
      });
    }

    const ticket = await Ticket.findById(ticket_id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    // Student can only reply to his own ticket
    // Admin can reply to any ticket
    if (
      req.user.role_id !== 2 &&
      ticket.user_id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized to reply to this ticket",
      });
    }

    const reply = await Reply.create({
      ticket_id: ticket._id,
      sender_id: req.user._id,
      message,
      image_path: image_path || null,
    });

    res.status(201).json({
      message: "Reply added successfully",
      reply,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all replies for one ticket
const getRepliesByTicket = async (req, res) => {
  try {
    const ticket_id = req.params.ticketId;

    const ticket = await Ticket.findById(ticket_id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    // Student can only view replies for his own ticket
    // Admin can view replies for any ticket
    if (
      req.user.role_id !== 2 &&
      ticket.user_id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized to view replies for this ticket",
      });
    }

    const replies = await Reply.find({ ticket_id: ticket._id })
      .populate("sender_id", "fname lname email role_id")
      .sort({ created_at: 1 });

    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createReply,
  getRepliesByTicket,
};