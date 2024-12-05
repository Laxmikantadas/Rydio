const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  // const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const isBlacklistToken = await userModel.findOne({ token: token });
  if (isBlacklistToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    const user = await userModel.findById(decoded._id);

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
