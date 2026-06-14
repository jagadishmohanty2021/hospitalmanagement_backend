const ApiError = require(
  "../utils/ApiErrors"
);

module.exports = (
  req,
  res,
  next
) => {
  next(
    new ApiError(
      404,
      `Route not found: ${req.originalUrl}`
    )
  );
};
