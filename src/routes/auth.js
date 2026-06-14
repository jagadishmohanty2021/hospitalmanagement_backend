const express = require("express");
const router = express.Router();

const authController = require("../controller/auth");
const loginLimiter = require("../middleware/loginRateLimiter");
const validate = require("../middleware/validate");

const {
  registerValidator,
  loginValidator,
} = require("../validator/auth");

router.post(
  "/register",
  registerValidator,
  validate,
  authController.register
);

router.post(
  "/login",
  loginLimiter,
  loginValidator,
  validate,
  authController.login
);

router.post("/refresh", authController.refreshToken);
router.post("/logout", authController.logout);

module.exports = router;
