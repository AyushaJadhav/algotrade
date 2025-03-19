import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
  googleId: string;
  name: string;
  email: string;
  createdAt: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema<IUser>({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
