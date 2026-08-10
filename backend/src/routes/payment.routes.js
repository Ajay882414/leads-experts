const express = require("express");

const router =
  express.Router();

const protect =
  require("../middlewares/auth.middleware");

const admin =
  require("../middlewares/admin.middleware");

const getPayments =
  require("../controllers/payment/getPayments.controller");

router.get(
  "/",
  protect,
  admin,
  getPayments
);

module.exports = router;