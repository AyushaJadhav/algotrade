const express = require("express");
const authenticateJWT = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/protected-data", authenticateJWT, (req, res) => {
  res.json({
    message: "Protected data access granted",
    user: req.user,
  });
});

module.exports = router;
