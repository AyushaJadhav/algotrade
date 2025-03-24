import passport, { Profile } from "passport";
import {
  Strategy as GoogleStrategy,
  StrategyOptions,
  VerifyCallback,
} from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import User, { IUser } from "../models/model.user";

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
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        let user = await User.findOne({ email });

        if (!user) {
          done(null, false, { message: "User not found." });
          return;
        }

        if (user.authType === "google" && !user.password) {
          done(null, false, {
            message: "User not found or password not set.",
          });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          done(null, false, { message: "Incorrect password." });
          return;
        }

        done(null, user);
        return;
      } catch (err) {
        done(err);
        return;
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    options,
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        let user = await User.findOne({ email: profile.emails?.[0].value });

        if (user) {
          if (!user.googleId) {
            user.googleId = profile.id;
            user.authType = "google";
            await user.save();
          }
        } else {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0].value,
            authType: "google",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
