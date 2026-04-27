const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true,
  },
  university_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  lname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role_id: {
    type: Number,
    required: true,
    enum: [1, 2], // 1 = student, 2 = admin
    default: 1,
  },
});

module.exports = mongoose.model("User", userSchema);