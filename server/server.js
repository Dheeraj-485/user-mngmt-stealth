const express = require("express");
const cors = require("cors");
// const authRoutes = require("./routes/User");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { db } = require("./config/db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

db();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
