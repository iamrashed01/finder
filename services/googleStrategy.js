const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');
const User = require('../model/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.callbackURL,
  passReqToCallback: true,
},
(async (request, accessToken, refreshToken, profile, done) => {
  console.log('profile>>>', profile);
  try {
    const user = await User.findOne({ googleId: profile.id });

    if (user) {
      return done(null, user);
    }
  } catch (err) {
    return console.log(err.message);
  }

  try {
    const newUser = await new User({
      provider: profile.provider,
      googleId: profile.id,
      googleEmail: profile.emails[0].value,
      name: profile.displayName,
      isVerified: true,
    }).save();
    return done(null, newUser);
  } catch (err) {
    return console.log(err.message);
  }
})));
