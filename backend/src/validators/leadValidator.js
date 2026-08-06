const validateLead = (
  req,
  res,
  next
) => {
  const {
    platform,
    fullName,
    email,
    phone,
  } = req.body;

  if (
    !platform ||
    !fullName ||
    !email ||
    !phone
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Platform, Name, Email and Phone are required",
    });
  }

  next();
};

module.exports = validateLead;