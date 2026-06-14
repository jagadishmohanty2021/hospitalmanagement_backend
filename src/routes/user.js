const express = require("express");
const router = express.Router();

const userController = require("../controller/user");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const validate = require("../middleware/validate");

const {
  updateUserValidator,
  userIdValidator,
} = require("../validator/user");

router.get("/", auth, role("admin"), userController.getAllUsers);

router.get("/profile", auth, userController.getProfile);

router.get("/:id", auth, userIdValidator, validate, userController.getUserById);

router.put(
  "/:id",
  auth,
  updateUserValidator,
  validate,
  userController.updateUser
);

router.delete("/:id", auth, role("admin"), userController.deleteUser);

module.exports = router;
