import express, { Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import { config } from "dotenv";
config();
import { connectDB } from "./config/db";
import authRoutes from "./routes/route.auth";
import protectedRoutes from "./routes/route.protected";
import organizationRoutes from "./routes/route.organization";
import "./config/passport";

const app = express();
const PORT = process.env.PORT || 5000;

const SESSION_SECRET = process.env.SESSION_SECRET;

if (!SESSION_SECRET) {
  throw new Error("Missin env variable SESSION_SECRET");
}

app.use(express.json());

connectDB();

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req: Request, res: Response) => {
  res.send("TOLC backend");
});

app.use("/api/auth", authRoutes);
app.use("/api/organization", organizationRoutes);
app.use("/api", protectedRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
