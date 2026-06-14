const bcrypt =
  require("bcryptjs");

const User =
  require("../models/User");

const RefreshToken =
  require(
    "../models/RefreshToken"
  );

const ApiError =
  require(
    "../utils/ApiErrors"
  );

const logger =
  require(
    "../config/logger"
  );

const {
  MAX_LOGIN_ATTEMPTS,
  ACCOUNT_LOCK_TIME,
} = require(
  "../utils/constants"
);

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require(
  "./token"
);

class AuthService {

  async register(
    name,
    email,
    password
  ) {

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      throw new ApiError(
        409,
        "Email already exists"
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        12
      );

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
      });

    logger.info({
      event:
        "USER_REGISTERED",
      userId:
        user._id,
    });

    return user;
  }

  async login(
    email,
    password
  ) {

    const user =
      await User.findOne({
        email,
      }).select(
        "+password"
      );

    if (!user) {
      throw new ApiError(
        401,
        "Invalid credentials"
      );
    }

    if (
      user.lockUntil &&
      user.lockUntil >
        Date.now()
    ) {
      throw new ApiError(
        403,
        "Account temporarily locked"
      );
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      user.loginAttempts += 1;

      if (
        user.loginAttempts >=
        MAX_LOGIN_ATTEMPTS
      ) {
        user.lockUntil =
          Date.now() +
          ACCOUNT_LOCK_TIME;
      }

      await user.save();

      throw new ApiError(
        401,
        "Invalid credentials"
      );
    }

    user.loginAttempts = 0;
    user.lockUntil = null;
    user.lastLoginAt =
      new Date();

    await user.save();

    const accessToken =
      generateAccessToken(
        user
      );

    const refreshToken =
      generateRefreshToken(
        user
      );

    await RefreshToken.create(
      {
        user:
          user._id,
        token:
          refreshToken,
        expiresAt:
          new Date(
            Date.now() +
              7 *
                24 *
                60 *
                60 *
                1000
          ),
      }
    );

    logger.info({
      event:
        "USER_LOGIN",
      userId:
        user._id,
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async refresh(
    refreshToken
  ) {

    const decoded =
      verifyRefreshToken(
        refreshToken
      );

    const storedToken =
      await RefreshToken.findOne(
        {
          token:
            refreshToken,
          revoked:
            false,
        }
      );

    if (!storedToken) {
      throw new ApiError(
        401,
        "Invalid refresh token"
      );
    }

    const user =
      await User.findById(
        decoded.userId
      );

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    storedToken.revoked =
      true;

    await storedToken.save();

    const newAccessToken =
      generateAccessToken(
        user
      );

    const newRefreshToken =
      generateRefreshToken(
        user
      );

    await RefreshToken.create(
      {
        user:
          user._id,
        token:
          newRefreshToken,
        expiresAt:
          new Date(
            Date.now() +
              7 *
                24 *
                60 *
                60 *
                1000
          ),
      }
    );

    return {
      accessToken:
        newAccessToken,
      refreshToken:
        newRefreshToken,
    };
  }

  async logout(
    refreshToken
  ) {

    await RefreshToken.updateOne(
      {
        token:
          refreshToken,
      },
      {
        revoked: true,
      }
    );

    return true;
  }
}

module.exports =
  new AuthService();
