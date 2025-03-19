const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
require("./config/passport");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.send("TOLC backend"));

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
