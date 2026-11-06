const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Upload directory ensure karein (src se bahar root backend/uploads me)
const uploadDir = path.resolve(__dirname, "../../uploads/secret-growth-hub");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    
    // Original file name se saare spaces, dots aur symbols ko dash (-) bana dein
    const cleanBaseName = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const timestamp = Date.now();
    const randomDigits = Math.floor(100000 + Math.random() * 900000);

    // Final clean name (No spaces, pure safe characters)
    // E.g. hub-1793952485159-429157145-3-pm-class.png
    const finalFileName = cleanBaseName
      ? `hub-${timestamp}-${randomDigits}-${cleanBaseName}${ext}`
      : `hub-${timestamp}-${randomDigits}${ext}`;

    cb(null, finalFileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "video/mkv",
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/ogg",
    "audio/m4a",
    "application/pdf",
  ];

  if (
    allowedMimeTypes.includes(file.mimetype) ||
    file.mimetype.startsWith("video/") ||
    file.mimetype.startsWith("audio/") ||
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("File format not supported! Only Images, Videos, Audios, and PDFs are allowed."), false);
  }
};

const hubUpload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
  fileFilter: fileFilter,
});

module.exports = hubUpload;