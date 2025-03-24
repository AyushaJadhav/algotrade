import { NextFunction, Request, Response } from "express";
import User from "../models/model.user";
import Organization from "../models/model.organization";
import httpStatus from "../utils/httpStatusCodes";

export const createOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      orgName,
      orgPAN,
      orgGSTNo,
      orgAddress,
      orgContact,
      associateName,
      associateEmail,
      associatePassword,
    } = req.body;

    let associateUser = await User.findOne({ email: associateEmail });

    if (associateUser) {
      if (!associateUser.password && associatePassword) {
        associateUser.password = associatePassword;
      }
      associateUser.authType = "local";
      await associateUser.save();
    } else {
      associateUser = new User({
        name: associateName,
        email: associateEmail,
        password: associatePassword,
        authType: "local",
      });
      await associateUser.save();
    }

    const existingOrg = await Organization.findOne({
      $or: [{ orgPAN }, { orgGSTNo }],
    });
    if (existingOrg) {
      res
        .status(httpStatus.CONFLICT)
        .json({ message: "Organization already registered." });
      return;
    }

    const newOrg = new Organization({
      orgName,
      orgPAN,
      orgGSTNo,
      orgAddress,
      orgContact,
      associates: [{ user: associateUser._id, role: "editor" }],
    });

    await newOrg.save();

    res.status(httpStatus.CREATED).json({ organizationId: newOrg._id });
    return;
  } catch (err) {
    next(err);
  }
};

export const getOrganizations = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orgs = await Organization.find()
      .select("orgName orgPAN orgGSTNo orgContact createdAt")
      .lean();
    res.status(httpStatus.OK).json(orgs);
    return;
  } catch (err) {
    next(err);
  }
};

export const getOrganizationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Organization ID is required." });
      return;
    }

    const org = await Organization.findById(id)
      .populate("associates", "name email role")
      .lean();
    if (!org) {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Organization not found." });
      return;
    }
    res.status(httpStatus.OK).json(org);
    return;
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: "Error occured" });
    next(err);
  }
};

export const updateOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedOrg = await Organization.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrg) {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Organization not found." });
      return;
    }

    res.status(httpStatus.OK).json(updatedOrg);
  } catch (err) {
    next(err);
  }
};

export const deleteOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedOrg = await Organization.findByIdAndDelete(id);
    if (!deletedOrg) {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Organization not found." });
      return;
    }
    res.status(httpStatus.NO_CONTENT).json({ message: "Organization deleted" });
    return;
  } catch (err) {
    next(err);
  }
};
