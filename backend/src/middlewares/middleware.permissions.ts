import { NextFunction, Request, Response } from "express";
import Organization from "../models/model.organization";
import { IUser } from "../models/model.user";

export const checkEditorPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orgId = req.params.id;
  const user = req.user as IUser;
  const userId = user.id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const organization = await Organization.findById(orgId).select(
      "associates"
    );

    if (!organization) {
      res.status(404).json({ message: "Organization not found" });
      return;
    }

    const associate = organization.associates.find(
      (assoc: any) => assoc.user.toString() === userId
    );

    if (!associate) {
      res.status(403).json({ message: "Access denied: Not an associate" });
      return;
    }

    if (associate.role !== "editor") {
      res.status(403).json({ message: "Access denied: Editor role required" });
      return;
    }

    next();
  } catch (err) {
    next(err);
  }
};
