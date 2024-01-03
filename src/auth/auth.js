const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../../config/default");
const { findOneUser } = require("../services/user");

const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const extractedToken = token.replace("Bearer ", "");
    const decoded = jwt.verify(extractedToken, jwt_secret);

    const { id, email } = decoded;
    const user = await findOneUser({ id, email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid token. User not found." });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = authenticateUser;
