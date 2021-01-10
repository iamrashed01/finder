const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/callback", passport.authenticate("google"), (req, res) => {
  const payload = {
    user: {
      id: req.user.id,
      email: req.user.googleEmail,
      name: req.user.name,
    },
  };
  const token = jwt.sign(
    {
      payload,
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "7d" }
  );
  res.clearCookie("auth_token");
  res.cookie("auth_token", token);
  res.redirect(process.env.clientURL);
});

module.exports = router;
