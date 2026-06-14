const logger = require(
  "../config/logger"
);

module.exports = (
  err,
  req,
  res,
  next
) => {

  logger.error({
    message: err.message,
    stack: err.stack,
    path:
      req.originalUrl,
    method: req.method,
  });

  const statusCode =
    err.statusCode || 500;

  res.status(statusCode).json({
    success: false,

    message:
      process.env.NODE_ENV ===
      "production"
        ? statusCode === 500
          ? "Internal Server Error"
          : err.message
        : err.message,

    errors:
      err.errors || [],
  });
};
