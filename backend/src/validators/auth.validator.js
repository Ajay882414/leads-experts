const validator = require("validator");

const signupValidation = (req, res, next) => {
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

  if (fullName.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: "Full name must be at least 3 characters",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address",
    });
  }

  if (!validator.isMobilePhone(mobileNumber, "en-IN")) {
    return res.status(400).json({
      success: false,
      message: "Invalid mobile number",
    });
  }

  const allowedPlatforms = [
    "Instagram",
    "Facebook",
    "Snapchat",
    "YouTube",
    "LinkedIn",
    "TikTok",
    "Twitter",
  ];

  if (!allowedPlatforms.includes(platform)) {
    return res.status(400).json({
      success: false,
      message: "Invalid platform selected",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  next();
};

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and Password are required",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address",
    });
  }

  next();
};

module.exports = {
  signupValidation,
  loginValidation,
};