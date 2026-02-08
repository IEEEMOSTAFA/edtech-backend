import { Router } from "express";
import auth from "../middlewares/auth";

const authExtraRoutes = Router();

authExtraRoutes.get("/me", auth(), (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

export default authExtraRoutes;
