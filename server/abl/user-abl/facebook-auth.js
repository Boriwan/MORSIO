const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("./models/User"); // Import your User model

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      // Check if the user already exists in your database
      const existingUser = await User.findOne({
        facebookId: profile.id,
      });

      if (existingUser) {
        // If the user exists, return the user
        return done(null, existingUser);
      } else {
        // If the user doesn't exist, create a new user in your database
        const newUser = new User({
          facebookId: profile.id,
          name: profile.displayName,
          // Add other user properties as needed
        });

        await newUser.save();
        return done(null, newUser);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = passport;
