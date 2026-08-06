const User = require("../../models/User");
const asyncHandler = require("../../utils/asyncHandler");

const getUsers = asyncHandler(async (req, res) => {

  const {
    search,
    status,
  } = req.query;

  const query = {};

  if (search) {
    query.$or = [
      {
        fullName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (status) {
    query.status = status;
  }

  const users =
    await User.find(query)
      .select("-password")
      .sort({
        createdAt: -1,
      });

  res.status(200).json({
    success: true,
    total: users.length,
    users,
  });

});

module.exports = getUsers;