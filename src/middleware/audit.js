const logger = require(
  "../config/logger"
);

module.exports =
  (eventName) =>
  (req, res, next) => {

    logger.info({
      event: eventName,

      user:
        req.user?.userId ||
        null,

      ip: req.ip,

      method:
        req.method,

      route:
        req.originalUrl,

      timestamp:
        new Date(),
    });

    next();
  };
