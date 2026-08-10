const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

const validateOrder = require("../validators/orderValidator");

const createOrder = require("../controllers/order/createOrder.controller");
const getOrders = require("../controllers/order/getOrders.controller");
const getOrder = require("../controllers/order/getOrder.controller");
const updateOrderStatus = require("../controllers/order/updateOrderStatus.controller");
const deleteOrder = require("../controllers/order/deleteOrder.controller");
const getOrderStats = require("../controllers/order/getOrderStats.controller");
const getMyOrders = require("../controllers/order/getMyOrders.controller");
const downloadOrderLeads = require("../controllers/order/downloadOrderLeads.controller");

router.get(
  "/stats",
  protect,
  admin,
  getOrderStats
);

router.get(
  "/",
  protect,
  admin,
  getOrders
);

router.get(
  "/:id",
  protect,
  admin,
  getOrder
);

router.post(
  "/",
  protect,
  admin,
  validateOrder,
  createOrder
);

router.put(
  "/:id",
  protect,
  admin,
  updateOrderStatus
);

router.delete(
  "/:id",
  protect,
  admin,
  deleteOrder
);


// My Orders (User)
router.get(
  "/my-orders",
  protect,
  getMyOrders
);

// Download Purchased Leads
router.get(
  "/download/:id",
  protect,
  downloadOrderLeads
);

module.exports = router;