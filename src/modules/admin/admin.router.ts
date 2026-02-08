import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { AdminController } from "./admin.controller";

const router = Router();

router.get(
  "/users",
  auth(UserRole.ADMIN),
  AdminController.getUsers
);

router.patch(
  "/users/:id",
  auth(UserRole.ADMIN),
  AdminController.updateUserStatus
);

export const adminRouter = router;
