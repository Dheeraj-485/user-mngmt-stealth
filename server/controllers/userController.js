// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const { User } = require("../models/User");

// exports.createUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const findUser = await User.findOne({ email });

//     if (findUser) {
//       return res
//         .status(400)
//         .json({ message: "User already exists,please use different email id" });
//     }
//     const hashedPass = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       email,
//       name,
//       password: hashedPass,
//     });
//     const response = await newUser.save();
//     return res
//       .status(201)
//       .json({ message: "Usser created successfully", response });
//   } catch (error) {
//     console.log("Error creating user", error.message);
//     return res
//       .status(500)
//       .json({ message: "Error creating user", error: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }
//   const comparePass = await bcrypt.compare(password, user.password);
//   if (!comparePass) {
//     return res.status(401).json({ message: "Invalid credentials " });
//   }

//   const token = await jwt.sign(
//     { id: user._id, email: user.email, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: "24h" }
//   );

//   return res.status(200).json({
//     message: "User login successfully",
//     token,
//     user: { id: user._id, user: user.email, role: user.role },
//   });
// };

// exports.getUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const findUser = await User.findById(id);
//     if (!findUser) {
//       return res.status(401).json({ message: "User not found" });
//     }
//     return res.status(200).json({ message: "User found", user: findUser });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Error finding user", error: error.message });
//   }
// };

// exports.getAllUser = async (req, res) => {
//   try {
//     const findAll = await User.find();
//     if (req.user.role !== "admin") {
//       return res.status(401).json({ message: "Only admincan fetch all users" });
//     }
//     return res
//       .status(200)
//       .json({ message: "Users found successfully", findAll });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Error getting users", error: error.message });
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateUser = await User.findByIdAndUpdate(
//       id,
//       { ...req.body },
//       {
//         new: true,
//       }
//     );
//     return res
//       .status(200)
//       .json({ message: "User updated successfully", user: updateUser });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Error updating user", error: error.message });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (req.user.role !== "admin") {
//       return res
//         .status(401)
//         .json({ message: "Only admin have access to delete users" });
//     }

//     const delUser = await User.findByIdAndDelete(id);

//     if (delUser) {
//       return res
//         .status(200)
//         .json({ message: "User deleted successfully", user: delUser });
//     }
//     return res.status(400).json({ message: "BAd request,user not found" });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Error deleting user", error: error.message });
//   }
// };

// exports.checkUser = async (req, res) => {
//   try {
//     const check = await User.findById(req.user.id).select("-password");
//     if (!check) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     return res.json(check);
//   } catch (error) {
//     return res
//       .status(404)
//       .json({ message: "Error checking user", error: error.message });
//   }
// };

const { User } = require("../models/User");
const { sendEmail } = require("../utils/email");
const bcrypt = require("bcryptjs");
require("dotenv").config();

//Api for admin to create user

const createUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res.status(400).json({ message: "USer already exists" });
    }
    // Generate a temporary password
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    const newUser = new User({ name, email, role, password: hashedPassword });

    const doc = await newUser.save();

    // Send the temporary password to the user's email
    const emailText = `Hello ${name},\n\nYour account has been created. Use the following temporary password to log in:\n\n${tempPassword}\n\nPlease change your password after logging in.\n\nBest regards,\nThe Team`;
    await sendEmail(email, "Your Temporary Password", emailText);

    res.status(201).json({
      message: "User created successfully. Temporary password sent to email.",
      doc,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//Get all users,only accessible by admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//Get user,can be accessible by admin and users
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//Update user profile,can be accessed by users

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    ).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//delete user can only be done by Admin

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const checkUser = async (req, res) => {
  try {
    // Find user and exclude password field
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error checking user", error.message);
    return res
      .status(500)
      .json({ message: "Error checking user", error: error.message });
  }
};

//Change password can be done after user got a temporary mail and then after that he can change
const changePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(req.params.id, { password: hashedPassword });
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  checkUser,
  changePassword,
};
