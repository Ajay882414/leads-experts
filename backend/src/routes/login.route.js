const express = require("express");

const router = express.Router();

const login = require("../controllers/login.controller");

const {
  loginValidation,
} = require("../validators/auth.validator");

router.post(
  "/",
  loginValidation,
  login
);

module.exports = router;