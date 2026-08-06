const express = require("express");

const router = express.Router();

const resendOtp = require("../controllers/resendOtp.controller");

router.post("/", resendOtp);

module.exports = router;