const express = require("express");

const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

const upload = require("../middlewares/upload.middleware");

const validateLead = require("../validators/leadValidator");

const createLead = require("../controllers/lead/createLead.controller");
const getLeads = require("../controllers/lead/getLeads.controller");
const getLead = require("../controllers/lead/getLead.controller");
const updateLead = require("../controllers/lead/updateLead.controller");
const deleteLead = require("../controllers/lead/deleteLead.controller");
const getLeadStats = require("../controllers/lead/getLeadStats.controller");
const uploadLeads = require("../controllers/lead/uploadLeads.controller");



// =======================
// Lead Statistics
// =======================

router.get(
  "/stats",
  protect,
  admin,
  getLeadStats
);

// =======================
// Upload CSV / Excel
// =======================

router.post(
  "/upload",
  protect,
  admin,
  upload.single("file"),
  uploadLeads
);





// =======================
// Get All Leads
// =======================

router.get(
  "/",
  protect,
  admin,
  getLeads
);



// =======================
// Create Lead
// =======================

router.post(
  "/",
  protect,
  admin,
  validateLead,
  createLead
);



// =======================
// Update Lead
// =======================

router.put(
  "/:id",
  protect,
  admin,
  validateLead,
  updateLead
);

// =======================
// Delete Lead
// =======================

router.delete(
  "/:id",
  protect,
  admin,
  deleteLead
);



// =======================
// Get Single Lead
// =======================

router.get(
  "/:id",
  protect,
  admin,
  getLead
);

module.exports = router;