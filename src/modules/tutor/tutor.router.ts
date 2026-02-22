import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { TutorController } from "./tutor.controller";

const router = Router();

//  Public
router.get("/", TutorController.getAllTutors);
//  Tutor Dashboard
router.get("/dashboard",auth(UserRole.TUTOR),TutorController.getTutorDashboard);
router.get("/:id", TutorController.getTutorById);
router.get("/:id/availability", TutorController.getTutorAvailability);

//  Tutor
router.put("/profile", auth(UserRole.TUTOR), TutorController.updateTutorProfile);
router.put("/availability", auth(UserRole.TUTOR), TutorController.setAvailability);

  
  
  


export const tutorRouter = router;






