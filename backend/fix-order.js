require("dotenv").config();
const mongoose = require("mongoose");
const Order = require("./src/models/Order");
const Lead = require("./src/models/Lead");
const Download = require("./src/models/Download");

async function fixLatestOrder() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");

    const order = await Order.findOne().sort({ createdAt: -1 });

    if (!order) {
      console.log("Database me koi order hi nahi mila.");
      process.exit(0);
    }

    console.log(`Targeting Order ID: ${order._id}, Status: ${order.status}, Quantity: ${order.quantity}`);

    const leads = await Lead.find({
      platform: order.platform,
      status: "AVAILABLE",
    }).limit(order.quantity);

    if (leads.length === 0) {
      console.log("⚠️ Is platform ke liye AVAILABLE leads nahi mili!");
      process.exit(0);
    }

    const leadIds = leads.map((l) => l._id);

    order.status = "Completed";
    order.purchasedLeads = leadIds;
    await order.save();

    await Lead.updateMany(
      { _id: { $in: leadIds } },
      {
        $set: {
          status: "SOLD",
          soldTo: order.user,
          soldAt: new Date(),
          order: order._id,
        },
      }
    );

    // totalLeads field add kar diya hai
    await Download.create({
      user: order.user,
      platform: order.platform,
      order: order._id,
      totalLeads: order.quantity,
      fileName: `order-${order._id}.csv`,
    });

    console.log("✅ Order successfully fixed! Leads linked & Download history created.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit(0);
  }
}

fixLatestOrder();