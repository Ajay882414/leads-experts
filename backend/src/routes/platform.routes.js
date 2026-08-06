const express = require("express");

const router = express.Router();

// const protect = require("../middlewares/authMiddleware");
const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

const validatePlatform = require("../validators/platformValidator");

const createPlatform = require("../controllers/platform/createPlatform.controller");
const getPlatforms = require("../controllers/platform/getPlatforms.controller");
const getPlatform = require("../controllers/platform/getPlatform.controller");
const updatePlatform = require("../controllers/platform/updatePlatform.controller");
const deletePlatform = require("../controllers/platform/deletePlatform.controller");

router.get("/", getPlatforms);

router.get("/:id", getPlatform);

router.post(
  "/",
  protect,
  admin,
  validatePlatform,
  createPlatform
);

router.put(
  "/:id",
  protect,
  admin,
  validatePlatform,
  updatePlatform
);

router.delete(
  "/:id",
  protect,
  admin,
  deletePlatform
);

module.exports = router;