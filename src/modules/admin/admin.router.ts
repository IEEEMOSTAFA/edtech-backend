import { Router } from "express";
import { AdminController } from "./admin.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = Router();


//  Admin Dashboard
router.get("/", auth(UserRole.ADMIN), AdminController.getDashboard);
console.log("Admin router loaded");


//  Admin only routes
router.get("/users", auth(UserRole.ADMIN), AdminController.getUsers);

router.patch(
  "/users/:id",
  auth(UserRole.ADMIN),
  AdminController.updateUser
);

router.get("/bookings", auth(UserRole.ADMIN), AdminController.getBookings);

router.post(
  "/categories",
  auth(UserRole.ADMIN),
  AdminController.createCategory
);

export const adminRouter = router;
