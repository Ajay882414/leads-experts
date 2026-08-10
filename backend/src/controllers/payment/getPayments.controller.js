const Payment = require("../../models/Payment");
const asyncHandler = require("../../utils/asyncHandler");

const getPayments =
  asyncHandler(async (req, res) => {
    const payments =
      await Payment.find()
        .populate(
          "user",
          "fullName email"
        )
        .populate(
          "order"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      payments,
    });
  });

module.exports =
  getPayments;