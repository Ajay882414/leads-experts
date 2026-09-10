const validator = require("validator");

const validatePlatform = (req, res, next) => {
  const {
    name,
    slug,
    pricePerLead,
    minimumPurchase,
    status,
  } = req.body;

  if (!name || validator.isEmpty(String(name).trim())) {
    return res.status(400).json({
      success: false,
      message: "Platform name is required",
    });
  }

  if (!slug || validator.isEmpty(String(slug).trim())) {
    return res.status(400).json({
      success: false,
      message: "Slug is required",
    });
  }

  const price = Number(pricePerLead);

  if (
    pricePerLead === undefined ||
    pricePerLead === null ||
    Number.isNaN(price) ||
    price <= 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Price per lead must be greater than zero",
    });
  }

  if (
    minimumPurchase !== undefined &&
    minimumPurchase !== null &&
    (
      Number.isNaN(Number(minimumPurchase)) ||
      Number(minimumPurchase) < 1 ||
      !Number.isInteger(Number(minimumPurchase))
    )
  ) {
    return res.status(400).json({
      success: false,
      message: "Minimum purchase must be a whole number greater than zero",
    });
  }

  if (
    status !== undefined &&
    !["ACTIVE", "INACTIVE"].includes(status)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid platform status",
    });
  }

  next();
};

module.exports = validatePlatform;