const asyncHandler = require("../utils/asyncHandler");

const me = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports = me;