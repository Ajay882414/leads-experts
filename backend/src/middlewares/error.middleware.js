const errorHandler = (
  err,
  req,
  res,
  next
) => {
  console.error(err);

  let statusCode =
    err.statusCode || 500;

  let message =
    err.message ||
    "Internal Server Error";

  // Duplicate Email
  if (err.code === 11000) {
    statusCode = 409;
    message =
      "Email already exists";
  }

  // Mongoose Validation
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(
      err.errors
    )
      .map((item) => item.message)
      .join(", ");
  }

  // Invalid ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID";
  }

  // JWT Error
  if (
    err.name ===
    "JsonWebTokenError"
  ) {
    statusCode = 401;
    message = "Invalid Token";
  }

  // JWT Expired
  if (
    err.name ===
    "TokenExpiredError"
  ) {
    statusCode = 401;
    message = "Token Expired";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV ===
      "development" && {
      stack: err.stack,
    }),
  });
};

module.exports = errorHandler;