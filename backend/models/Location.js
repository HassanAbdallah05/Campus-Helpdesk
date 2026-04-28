const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  college: {
    type: String,
    enum: [
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
      "College of Business Administration"
    ],
    required: true
  },

  building: {
    type: String,
    enum: ["Building A", "Building B", "Building C", "Building D"],
    required: true
  },

  room_number: {
    type: String,
    trim: true,
    default: null
  }
});

module.exports = mongoose.model("Location", locationSchema);