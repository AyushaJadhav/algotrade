import express, { Router, Request } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router: Router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;

if (!JWT_SECRET ) {
  throw new Error("Missing JWT_SECRET env variable");
}

if (!FRONTEND_URL ) {
  throw new Error("Missing FRONTEND_URL env variable");
}

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
    };
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.redirect(`${FRONTEND_URL}/?token=${token}`);
  }
);

router.get("/login-failure", (req, res) => {
  res.send("Login failed. Try again.");
});

export default router;
