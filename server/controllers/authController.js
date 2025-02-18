const jwt = require("jsonwebtoken");
const { signupSchema } = require("../utils/validation");
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    //We can create admin by using super secret key but we don't want to do it as its not a good approach
    // let role = "user"; // Default role is user
    // if (adminSecret && adminSecret === process.env.ADMIN_SECRET) {
    //   role = "admin"; // Assign admin role if secret is correct
    // }
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashed });
    const doc = await user.save();

    res.status(201).json({ message: "User created successfully", doc });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ message: "User login successfully", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { signup, login };
