const mongoose = require("mongoose");

const settingSchema =
  new mongoose.Schema(
    {
      websiteName: {
        type: String,
        default: "Leads Experts",
      },

      supportEmail: {
        type: String,
        default:
          "support@example.com",
      },

      supportPhone: {
        type: String,
        default: "",
      },

      currency: {
        type: String,
        default: "INR",
      },

      currencySymbol: {
        type: String,
        default: "₹",
      },

      companyAddress: {
        type: String,
        default: "",
      },

      maintenanceMode: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Setting",
    settingSchema
  );