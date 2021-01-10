const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const token = req.header("auth_token");
  if (!token) return res.status(401).send("please provide a valid token");

  try {
    const decoded = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    return next();
  } catch (err) {
    res.status(401).json({ message: "invalid token" });
  }
};
