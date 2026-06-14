const {
  body,
} = require(
  "express-validator"
);

exports.registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(
      "Name is required"
    )
    .isLength({
      min: 3,
      max: 100,
    }),

  body("email")
    .trim()
    .isEmail()
    .withMessage(
      "Valid email required"
    )
    .normalizeEmail(),

  body("password")
    .isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password is not strong enough"
    ),
];

exports.loginValidator = [
  body("email")
    .isEmail()
    .withMessage(
      "Valid email required"
    ),

  body("password")
    .notEmpty()
    .withMessage(
      "Password required"
    ),
];

exports.refreshTokenValidator =
  [];
