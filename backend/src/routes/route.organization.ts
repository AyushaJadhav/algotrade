import express from "express";
import {
  createOrganization,
  deleteOrganization,
  getOrganizationById,
  getOrganizations,
  updateOrganization,
} from "../controllers/controller.organization";
import { authenticateJWT } from "../middlewares/middleware.auth";
import { checkEditorPermission } from "../middlewares/middleware.permissions";

const router = express.Router();

router.post("/", createOrganization);
router.get("/", authenticateJWT, getOrganizations);
router.get("/:id", authenticateJWT, checkEditorPermission, getOrganizationById);
router.put("/:id", authenticateJWT, checkEditorPermission, updateOrganization);
router.delete("/:id", authenticateJWT, checkEditorPermission, deleteOrganization);

export default router;