const mongoose = require("mongoose");

const Order = require("../../models/Order");
const Platform = require("../../models/Platform");
const Lead = require("../../models/Lead");

const asyncHandler = require("../../utils/asyncHandler");

const deleteOrder = asyncHandler(
  async (req, res) => {
    const session =
      await mongoose.startSession();

    try {
      let deletedOrder = null;

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
          // FIND PLATFORM
          // ==========================================

          const platform =
            await Platform.findById(
              order.platform
            ).session(session);

          // ==========================================
          // RELEASE SOLD LEADS
          // ==========================================

          const leadUpdate =
            await Lead.updateMany(
              {
                _id: {
                  $in: order.purchasedLeads,
                },

                order: order._id,

                soldTo: order.user,

                status: "SOLD",
              },
              {
                $set: {
                  status: "AVAILABLE",

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

          // ==========================================
          // UPDATE PLATFORM
          // ==========================================

          if (
            platform &&
            leadUpdate.modifiedCount > 0
          ) {
            await Platform.updateOne(
              {
                _id: platform._id,
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

          // ==========================================
          // DELETE ORDER
          // ==========================================

          deletedOrder =
            await Order.findByIdAndDelete(
              order._id,
              {
                session,
              }
            );
        }
      );

      return res.status(200).json({
        success: true,

        message:
          "Order deleted successfully",

        orderId:
          deletedOrder?._id,
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
  }
);

module.exports = deleteOrder;