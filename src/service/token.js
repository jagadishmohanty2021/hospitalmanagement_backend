const jwt = require("jsonwebtoken");

const {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} = require("../utils/constants");

const generateAccessToken = (
  user
) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn:
        ACCESS_TOKEN_EXPIRY,
    }
  );
};

const generateRefreshToken =
  (user) => {
    return jwt.sign(
      {
        userId: user._id,
      },
      process.env
        .JWT_REFRESH_SECRET,
      {
        expiresIn:
          REFRESH_TOKEN_EXPIRY,
        }
    );
  };

const verifyAccessToken =
  (token) => {
    return jwt.verify(
      token,
      process.env.JWT_SECRET
    );
  };

const verifyRefreshToken =
  (token) => {
    return jwt.verify(
      token,
      process.env
        .JWT_REFRESH_SECRET
    );
  };

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
