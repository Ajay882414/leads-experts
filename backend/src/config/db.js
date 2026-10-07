const mongoose = require("mongoose");

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not configured");
  }

  let attempt = 0;
  while (true) {
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
      console.log("✅ MongoDB Connected");
      return;
    } catch (error) {
      attempt += 1;
      const retryDelay = Math.min(attempt * 5000, 30000);
      console.error(
        `MongoDB connection failed: ${error.message}. Retrying in ${retryDelay / 1000}s.`
      );
      await delay(retryDelay);
    }
  }
};

module.exports = connectDB;