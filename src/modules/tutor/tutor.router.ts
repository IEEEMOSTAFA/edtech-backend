import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { TutorController } from "./tutor.controller";

const router = Router();

// 🌍 Public
router.get("/", TutorController.getAllTutors);
router.get("/:id", TutorController.getTutorById);

// 🔐 Tutor only
router.put(
  "/profile",
  auth(UserRole.TUTOR),
  TutorController.updateTutorProfile
);

export const tutorRouter = router;
