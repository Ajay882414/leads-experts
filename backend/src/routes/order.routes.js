const express = require("express");

const router =
  express.Router();

const protect =
  require("../middlewares/auth.middleware");

const admin =
  require("../middlewares/admin.middleware");

const validateOrder =
  require("../validators/orderValidator");

const createOrder =
  require("../controllers/order/createOrder.controller");

const getOrders =
  require("../controllers/order/getOrders.controller");

const getOrder =
  require("../controllers/order/getOrder.controller");

const updateOrderStatus =
  require("../controllers/order/updateOrderStatus.controller");

const deleteOrder =
  require("../controllers/order/deleteOrder.controller");

const getOrderStats =
  require("../controllers/order/getOrderStats.controller");

const getMyOrders =
  require("../controllers/order/getMyOrders.controller");

const downloadOrderLeads =
  require("../controllers/order/downloadOrderLeads.controller");

// =====================================================
// USER — MY ORDERS
// =====================================================

router.get(
  "/my-orders",
  protect,
  getMyOrders
);

// =====================================================
// USER — PURCHASE LEADS
// No payment for now
// =====================================================

router.post(
  "/",
  protect,
  validateOrder,
  createOrder
);

// =====================================================
// USER / ADMIN — DOWNLOAD ORDER LEADS
// =====================================================

router.get(
  "/download/:id",
  protect,
  downloadOrderLeads
);

// =====================================================
// ADMIN — ORDER STATS
// =====================================================

router.get(
  "/stats",
  protect,
  admin,
  getOrderStats
);

// =====================================================
// ADMIN — ALL ORDERS
// =====================================================

router.get(
  "/",
  protect,
  admin,
  getOrders
);

// =====================================================
// ADMIN — SINGLE ORDER
// =====================================================

router.get(
  "/:id",
  protect,
  admin,
  getOrder
);

// =====================================================
// ADMIN — UPDATE STATUS
// =====================================================

router.put(
  "/:id",
  protect,
  admin,
  updateOrderStatus
);

// =====================================================
// ADMIN — DELETE ORDER
// =====================================================

router.delete(
  "/:id",
  protect,
  admin,
  deleteOrder
);

module.exports =
  router;