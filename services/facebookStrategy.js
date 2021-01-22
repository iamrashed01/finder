const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../model/user');

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.callbackFacebookURL,
  enableProof: true,
},
(async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ facebookId: profile.id });
    if (user) {
      return done(null, user);
    }
  } catch (error) {
    console.log(error.message);
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
  } catch (error) {
    console.log(error);
  }
})));
