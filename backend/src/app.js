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
const errorHandler = require("./middlewares/error.middleware");
const notFound = require("./middlewares/notFound.middleware");


const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use(express.json());

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

app.use(notFound);

app.use(errorHandler);

module.exports = app;