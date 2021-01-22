const router = require('express').Router();
const auth = require('../middlewarre/auth');
const {
  createUser,
  verifyUser,
  loginUser,
  authStatus,
} = require('../controllers/auth');
/**
 * /api/auth
 */
router.post('/register', createUser);
router.post('/verify', verifyUser);
router.post('/login', loginUser);
router.get('/auth-status', auth, authStatus);

module.exports = router;
