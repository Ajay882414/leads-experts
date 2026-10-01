const express = require("express");
const router = express.Router();

const {
  createTicket,
  getMyTickets,
  getAllTicketsAdmin,
  replyTicketAdmin,
} = require("../controllers/support/support.controller");

// Middlewares (Direct imports matching your project structure)
const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

// =====================================================
// USER ROUTES
// =====================================================

// User: Naya ticket raise karna
router.post("/", protect, createTicket);

// User: Apne tickets dekhna
router.get("/my-tickets", protect, getMyTickets);

// =====================================================
// ADMIN ROUTES
// =====================================================

// Admin: Sabhi users ke tickets dekhna
router.get("/admin/all", protect, admin, getAllTicketsAdmin);

// Admin: Ticket reply aur status update karna
router.put("/admin/:id/reply", protect, admin, replyTicketAdmin);

module.exports = router;