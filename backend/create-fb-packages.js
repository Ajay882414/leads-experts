require("dotenv").config();
const mongoose = require("mongoose");
const Platform = require("./src/models/Platform");
const Package = require("./src/models/Package");

async function addFacebookPackages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected...");

    // 1. Facebook Platform find karein
    const fbPlatform = await Platform.findOne({ name: { $regex: /facebook/i } });
    if (!fbPlatform) {
      console.log("Facebook platform nahi mila. Pehle Platform table me Facebook create karein.");
      process.exit(0);
    }

    const fbPackages = [
      {
        name: "Facebook — Housewife Leads",
        category: "Housewife",
        pricePerLead: 20,
        minimumPurchase: 1,
        platform: fbPlatform._id,
      },
      {
        name: "Facebook — Female Mixed Leads",
        category: "Female Mixed",
        pricePerLead: 22,
        minimumPurchase: 1,
        platform: fbPlatform._id,
      },
      {
        name: "Facebook — Student Female Leads",
        category: "Student Female",
        pricePerLead: 18,
        minimumPurchase: 1,
        platform: fbPlatform._id,
      },
      {
        name: "Facebook — Male & Female Mixed Leads",
        category: "Mixed",
        pricePerLead: 20,
        minimumPurchase: 1,
        platform: fbPlatform._id,
      },
      {
        name: "Facebook — Female Working Pro Leads",
        category: "Working Pro",
        pricePerLead: 22,
        minimumPurchase: 1,
        platform: fbPlatform._id,
      },
      {
        name: "Facebook — Working Professional Mixed Leads",
        category: "Working Pro Mixed",
        pricePerLead: 20,
        minimumPurchase: 1,
        platform: fbPlatform._id,
      },
    ];

    for (const pkg of fbPackages) {
      await Package.findOneAndUpdate(
        { platform: fbPlatform._id, name: pkg.name },
        pkg,
        { upsert: true, new: true }
      );
      console.log(`Created/Updated: ${pkg.name}`);
    }

    console.log("✅ Sabhi Facebook Packages successfully add ho gaye!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit(0);
  }
}

addFacebookPackages();