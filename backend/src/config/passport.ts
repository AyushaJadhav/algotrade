import passport, { Profile } from "passport";
import {
  Strategy as GoogleStrategy,
  StrategyOptions,
  VerifyCallback
} from "passport-google-oauth20";
import User, { IUser } from "../models/User";

const options: StrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: process.env.GOOGLE_CALLBACK_URL!,
};


passport.serializeUser((user: Express.User, done) => {
  done(null, (user as IUser)._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
});

passport.use(
  new GoogleStrategy(
    options,
    async (accessToken: string, refreshToken:string, profile:Profile, done:VerifyCallback) => { 
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0].value,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
