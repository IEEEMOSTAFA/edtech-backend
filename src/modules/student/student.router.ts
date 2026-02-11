import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { StudentController } from "./student.controller";

const router = Router();

router.get(
  "/",
  auth(UserRole.STUDENT),
  StudentController.getDashboard
);

router.get(
  "/bookings",
  auth(UserRole.STUDENT),
  StudentController.getMyBookings
);

router.get(
  "/profile",
  auth(UserRole.STUDENT),
  StudentController.getProfile
);
router.patch(
  "/profile",
  auth(UserRole.STUDENT),
  StudentController.updateProfile
);

export const studentRouter = router;
