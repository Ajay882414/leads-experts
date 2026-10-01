const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");

// Get Profile
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update Profile
const updateProfile = asyncHandler(async (req, res) => {
  const {
    fullName,
    mobileNumber,
    platform,
    state,
    avatar, // <-- avatar add kar diya hai
  } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user.fullName = fullName || user.fullName;
  user.mobileNumber = mobileNumber || user.mobileNumber;
  user.platform = platform || user.platform;
  user.state = state || user.state;

  if (avatar !== undefined) {
    user.avatar = avatar; // <-- avatar save karega
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
    user,
  });
});

module.exports = {
  getProfile,
  updateProfile,
};










