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
    ref, // <-- Optional referral code from query/body (e.g. "FARHAN10")
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

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "Email already exists",
    });
  }

  // ==========================================
  // SAFE REFERRAL LOOKUP (Zero impact on normal users)
  // ==========================================
  let referredByUserId = null;

  if (ref && typeof ref === "string" && ref.trim().length > 0) {
    const cleanRef = ref.trim().toUpperCase();
    const referrer = await User.findOne({
      referralCode: cleanRef,
    }).select("_id");

    if (referrer) {
      referredByUserId = referrer._id;
    }
  }

  // ==========================================
  // CREATE USER
  // ==========================================
  const user = await User.create({
    fullName,
    email,
    mobileNumber,
    platform,
    state,
    password,
    referredBy: referredByUserId, // Direct user ke liye automatically null rahega
  });

  // ==========================================
  // NOTIFICATION
  // ==========================================
  await createNotification({
    title: "New User Registered",
    message: `${user.fullName} has registered successfully.`,
    type: "User",
  });

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    success: true,
    message: "Account created successfully",
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