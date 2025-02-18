const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  token: {
    type: String,
  },
});

exports.User = mongoose.model("User", userSchema);
