const User = require("../../models/User");
const asyncHandler = require("../../utils/asyncHandler");

const getRecentUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select(
      "fullName email role createdAt"
    )
    .sort({
      createdAt: -1,
    })
    .limit(10);

  res.status(200).json({
    success: true,
    users,
  });
});

module.exports = getRecentUsers;