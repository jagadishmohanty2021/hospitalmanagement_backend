const userService = require("../service/user");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../middleware/async");

class UserController {
  getAllUsers = asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();

    return res.json(new ApiResponse(200, "Users fetched", users));
  });

  getUserById = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id);

    return res.json(new ApiResponse(200, "User fetched", user));
  });

  updateUser = asyncHandler(async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);

    return res.json(new ApiResponse(200, "User updated", user));
  });

  deleteUser = asyncHandler(async (req, res) => {
    await userService.deleteUser(req.params.id);

    return res.json(new ApiResponse(200, "User deleted successfully"));
  });

  getProfile = asyncHandler(async (req, res) => {
    const user = await userService.getProfile(req.user.userId);

    return res.json(new ApiResponse(200, "Profile fetched", user));
  });
}

module.exports = new UserController();
