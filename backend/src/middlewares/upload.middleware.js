const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "text/csv",
    "application/csv",
    "text/plain",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const allowedExtensions = [
    ".csv",
    ".xls",
    ".xlsx",
  ];

  const fileName = file.originalname.toLowerCase();

  const hasValidExtension = allowedExtensions.some(
    (extension) => fileName.endsWith(extension)
  );

  const hasValidMimeType =
    allowedMimeTypes.includes(file.mimetype);

  if (hasValidExtension || hasValidMimeType) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only CSV, XLS and XLSX files are allowed"
      )
    );
  }
};

const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

module.exports = upload;