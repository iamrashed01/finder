const jwt = require("jsonwebtoken");
const User = require("../model/user");

module.exports = async function (req, res, next) {
  const token = req.header("auth_token");
  if (!token) return res.status(401).send("please provide a valid token");

  let user;
  try {
    user = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  } catch {
    if (!user) return res.status(401).send("invalid token");
  }

  const isMatch = await User.findOne({ email: user.email });
  if (!isMatch) return res.status(401).send("access denied!");
  return next();
};
