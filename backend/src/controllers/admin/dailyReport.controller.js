const User = require("../../models/User");
const Order = require("../../models/Order");
const Payment = require("../../models/Payment");

const getDailyReports = async (req, res, next) => {
  try {
    const { range = "7days" } = req.query;

    const now = new Date();
    let startDate = new Date();

    if (range === "today") {
      startDate.setHours(0, 0, 0, 0);
    } else if (range === "yesterday") {
      startDate.setDate(now.getDate() - 1);
      startDate.setHours(0, 0, 0, 0);
    } else if (range === "7days") {
      startDate.setDate(now.getDate() - 7);
    } else if (range === "15days") {
      startDate.setDate(now.getDate() - 15);
    } else if (range === "1month" || range === "30days") {
      startDate.setMonth(now.getMonth() - 1);
    } else if (range.endsWith("months")) {
      const monthCount = parseInt(range.replace("months", ""), 10);
      if (!isNaN(monthCount) && monthCount >= 1 && monthCount <= 11) {
        startDate.setMonth(now.getMonth() - monthCount);
      } else {
        startDate.setMonth(now.getMonth() - 1);
      }
    } else {
      startDate.setDate(now.getDate() - 7);
    }

    const matchQuery = { createdAt: { $gte: startDate, $lte: now } };

    // 1. Fetch Users within range
    const users = await User.find({ ...matchQuery, role: "user" })
      .select("fullName email mobileNumber platform createdAt")
      .sort({ createdAt: -1 })
      .lean();

    // 2. Fetch Orders with populated User details
    const orders = await Order.find({ ...matchQuery, status: "Completed" })
      .populate("user", "fullName email mobileNumber platform")
      .populate("platform", "name")
      .select("user platform quantity totalAmount createdAt status")
      .sort({ createdAt: -1 })
      .lean();

    // 3. Payments for revenue verification
    const payments = await Payment.find({ ...matchQuery, status: "SUCCESS" })
      .select("amount createdAt")
      .lean();

    // Helper: Convert UTC Date to YYYY-MM-DD in IST
    const getDateString = (date) => {
      const d = new Date(date);
      return d.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }); // Returns YYYY-MM-DD
    };

    const dateMap = {};

    // Group Signups by Date
    users.forEach((u) => {
      const d = getDateString(u.createdAt);
      if (!dateMap[d]) {
        dateMap[d] = {
          date: d,
          signupsCount: 0,
          ordersCount: 0,
          revenue: 0,
          signedUpUsers: [],
          purchasedUsers: [],
        };
      }
      dateMap[d].signupsCount += 1;
      dateMap[d].signedUpUsers.push({
        id: u._id,
        name: u.fullName,
        email: u.email,
        mobile: u.mobileNumber,
        platform: u.platform,
        createdAt: u.createdAt,
      });
    });

    // Group Orders by Date
    orders.forEach((o) => {
      const d = getDateString(o.createdAt);
      if (!dateMap[d]) {
        dateMap[d] = {
          date: d,
          signupsCount: 0,
          ordersCount: 0,
          revenue: 0,
          signedUpUsers: [],
          purchasedUsers: [],
        };
      }
      dateMap[d].ordersCount += 1;
      dateMap[d].purchasedUsers.push({
        orderId: o._id,
        userId: o.user?._id,
        name: o.user?.fullName || "Unknown",
        email: o.user?.email || "No Email",
        mobile: o.user?.mobileNumber || "-",
        platformName: o.platform?.name || "-",
        quantity: o.quantity,
        amount: o.totalAmount,
        createdAt: o.createdAt,
      });
    });

    // Group Revenue by Date
    payments.forEach((p) => {
      const d = getDateString(p.createdAt);
      if (dateMap[d]) {
        dateMap[d].revenue += p.amount;
      }
    });

    // Top KPI Totals
    const totalUsers = users.length;
    const totalOrders = orders.length;
    const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);

    const dailyBreakdown = Object.values(dateMap).sort((a, b) =>
      b.date.localeCompare(a.date)
    );

    return res.status(200).json({
      success: true,
      data: {
        range,
        summary: {
          totalUsers,
          totalOrders,
          totalRevenue,
        },
        dailyBreakdown,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getDailyReports;