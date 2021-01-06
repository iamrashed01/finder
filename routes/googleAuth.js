const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = function (app) {
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    const payload = {
      user: {
        id: req.user.id,
      },
    };
    const token = jwt.sign({
      payload,
    }, process.env.JWT_PRIVATE_KEY, { expiresIn: '7d' });
    res.clearCookie('auth_token');
    res.cookie('auth_token', token);
    res.redirect('/done');
  });

  app.get('/done', (req, res) => {
    res.send('done');
  });
};
