const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Check required fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and Password are required",
    });
  }

  const cleanEmail = email.toLowerCase().trim();

  // 2. Find user (Fast index lookup)
  const user = await User.findOne({
    email: cleanEmail,
  }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  // 3. Compare password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  // 4. Background Update lastLogin (User ko block kiye bina fast update)
  User.updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } }).catch(
    (err) => console.error("LastLogin update error:", err)
  );

  // 5. Generate JWT Token
  const token = generateToken(user._id);

  // Dynamic Cookie configuration
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // 6. Instant Response
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