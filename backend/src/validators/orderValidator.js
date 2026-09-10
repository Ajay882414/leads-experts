const { body } = require("express-validator");

module.exports = [
  body("platform")
    .notEmpty()
    .withMessage(
      "Platform is required"
    ),

  body("quantity")
    .isInt({
      min: 1,
    })
    .withMessage(
      "Quantity must be greater than 0"
    ),
];