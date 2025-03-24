import jwt from "jsonwebtoken";
import { IUser } from "../models/model.user";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("missing env variable JWT_SECRET");
}

export const generateToken = (user: IUser) => {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
};
