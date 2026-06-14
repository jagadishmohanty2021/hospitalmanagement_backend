require("./config/env");

const app = require("./app");

const connectDB = require(
  "./config/db"
);

const logger = require(
  "./config/logger"
);

const PORT =
  process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      logger.info(
        `Server running on port ${PORT}`
      );
    });
  } catch (error) {
    logger.error(error);

    process.exit(1);
  }
})();
