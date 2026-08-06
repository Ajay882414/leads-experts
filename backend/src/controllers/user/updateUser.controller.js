const User = require("../../models/User");
const asyncHandler = require("../../utils/asyncHandler");

const updateUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    country,
    role,
    status,
  } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (phone !== undefined) user.phone = phone;
  if (country !== undefined) user.country = country;
  if (role !== undefined) user.role = role;
  if (status !== undefined) user.status = status;

  await user.save();

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
});

module.exports = updateUser;