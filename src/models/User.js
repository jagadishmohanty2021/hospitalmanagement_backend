const mongoose =
  require("mongoose");

const userSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
      },

      password: {
        type: String,
        required: true,
        select: false,
      },

      role: {
        type: String,
        enum: [
          "user",
          "admin",
        ],
        default: "user",
      },

      loginAttempts: {
        type: Number,
        default: 0,
      },

      lockUntil: {
        type: Date,
        default: null,
      },

      isEmailVerified: {
        type: Boolean,
        default: false,
      },

      lastLoginAt: Date,
    },
    {
      timestamps: true,
    }
  );

userSchema.methods.toJSON =
  function () {
    const user =
      this.toObject();

    delete user.password;
    delete user.loginAttempts;
    delete user.lockUntil;

    return user;
  };

module.exports =
  mongoose.model(
    "User",
    userSchema
  );