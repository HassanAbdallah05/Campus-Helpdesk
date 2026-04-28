const Ticket = require("../models/Ticket");
const TicketStatusHistory = require("../models/TicketStatusHistory");

const generateTicketCode = async () => {
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const ticketCode = `TK-${randomNumber}`;

  const existingTicket = await Ticket.findOne({ ticket_code: ticketCode });

  if (existingTicket) {
    return generateTicketCode();
  }

  return ticketCode;
};

// Create ticket
const createTicket = async (req, res) => {
  try {
    const { categoryh, title, description, location_id, image_path } = req.body;

    if (!category || !title || !description || !location_id) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const ticketCode = await generateTicketCode();

    const ticket = await Ticket.create({
      ticket_code: ticketCode,
      user_id: req.user._id,
      category,
      title,
      description,
      location_id,
      image_path: image_path || null,
      status: "Open",
    });

    res.status(201).json({
      message: "Ticket submitted successfully",
      ticket_code: ticket.ticket_code,
      ticket,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get tickets with optional status filter
const getAllTickets = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};

    if (req.user.role_id !== 2) {
      filter.user_id = req.user._id;
    }

    if (status && status !== "All") {
      filter.status = status;
    }

    const tickets = await Ticket.find(filter)
      .populate("user_id", "fname lname email university_id")
      .populate("location_id")
      .sort({ created_at: -1 });

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get one ticket
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("user_id", "fname lname email university_id")
      .populate("location_id");

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    if (
      req.user.role_id !== 2 &&
      ticket.user_id._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized to access this ticket",
      });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update ticket status - Admin only
const updateTicket = async (req, res) => {
  try {
    const { status } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    if (req.user.role_id !== 2) {
      return res.status(403).json({
        message: "Only admin can update ticket status",
      });
    }

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    const validStatuses = ["Open", "In Progress", "Resolved", "Closed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const oldStatus = ticket.status;

    if (status === oldStatus) {
      return res.status(400).json({
        message: "Ticket already has this status",
      });
    }

    ticket.status = status;

    await TicketStatusHistory.create({
      ticket_id: ticket._id,
      changed_by: req.user._id,
      old_status: oldStatus,
      new_status: status,
    });

    const updatedTicket = await ticket.save();

    res.status(200).json({
      message: "Ticket status updated successfully",
      ticket: updatedTicket,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
};