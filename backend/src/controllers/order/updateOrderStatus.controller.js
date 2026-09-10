const mongoose = require("mongoose");

const Order = require("../../models/Order");
const Lead = require("../../models/Lead");
const Platform = require("../../models/Platform");

const asyncHandler = require("../../utils/asyncHandler");

const updateOrderStatus =
  asyncHandler(async (req, res) => {
    const { status } = req.body;

    const allowedStatus = [
      "Pending",
      "Completed",
      "Cancelled",
    ];

    if (
      !allowedStatus.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const session =
      await mongoose.startSession();

    try {
      let updatedOrder = null;

      await session.withTransaction(
        async () => {
          const order =
            await Order.findById(
              req.params.id
            ).session(session);

          if (!order) {
            throw new Error(
              "ORDER_NOT_FOUND"
            );
          }

          // ==========================================
          // SAME STATUS
          // ==========================================

          if (order.status === status) {
            updatedOrder = order;
            return;
          }

          // ==========================================
          // CANCEL ORDER
          // ==========================================

          if (
            status === "Cancelled" &&
            order.status !== "Cancelled"
          ) {
            const leadUpdate =
              await Lead.updateMany(
                {
                  _id: {
                    $in:
                      order.purchasedLeads,
                  },

                  order: order._id,

                  soldTo: order.user,

                  status: "SOLD",
                },
                {
                  $set: {
                    status:
                      "AVAILABLE",

                    soldTo: null,

                    soldAt: null,

                    order: null,

                    soldPrice: null,
                  },
                },
                {
                  session,
                }
              );

            // ========================================
            // UPDATE PLATFORM COUNTERS
            // ========================================

            if (
              leadUpdate.modifiedCount >
              0
            ) {
              await Platform.updateOne(
                {
                  _id:
                    order.platform,
                },
                {
                  $inc: {
                    availableLeads:
                      leadUpdate.modifiedCount,

                    soldLeads:
                      -leadUpdate.modifiedCount,
                  },
                },
                {
                  session,
                }
              );
            }
          }

          // ==========================================
          // UPDATE ORDER
          // ==========================================

          order.status = status;

          await order.save({
            session,
          });

          updatedOrder = order;
        }
      );

      return res.status(200).json({
        success: true,

        message:
          "Order status updated successfully",

        order: updatedOrder,
      });
    } catch (error) {
      if (
        error.message ===
        "ORDER_NOT_FOUND"
      ) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      throw error;
    } finally {
      await session.endSession();
    }
  });

module.exports =
  updateOrderStatus;