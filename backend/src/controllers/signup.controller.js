const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");
const createNotification = require("../utils/createNotification");

const signup = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    mobileNumber,
    platform,
    state,
    password,
    ref,
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

  const cleanEmail = email.toLowerCase().trim();

  // 1. Fast existence check (Sirf _id lookup)
  const existingUser = await User.findOne({
    email: cleanEmail,
  })
    .select("_id")
    .lean();

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "Email already exists",
    });
  }

  // 2. Safe Referral Lookup (Sirf _id fetch)
  let referredByUserId = null;
  if (ref && typeof ref === "string" && ref.trim().length > 0) {
    const cleanRef = ref.trim().toUpperCase();
    const referrer = await User.findOne({
      referralCode: cleanRef,
    })
      .select("_id")
      .lean();

    if (referrer) {
      referredByUserId = referrer._id;
    }
  }

  // 3. User Creation
  const user = await User.create({
    fullName: fullName.trim(),
    email: cleanEmail,
    mobileNumber: mobileNumber.trim(),
    platform,
    state,
    password,
    referredBy: referredByUserId,
  });

  // 4. Background Notification (Non-blocking)
  createNotification({
    title: "New User Registered",
    message: `${user.fullName} has registered successfully.`,
    type: "User",
  }).catch((err) => console.error("Notification background error:", err));

  // 5. Token & Cookie
  const token = generateToken(user._id);
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    success: true,
    message: "Account created successfully",
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      platform: user.platform,
      state: user.state,
      referredBy: user.referredBy,
    },
  });
});

module.exports = signup;