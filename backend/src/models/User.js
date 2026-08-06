const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },

    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
    },

    platform: {
      type: String,
      required: true,
      enum: [
        "Instagram",
        "Facebook",
        "Snapchat",
        "YouTube",
        "LinkedIn",
        "TikTok",
        "Twitter",
      ],
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    status: {
  type: String,
  enum: [
    "ACTIVE",
    "BLOCKED",
  ],
  default: "ACTIVE",
},


resetOtp: {
  type: String,
},

resetOtpExpire: {
  type: Date,
},

    isVerified: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", async function () {

  console.log("Before Hash:", this.password);

  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(12);

  this.password = await bcrypt.hash(this.password, salt);

  console.log("After Hash:", this.password);
});


userSchema.methods.comparePassword = async function (
  enteredPassword
) {
  return await bcrypt.compare(
    enteredPassword,
    this.password
  );
};



module.exports = mongoose.model(
  "User",
  userSchema
);