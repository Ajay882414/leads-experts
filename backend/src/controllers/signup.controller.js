const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");

const signup = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    mobileNumber,
    platform,
    state,
    password,
  } = req.body;

  if (
    !fullName ||
    !email ||
    !mobileNumber ||
    !platform ||
    !state ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

const existingUser = await User.findOne({
  email: email.toLowerCase().trim(),
});

console.log("Incoming Email:", email);
console.log("Existing User:", existingUser);

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "Email already exists",
    });
  }
console.log("Creating New User...");
  const user = await User.create({
    fullName,
    email,
    mobileNumber,
    platform,
    state,
    password,
  });
  console.log("Created User:", user);

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
   secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "Account created successfully",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      platform: user.platform,
      state: user.state,
    },
  });
});

module.exports = signup;