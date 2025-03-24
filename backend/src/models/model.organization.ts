import { Model, Schema, Types } from "mongoose";

import mongoose from "mongoose";

export interface IAssociate {
  user: Types.ObjectId;
  role: "editor" | "viewer";
}

export interface IOrganization extends Document {
  orgName: string;
  orgPAN: string;
  orgGSTNo: string;
  orgAddress: string;
  orgContact: string;
  associates: IAssociate[];
  createdAt: Date;
}

const orgSchema: Schema<IOrganization> = new mongoose.Schema<IOrganization>({
  orgName: { type: String, required: true, unique: false },
  orgPAN: { type: String, required: true, unique: true },
  orgGSTNo: { type: String, required: true, unique: true },
  orgAddress: { type: String, required: true, unique: false },
  orgContact: { type: String, required: true, unique: true },
  associates: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      role: {
        type: String,
        enum: ["admin", "editor", "viewer"],
        required: true,
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Organization: Model<IOrganization> = mongoose.model<IOrganization>(
  "Organization",
  orgSchema
);
export default Organization;
