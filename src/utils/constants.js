module.exports = {
  USER_ROLES: {
    USER: "user",
    ADMIN: "admin",
  },

  ACCOUNT_LOCK_TIME:
    15 * 60 * 1000,

  MAX_LOGIN_ATTEMPTS: 5,

  ACCESS_TOKEN_EXPIRY:
    "15m",

  REFRESH_TOKEN_EXPIRY:
    "7d",
};
