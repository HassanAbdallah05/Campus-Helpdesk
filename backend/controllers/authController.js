const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      user_id: user.user_id,
      university_id: user.university_id,
      role_id: user.role_id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Helper function to generate next custom user_id
const getNextUserId = async () => {
  const lastUser = await User.findOne().sort({ user_id: -1 });
  return lastUser ? lastUser.user_id + 1 : 1;
};

// Register new user
const registerUser = async (req, res) => {
  try {
    const {
      university_id,
      fname,
      lname,
      email,
      password,
      confirmPassword,
      role_id,
    } = req.body;

    // Check required fields
    if (
      !university_id ||
      !fname ||
      !lname ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // Check if university_id already exists
    const existingUniversityId = await User.findOne({ university_id });
    if (existingUniversityId) {
      return res.status(400).json({
        message: "University ID already exists",
      });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate custom user_id
    const nextUserId = await getNextUserId();

    // Create user
    const user = await User.create({
      user_id: nextUserId,
      university_id,
      fname,
      lname,
      email,
      password: hashedPassword,
      role_id: role_id || 1, // default = student
    });

    // Send response with token
    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user),
      user: {
        _id: user._id,
        user_id: user.user_id,
        university_id: user.university_id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role_id: user.role_id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { university_id, password } = req.body;

    // Check required fields
    if (!university_id || !password) {
      return res.status(400).json({
        message: "Please provide university ID and password",
      });
    }

    // Find user by university_id
    const user = await User.findOne({ university_id });

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        message: "Invalid university ID or password",
      });
    }

    // Compare typed password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid university ID or password",
      });
    }

    // Send success response with token
    res.status(200).json({
      message: "Login successful",
      token: generateToken(user),
      user: {
        _id: user._id,
        user_id: user.user_id,
        university_id: user.university_id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role_id: user.role_id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  registerUser,
  loginUser,
};