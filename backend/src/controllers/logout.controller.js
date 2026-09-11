const asyncHandler = require("../utils/asyncHandler");

const logout = asyncHandler(async (req, res) => {
  // res.cookie("token", "", {
  //   httpOnly: true,
  //   expires: new Date(0),
  //   sameSite: "lax",
  //   secure: false, // Production => true
  // });


  res.cookie("token", "", {
  httpOnly: true,
  expires: new Date(0),
  sameSite: "none",
  secure: true,
});

  res.status(200).json({
    success: true,
    message: "Logout Successful",
  });
});

module.exports = logout;