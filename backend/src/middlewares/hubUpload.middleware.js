const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Upload directory ensure karein
const uploadDir = path.join(__dirname, "../../uploads/secret-growth-hub");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage engine: desktop se aayi file ko unique name ke sath save karega
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `hub-${uniqueSuffix}${ext}`);
  },
});

// File filter: video, audio, image, pdf allow karein
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    // Images
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    // Videos
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "video/mkv",
    // Audio
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/ogg",
    "audio/m4a",
    // Documents
    "application/pdf",
  ];

  if (allowedMimeTypes.includes(file.mimetype) || file.mimetype.startsWith("video/") || file.mimetype.startsWith("audio/") || file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("File format not supported! Only Images, Videos, Audios, and PDFs are allowed."), false);
  }
};

const hubUpload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit for high quality video/audio/pdf
  },
  fileFilter: fileFilter,
});

module.exports = hubUpload;