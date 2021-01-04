const router = require('express').Router();
const { createUser, verifyUser } = require('../controllers/auth');

router.post('/register', createUser);
router.post('/verify', verifyUser);

module.exports = router;
