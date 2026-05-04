const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const multer = require("multer");

// Routes
const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const replyRoutes = require("./routes/replyRoutes");

dotenv.config();

// Connect to DB
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route
app.get("/", (req, res) => {
  res.send("Campus Helpdesk API is running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/replies", replyRoutes);

// Error handler for image upload errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "Image is too large. Maximum allowed size is 5 MB.",
      });
    }

    return res.status(400).json({
      message: err.message,
    });
  }

  if (
    err.message === "Only JPEG and PNG images are allowed" ||
    err.message === "Only JPEG, JPG, and PNG images are allowed"
  ) {
    return res.status(400).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: err.message || "Server error",
  });
});

// Start server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});