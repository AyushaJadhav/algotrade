import express, { Request, Response, Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.get("/protected-data", authenticateJWT, (req: Request, res: Response) => {
  res.json({
    message: "Protected data access granted",
    user: req.user,
  });
});

export default router;
