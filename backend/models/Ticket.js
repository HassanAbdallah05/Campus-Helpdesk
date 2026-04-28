const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    ticket_code: {
      type: String,
      unique: true,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "IT & Equipment Support",
        "Facilities",
        "Library",
        "Maintenance",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },

    image_path: {
      type: String,
      default: null,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    location_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);