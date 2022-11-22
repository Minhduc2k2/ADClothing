import gg from "passport-google-oauth20";

import passport from "passport";
export default function setUpGG() {
  const GoogleStrategy = gg.Strategy;
  const GOOGLE_CLIENT_ID =
    "582123381617-mta9p99llc8u7p1f57h22hm92s0us7bb.apps.googleusercontent.com";
  const GOOGLE_CLIENT_SECRET = "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";


  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );


  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}
