const Ticket = require("../../models/Ticket");
const asyncHandler = require("../../utils/asyncHandler");

// 1. USER: Naya ticket raise karna
const createTicket = asyncHandler(async (req, res) => {
  const { category, orderId, subject, message } = req.body;
  const userId = req.user._id;

  if (!subject || !message) {
    return res.status(400).json({
      success: false,
      message: "Subject aur Message dono required hain.",
    });
  }

  const ticket = await Ticket.create({
    user: userId,
    category: category || "GENERAL_QUERY",
    orderId: orderId ? String(orderId).trim() : "",
    subject: subject.trim(),
    message: message.trim(),
    status: "OPEN",
  });

  res.status(201).json({
    success: true,
    message: "Support ticket generate ho gaya hai. Team jald reply karegi.",
    ticket,
  });
});

// 2. USER: Apne sabhi tickets dekhna
const getMyTickets = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const tickets = await Ticket.find({ user: userId }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tickets.length,
    tickets,
  });
});

// 3. ADMIN: Sabhi users ke tickets dekhna
const getAllTicketsAdmin = asyncHandler(async (req, res) => {
  const { status, search } = req.query;

  const query = {};

  if (status && status !== "ALL") {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { ticketId: { $regex: search, $options: "i" } },
      { subject: { $regex: search, $options: "i" } },
      { orderId: { $regex: search, $options: "i" } },
    ];
  }

  const tickets = await Ticket.find(query)
    .populate("user", "fullName email mobileNumber")
    .sort({ createdAt: -1 });

  const counts = {
    total: await Ticket.countDocuments(),
    open: await Ticket.countDocuments({ status: "OPEN" }),
    inProgress: await Ticket.countDocuments({ status: "IN_PROGRESS" }),
    resolved: await Ticket.countDocuments({ status: "RESOLVED" }),
  };

  res.status(200).json({
    success: true,
    counts,
    tickets,
  });
});

// 4. ADMIN: Reply karna aur Status change karna
const replyTicketAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { adminReply, status } = req.body;

  const ticket = await Ticket.findById(id);

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket nahi mila",
    });
  }

  if (adminReply !== undefined) {
    ticket.adminReply = adminReply;
  }

  if (status) {
    ticket.status = status;
    if (status === "RESOLVED" || status === "CLOSED") {
      ticket.resolvedAt = new Date();
    }
  }

  await ticket.save();

  res.status(200).json({
    success: true,
    message: "Ticket status aur reply update ho gaya!",
    ticket,
  });
});

module.exports = {
  createTicket,
  getMyTickets,
  getAllTicketsAdmin,
  replyTicketAdmin,
};