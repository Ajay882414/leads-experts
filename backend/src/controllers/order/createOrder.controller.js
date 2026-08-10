const Order = require("../../models/Order");
const User = require("../../models/User");
const Platform = require("../../models/Platform");
const Lead = require("../../models/Lead");
const asyncHandler = require("../../utils/asyncHandler");
const createNotification = require("../../utils/createNotification");

const createOrder = asyncHandler(async (req, res) => {

  const {
    user,
    platform,
    quantity,
  } = req.body;

  const userExists =
    await User.findById(user);

  if (!userExists) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const platformExists =
    await Platform.findById(platform);

  if (!platformExists) {
    return res.status(404).json({
      success: false,
      message: "Platform not found",
    });
  }

  if (
    platformExists.availableLeads <
    quantity
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Not enough leads available",
    });
  }

  const pricePerLead =
    platformExists.pricePerLead;

  const totalAmount =
    quantity * pricePerLead;

  const leads =
    await Lead.find({
      platform,
      isSold: false,
    }).limit(quantity);

  if (
    leads.length < quantity
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Requested leads not available",
    });
  }

  const leadIds =
    leads.map(
      (lead) => lead._id
    );

  await Lead.updateMany(
    {
      _id: {
        $in: leadIds,
      },
    },
    {
      isSold: true,
    }
  );

  platformExists.availableLeads -=
    quantity;

  platformExists.soldLeads +=
    quantity;

  await platformExists.save();

  const order =
    await Order.create({
      user,
      platform,
      quantity,
      pricePerLead,
      totalAmount,
      purchasedLeads:
        leadIds,
    });

  // ==========================
  // Create Notification
  // ==========================

  await createNotification({
    title: "New Order Created",

    message: `${userExists.fullName} purchased ${quantity} ${platformExists.name} leads.`,

    type: "Order",
  });

  res.status(201).json({
    success: true,
    message:
      "Order created successfully",
    order,
  });

});

module.exports =
  createOrder;