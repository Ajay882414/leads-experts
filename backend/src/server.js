require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;
// console.log("FRONTEND_URL =", process.env.FRONTEND_URL);
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server Running On ${PORT}`);
});