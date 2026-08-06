const User = require("../../models/User");
const asyncHandler = require("../../utils/asyncHandler");

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

module.exports = getUser;