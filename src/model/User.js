const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      max: 20,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    quiz: [
      {
        test: Number,
        result: Number,
      },
    ],
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
};

module.exports = mongoose.model("User", userSchema);
