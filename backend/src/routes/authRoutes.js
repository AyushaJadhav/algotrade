const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failure" }),
  (req, res) => {
    const payload = {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
  }
);

router.get("/login-failure", (req, res) => {
  res.send("Login failed. Try again.");
});

module.exports = router;
