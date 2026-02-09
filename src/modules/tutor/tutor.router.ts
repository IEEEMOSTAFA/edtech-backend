import { Router } from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { TutorController } from "./tutor.controller";

const router = Router();

// 🌍 Public
router.get("/", TutorController.getAllTutors);
router.get("/:id", TutorController.getTutorById);
router.get("/:id/availability", TutorController.getTutorAvailability);

// 🔐 Tutor
router.put("/profile", auth(UserRole.TUTOR), TutorController.updateTutorProfile);
router.put("/availability", auth(UserRole.TUTOR), TutorController.setAvailability);

export const tutorRouter = router;







// // src/modules/tutor/tutor.router.ts
// import { Router } from "express";
// import auth, { UserRole } from "../../middlewares/auth";
// import { TutorController } from "./tutor.controller";

// const router = Router();

// // 🌍 Public
// router.get("/", TutorController.getAllTutors);
// router.get("/:id", TutorController.getTutorById);

// // 🔐 Tutor only
// router.put("/profile", auth(UserRole.TUTOR), TutorController.updateTutorProfile);
// router.put(
//   "/availability",
//   auth(UserRole.TUTOR),
//   TutorController.setAvailability
// );

// // 🌍 Public
// router.get(
//   "/:id/availability",
//   TutorController.getTutorAvailability
// );

// export const tutorRouter = router;
