const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decode.id).select("-password");

      if (!user) {
        return res.status(401).json({ msg: "User not found from token" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Token invalid:", error.message);
      return res.status(401).json({ msg: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ msg: "No token provided in header" });
  }
};

module.exports = protect;
