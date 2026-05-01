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

// Generate next custom user_id
const getNextUserId = async () => {
  const lastUser = await User.findOne().sort({ user_id: -1 });
  return lastUser ? lastUser.user_id + 1 : 1;
};

// Register new user/admin
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

    // KU ID: 10 digits, starts from 215 to 225
    const kuIdRegex = /^(21[5-9]|22[0-5])\d{7}$/;

    if (!kuIdRegex.test(university_id)) {
      return res.status(400).json({
        message:
          "Invalid KU ID. KU ID must be 10 digits and start with a year from 2015 to 2025.",
      });
    }

    // Email must match the KU ID exactly
    const expectedEmail = `s${university_id}@ku.edu.kw`;

    if (email.toLowerCase() !== expectedEmail) {
      return res.status(400).json({
        message: `Invalid email. Email must be ${expectedEmail}`,
      });
    }

    // Strong password
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase letter, lowercase letter, number, and special character.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    const existingUniversityId = await User.findOne({ university_id });
    if (existingUniversityId) {
      return res.status(400).json({
        message: "University ID already exists",
      });
    }

    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nextUserId = await getNextUserId();

    const user = await User.create({
      user_id: nextUserId,
      university_id,
      fname,
      lname,
      email: email.toLowerCase(),
      password: hashedPassword,
      role_id: role_id || 1,
    });

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

    if (!university_id || !password) {
      return res.status(400).json({
        message: "Please provide university ID and password",
      });
    }

    const user = await User.findOne({ university_id });

    if (!user) {
      return res.status(401).json({
        message: "Invalid university ID or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid university ID or password",
      });
    }

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