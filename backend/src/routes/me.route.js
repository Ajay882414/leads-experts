const express = require("express");

const me = require("../controllers/me.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", authMiddleware, me);

module.exports = router;