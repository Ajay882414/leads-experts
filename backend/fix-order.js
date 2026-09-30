require("dotenv").config();
const mongoose = require("mongoose");
const Order = require("./src/models/Order");
const Lead = require("./src/models/Lead");
const Download = require("./src/models/Download");

async function linkPackageToOrders() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");

    // Wo orders dhoondhein jisme package field missing hai
    const orders = await Order.find({ package: { $exists: false } });

    for (const order of orders) {
      // Order ki lead se package ID nikalna
      if (order.purchasedLeads && order.purchasedLeads.length > 0) {
        const lead = await Lead.findById(order.purchasedLeads[0]);
        if (lead && lead.package) {
          order.package = lead.package;
          await order.save();
          console.log(`Updated Order ${order._id} with Package: ${lead.package}`);
        }
      }
    }

    console.log("✅ All existing orders linked with Package successfully!");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    process.exit(0);
  }
}

linkPackageToOrders();