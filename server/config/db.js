const mongoose = require("mongoose");
require("dotenv").config();

const URL = process.env.MONGO_URL || "mongodb://localhost:27017/userManagement";
exports.db = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("Error connecting to MongoDB", err.message));
};
