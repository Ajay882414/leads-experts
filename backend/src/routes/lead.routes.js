const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");
const upload = require("../middlewares/upload.middleware");

const validateLead = require("../validators/leadValidator");

const getLeads = require("../controllers/lead/getLeads.controller");
const getLead = require("../controllers/lead/getLead.controller");
const updateLead = require("../controllers/lead/updateLead.controller");
const deleteLead = require("../controllers/lead/deleteLead.controller");
const getLeadStats = require("../controllers/lead/getLeadStats.controller");
const uploadLeads = require("../controllers/lead/uploadLeads.controller");

// ========================================
// LEAD STATISTICS
// GET /api/leads/stats
// ========================================

router.get(
  "/stats",
  protect,
  admin,
  getLeadStats
);

// ========================================
// BULK CSV / EXCEL UPLOAD
// POST /api/leads/upload
// ========================================

router.post(
  "/upload",
  protect,
  admin,
  upload.single("file"),
  uploadLeads
);

// ========================================
// GET ALL LEADS
// GET /api/leads
// ========================================

router.get(
  "/",
  protect,
  admin,
  getLeads
);

// ========================================
// GET SINGLE LEAD
// GET /api/leads/:id
// ========================================

router.get(
  "/:id",
  protect,
  admin,
  getLead
);

// ========================================
// UPDATE LEAD
// PUT /api/leads/:id
// ========================================

router.put(
  "/:id",
  protect,
  admin,
  validateLead,
  updateLead
);

// ========================================
// DELETE LEAD
// DELETE /api/leads/:id
// ========================================

router.delete(
  "/:id",
  protect,
  admin,
  deleteLead
);

module.exports = router;