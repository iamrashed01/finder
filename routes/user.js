const router = require("express").Router();
const { getUsers } = require("../controllers/user");
const auth = require("../middlewarre/auth");

router.get("/", auth, getUsers);

module.exports = router;
