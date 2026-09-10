const mongoose = require("mongoose");

const validateLead = (req, res, next) => {
  const {
    platform,
    fullName,
    phone,
    age,
  } = req.body;

  if (!platform) {
    return res.status(400).json({
      success: false,
      message: "Platform is required",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(platform)) {
    return res.status(400).json({
      success: false,
      message: "Invalid platform ID",
    });
  }

  if (!fullName || !String(fullName).trim()) {
    return res.status(400).json({
      success: false,
      message: "Lead name is required",
    });
  }

  if (!phone || !String(phone).trim()) {
    return res.status(400).json({
      success: false,
      message: "Lead phone is required",
    });
  }

  if (
    age === undefined ||
    age === null ||
    age === "" ||
    Number.isNaN(Number(age)) ||
    Number(age) < 0 ||
    Number(age) > 120
  ) {
    return res.status(400).json({
      success: false,
      message: "Valid lead age is required",
    });
  }

  next();
};

module.exports = validateLead;