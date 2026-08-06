const express = require("express");

const router = express.Router();

const signup = require("../controllers/signup.controller");

const {
  signupValidation,
} = require("../validators/auth.validator");

router.post(
  "/",
  signupValidation,
  signup
);

module.exports = router;