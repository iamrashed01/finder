const router = require("express").Router();
const {
  createUser,
  verifyUser,
  loginUser,
  authStatus,
} = require("../controllers/auth");
/**
 * /api/auth
 */
router.post("/register", createUser);
router.post("/verify", verifyUser);
router.post("/login", loginUser);
router.get("/auth-status", authStatus);

module.exports = router;
