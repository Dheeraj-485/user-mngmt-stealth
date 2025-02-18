const mongoose = require("mongoose");
require("dotenv").config();

exports.db = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("Error connecting to MongoDB", err.message));
};
