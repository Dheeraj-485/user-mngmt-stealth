// const jwt = require("jsonwebtoken");
// const { decode } = require("punycode");

// require("dotenv").config();

// exports.isAuth = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ message: "Token not found or expired" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("decoded", decoded);

//     if (!decoded) {
//       return res.status(402).json({ message: "UnAuthorized user" });
//     }
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error("Error in authorization", error.message);
//     return res
//       .status(500)
//       .json({ message: "Error in authorization", error: error.message });
//   }
// };

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// module.exports = authMiddleware;

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" });
  next();
};

module.exports = { authMiddleware, isAdmin };
