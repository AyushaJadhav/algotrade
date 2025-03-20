import express, { Router, Request } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { generateToken } from "../utils/jwt";

const router: Router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env variable");
}

if (!FRONTEND_URL) {
  throw new Error("Missing FRONTEND_URL env variable");
}

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      if (user.authType === "local") {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      user.password = password;
      user.authType = "local"; 
      await user.save();

      res
        .status(200)
        .json({ user, message: "Local login linked to Google account." });
      return;
    }

    user = new User({ name, email, password, authType: "local" });
    await user.save();

    res.status(200).json({ user });

    return;
  } catch (err) {
    res.status(500).json({ message: "Error creating user." });
    return;
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    (err: any, user: any, info: any) => {
      // TODO add better types
      if (err || !user) {
        res.status(400).json({ message: info.message || "Login failed." });
        return;
      }

      const token = generateToken(user);
      res.json({ token, user });
    }
  )(req, res, next);
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failure" }),
  (req: any, res) => {
    const payload = {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
    } as IUser;
    const token = generateToken(payload);

    res.status(200).send({
      token: `Bearer ${token}`,
      message: "Logged in successfully",
    });
    return;
  }
);

router.get("/login-failure", (req, res) => {
  res.send("Login failed. Try again.");
});

export default router;
