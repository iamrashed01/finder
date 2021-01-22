const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = require('express').Router();

router.get('/',
  passport.authenticate('facebook', { scope: ['profile', 'email'] }));

router.get('/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    const payload = {
      id: req.user.id,
      email: req.user.googleEmail,
      provider: req.user.provider,
      name: req.user.displayName,
    };
    const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
      expiresIn: '7d',
    });
    res.clearCookie('auth_token');
    res.cookie('auth_token', token);
    res.redirect(process.env.clientURL);
  });

module.exports = router;
