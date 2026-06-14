const {
  body,
  param,
} = require(
  "express-validator"
);

exports.updateUserValidator =
  [
    param("id")
      .isMongoId()
      .withMessage(
        "Invalid user id"
      ),

    body("name")
      .optional()
      .trim()
      .isLength({
        min: 3,
      }),

    body("role")
      .optional()
      .isIn([
        "user",
        "admin",
      ]),
  ];

exports.userIdValidator = [
  param("id")
    .isMongoId()
    .withMessage(
      "Invalid user id"
    ),
];
