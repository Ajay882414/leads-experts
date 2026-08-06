const validator = require("validator");

const validatePlatform = (
  req,
  res,
  next
) => {
  const {
    name,
    slug,
    description,
    icon,
    color,
    status,
    banner,
    pricePerLead,
    minimumPurchase,
  } = req.body;

  if (!name || validator.isEmpty(name.trim())) {
    return res.status(400).json({
      success: false,
      message: "Platform name is required",
    });
  }

  if (!slug || validator.isEmpty(slug.trim())) {
    return res.status(400).json({
      success: false,
      message: "Slug is required",
    });
  }

  if (!pricePerLead || pricePerLead <= 0) {
    return res.status(400).json({
      success: false,
      message:
        "Price per lead must be greater than zero",
    });
  }

  if (
    minimumPurchase &&
    minimumPurchase <= 0
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Minimum purchase must be greater than zero",
    });
  }

  next();
};

module.exports = validatePlatform;