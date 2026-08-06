const User = require("../../models/User");
const asyncHandler = require("../../utils/asyncHandler");

const updateUser =
  asyncHandler(async (req, res) => {

    const {
      fullName,
      email,
      mobileNumber,
      state,
      platform,
      role,
    } = req.body;

    const user =
      await User.findById(
        req.params.id
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.fullName =
      fullName;

    user.email =
      email;

    user.mobileNumber =
      mobileNumber;

    user.state =
      state;

    user.platform =
      platform;

    user.role =
      role;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "User updated successfully",
      user,
    });

  });

module.exports =
  updateUser;