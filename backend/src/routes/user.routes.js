const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

const getUsers = require("../controllers/user/getUsers.controller");
const getUser = require("../controllers/user/getUser.controller");
const updateUserStatus = require("../controllers/user/updateUserStatus.controller");
const deleteUser = require("../controllers/user/deleteUser.controller");
const getUserStats = require("../controllers/user/getUserStats.controller");
const updateUser = require("../controllers/user/updateUser.controller");

// Get All Users
router.get(
  "/",
  protect,
  admin,
  getUsers
);


router.get(
  "/stats",
  protect,
  admin,
  getUserStats
);

// Get Single User
router.get(
  "/:id",
  protect,
  admin,
  getUser
);

router.put(
  "/:id",
  protect,
  admin,
  updateUser
);

// Update User Status
router.patch(
  "/:id/status",
  protect,
  admin,
  updateUserStatus
);

// Delete User
router.delete(
  "/:id",
  protect,
  admin,
  deleteUser
);




module.exports = router;