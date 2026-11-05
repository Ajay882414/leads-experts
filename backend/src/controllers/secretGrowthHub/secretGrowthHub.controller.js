const SecretGrowthHub = require("../../models/SecretGrowthHub");
const Order = require("../../models/Order");
const asyncHandler = require("../../utils/asyncHandler");

// ========================================================
// USER FEED: GET FEED WITH 1ST COMPLETED ORDER GATE
// GET /api/secret-growth-hub
// ========================================================
const getHubFeed = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Check 1st completed order
  const completedOrderCount = await Order.countDocuments({
    user: userId,
    status: "Completed",
  });

  const isUnlocked = completedOrderCount > 0;

  if (!isUnlocked) {
    return res.status(200).json({
      success: true,
      isUnlocked: false,
      message: "Secret Growth Hub unlocks automatically after your first completed order.",
      posts: [],
    });
  }

  const posts = await SecretGrowthHub.find({ isActive: true })
    .sort({ isPinned: -1, createdAt: -1 })
    .lean();

  return res.status(200).json({
    success: true,
    isUnlocked: true,
    total: posts.length,
    posts,
  });
});

// ========================================================
// ADMIN: GET ALL POSTS
// GET /api/secret-growth-hub/admin
// ========================================================
const getAdminPosts = asyncHandler(async (req, res) => {
  const posts = await SecretGrowthHub.find()
    .sort({ isPinned: -1, createdAt: -1 })
    .lean();

  return res.status(200).json({
    success: true,
    total: posts.length,
    posts,
  });
});

// ========================================================
// ADMIN: CREATE POST WITH DESKTOP FILE UPLOAD OR LINK
// POST /api/secret-growth-hub/admin
// ========================================================
const createHubPost = asyncHandler(async (req, res) => {
  const { content, externalLink, buttonText, isPinned, postType } = req.body;

  let finalType = postType || "TEXT";
  let fileUrl = "";
  let fileName = "";

  // Agar desktop se file aayi hai
  if (req.file) {
    fileUrl = `/uploads/secret-growth-hub/${req.file.filename}`;
    fileName = req.file.originalname;

    const mime = req.file.mimetype;
    if (mime.startsWith("image/")) finalType = "IMAGE";
    else if (mime.startsWith("video/")) finalType = "VIDEO";
    else if (mime.startsWith("audio/")) finalType = "AUDIO";
    else if (mime === "application/pdf") finalType = "PDF";
  } else if (externalLink && externalLink.trim()) {
    finalType = "LINK";
  }

  if (!content && !fileUrl && !externalLink) {
    return res.status(400).json({
      success: false,
      message: "Please provide either text content, an uploaded file, or an external link.",
    });
  }

  const newPost = await SecretGrowthHub.create({
    content: content || "",
    postType: finalType,
    fileUrl,
    fileName,
    externalLink: externalLink || "",
    buttonText: buttonText || "Open Link",
    isPinned: isPinned === "true" || isPinned === true,
    isActive: true,
  });

  return res.status(201).json({
    success: true,
    message: "Post published to Secret Growth Hub successfully",
    post: newPost,
  });
});

// ========================================================
// ADMIN: DELETE POST
// DELETE /api/secret-growth-hub/admin/:id
// ========================================================
const deleteHubPost = asyncHandler(async (req, res) => {
  const post = await SecretGrowthHub.findByIdAndDelete(req.params.id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
});

module.exports = {
  getHubFeed,
  getAdminPosts,
  createHubPost,
  deleteHubPost,
};