import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { TutorController } from "./tutor.controller";

const router = Router();

router.put(
  "/profile",
  auth(UserRole.TUTOR),
  TutorController.updateProfile
);

router.put(
  "/availability",
  auth(UserRole.TUTOR),
  TutorController.updateAvailability
);

export const tutorRouter = router;
