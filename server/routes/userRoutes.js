const express = require("express");
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  checkUser,
  changePassword,
} = require("../controllers/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/", authMiddleware, isAdmin, createUser);
router.get("/", authMiddleware, isAdmin, getUsers);
router.get("/me", authMiddleware, checkUser);
router.get("/:id", authMiddleware, getUser);
router.put("/:id", authMiddleware, updateUser);
router.put("/:id/change-password", authMiddleware, changePassword);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);

module.exports = router;
