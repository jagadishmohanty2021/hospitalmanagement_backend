const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const morgan = require("morgan");

const logger = require("./config/logger");

const apiLimiter = require("./middleware/ratelimiter");
const errorHandler = require("./middleware/error");
const notFound = require("./middleware/nonFound");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDoc = YAML.load("src/docs/swagger.yaml");



const app = express();

app.disable("x-powered-by");

// Security headers
app.use(helmet());

// CORS
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   })
// );

// Body parsing
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Cookies
app.use(cookieParser());

// Compression
app.use(compression());

// NoSQL injection protection
app.use((req, res, next) => {
  req.body = mongoSanitize.sanitize(req.body);
  req.query = mongoSanitize.sanitize(req.query);
  req.params = mongoSanitize.sanitize(req.params);
  next();
});

// HTTP Parameter Pollution
app.use(hpp());

// Request logging
app.use(
  morgan("combined", {
    stream: {
      write: (msg) => logger.info(msg.trim()),
    },
  })
);

// Global rate limit
app.use(apiLimiter);

// Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ success: true, message: "API running" });
});

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

module.exports = app;
