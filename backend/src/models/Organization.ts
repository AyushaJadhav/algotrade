import { Model, Schema } from "mongoose";

import mongoose from "mongoose";

export interface IOrganization extends Document {
  orgName: string;
  orgPAN: string;
  orgGSTNo: string;
  orgAddress: string;
  orgContact: string;
  headAssociateUsername: string;
  headAssociatePass: string;
  createdAt: Date;
}

const orgSchema: Schema<IOrganization> = new mongoose.Schema<IOrganization>({
  orgName: { type: String, required: true, unique: false },
  orgPAN: { type: String, required: true, unique: true },
  orgGSTNo: { type: String, required: true, unique: true },
  orgAddress: { type: String, required: true, unique: false },
  orgContact: { type: String, required: true, unique: true },
  headAssociateUsername: { type: String, required: true, unique: true },
  headAssociatePass: { type: String, required: true, unique: false },
  createdAt: { type: Date, default: Date.now },
});

const Organization: Model<IOrganization> = mongoose.model<IOrganization>("Organization", orgSchema);
module.exports = Organization;
