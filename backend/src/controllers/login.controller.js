const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check required fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and Password are required",
    });
  }

  const cleanEmail = email.toLowerCase().trim();

  // Find user with password field
  const user = await User.findOne({
    email: cleanEmail,
  }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  // Compare password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  // Update last login instantly bina Mongoose ke heavy hooks chalaye
  User.updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } }).catch(
    (err) => console.error("lastLogin update error:", err.message)
  );

  // Generate JWT
  const token = generateToken(user._id);

  // Dynamic Cookie: Production par secure aur localhost par lax
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Token JSON response me bhi bhejein
  return res.status(200).json({
    success: true,
    message: "Login Successful",
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      platform: user.platform,
      state: user.state,
      role: user.role,
    },
  });
});

module.exports = login;