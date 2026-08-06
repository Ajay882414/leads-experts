const forgotPassword = require("./forgotPassword.route");
const resetPassword = require("./resetPassword.route");
const resendOtp = require("./resendOtp.route");

router.use("/forgot-password", forgotPassword);

router.use("/reset-password", resetPassword);

router.use("/resend-otp", resendOtp);





