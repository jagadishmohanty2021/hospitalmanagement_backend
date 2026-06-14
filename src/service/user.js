const User =
  require("../models/User");

const ApiError =
  require(
    "../utils/ApiErrors"
  );

class UserService {

  async getAllUsers() {
    return User.find();
  }

  async getUserById(
    id
  ) {

    const user =
      await User.findById(id);

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    return user;
  }

  async updateUser(
    id,
    payload
  ) {

    const user =
      await User.findByIdAndUpdate(
        id,
        payload,
        {
          new: true,
          runValidators:
            true,
        }
      );

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    return user;
  }

  async deleteUser(
    id
  ) {

    const user =
      await User.findByIdAndDelete(
        id
      );

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    return true;
  }

  async getProfile(
    userId
  ) {

    const user =
      await User.findById(
        userId
      );

    if (!user) {
      throw new ApiError(
        404,
        "User not found"
      );
    }

    return user;
  }
}

module.exports =
  new UserService();
