const authService = require("../service/auth");
const tokenService = require("../service/token");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../middleware/async");
const logger = require("../config/logger");
const {
  accessCookieOptions,
  refreshCookieOptions,
} = require("../utils/cookieOption");

class AuthController {
  register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const user = await authService.register(name, email, password);

    logger.info({ event: "REGISTER_SUCCESS", userId: user._id });

    return res.status(201).json(
      new ApiResponse(201, "User registered successfully", user)
    );
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } =
      await authService.login(email, password);

    res.cookie("accessToken", accessToken, accessCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    logger.info({ event: "LOGIN_SUCCESS", userId: user._id });

    return res.json(
      new ApiResponse(200, "Login successful", {
        user,
        accessToken,
        refreshToken,
      })
    );
  });

  refreshToken = asyncHandler(async (req, res) => {
    const token = req.cookies.refreshToken || req.body.refreshToken;

    const tokens = await authService.refresh(token);

    res.cookie("accessToken", tokens.accessToken, accessCookieOptions);
    res.cookie("refreshToken", tokens.refreshToken, refreshCookieOptions);

    return res.json(
      new ApiResponse(200, "Token refreshed successfully", tokens)
    );
  });

  logout = asyncHandler(async (req, res) => {
    const token = req.cookies.refreshToken || req.body.refreshToken;

    await authService.logout(token);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.json(new ApiResponse(200, "Logged out successfully"));
  });
}

module.exports = new AuthController();