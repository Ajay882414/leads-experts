const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/admin.routes");
const signupRoute = require("./routes/signup.route");
const testRoute = require("./routes/test.route");
const loginRoute = require("./routes/login.route");
const logoutRoute = require("./routes/logout.route");
const meRoute = require("./routes/me.route");
const profileRoute = require("./routes/profile.route");
const forgotPasswordRoute = require("./routes/forgotPassword.route");
const resetPasswordRoute = require("./routes/resetPassword.route");
const platformRoutes = require("./routes/platform.routes");
const leadRoutes = require("./routes/lead.routes");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");
const packageRoutes = require("./routes/package.routes");
const supportRoutes = require("./routes/support.routes");
const paymentRoutes =
require("./routes/payment.routes");
const notificationRoutes =
  require("./routes/notification.routes");
  const downloadRoutes = require("./routes/download.routes");
  const reportRoutes =
require("./routes/report.routes");
const settingRoutes =
require("./routes/setting.routes");
const errorHandler = require("./middlewares/error.middleware");
const notFound = require("./middlewares/notFound.middleware");


const app = express();

const allowedOrigins = [
  "https://leadsvero.com",
  "https://www.leadsvero.com",
  "https://leads-experts-xqew.vercel.app",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Mobile apps, Postman ya direct server calls me origin null hota hai
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS policy: This origin is not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());



app.use("/api/test", testRoute);
app.use("/api/auth/signup", signupRoute);
app.use("/api/auth/login", loginRoute);
app.use("/api/auth/logout", logoutRoute);
app.use("/api/auth/me", meRoute);
app.use("/api/profile", profileRoute);
app.use(
  "/api/auth/forgot-password",
  forgotPasswordRoute
);
app.use(
  "/api/auth/reset-password",
  resetPasswordRoute
);
app.use(
  "/api/platforms",
  platformRoutes
);

app.use("/api/packages", packageRoutes);

app.use(
  "/api/leads",
  leadRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/users",
  userRoutes
);

// Baki routes ke sath line add karein:
app.use("/api/support", supportRoutes);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/payments",
  paymentRoutes
);

app.use(
  "/api/downloads",
  downloadRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);

app.use(
  "/api/reports",
  reportRoutes
);

app.use(
  "/api/settings",
  settingRoutes
);

app.use(notFound);

app.use(errorHandler);

module.exports = app;