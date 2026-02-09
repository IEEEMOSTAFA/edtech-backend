import { Request, Response, NextFunction } from "express";
import { tutorService } from "./tutor.service";
import { availabilityService } from "./tutor.availability.service";

const updateTutorProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const result = await tutorService.upsertTutorProfile(userId, req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const setAvailability = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tutorId = req.user?.id;
    if (!tutorId) return res.status(401).json({ message: "Unauthorized" });

    const result = await availabilityService.updateAvailability(
      tutorId,
      req.body.slots
    );

    res.json({
      success: true,
      message: "Availability updated",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getTutorAvailability = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await availabilityService.getTutorAvailability(req.params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getAllTutors = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await tutorService.getAllTutors();
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getTutorById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await tutorService.getTutorById(req.params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const TutorController = {
  updateTutorProfile,
  setAvailability,
  getTutorAvailability,
  getAllTutors,
  getTutorById,
};

















// // src/modules/tutor/tutor.controller.ts
// import { Request, Response, NextFunction } from "express";
// import { tutorService } from "./tutor.service";
// import { availabilityService } from "./tutor.availability.service";

// const updateTutorProfile = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const userId = req.user?.id;

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const result = await tutorService.upsertTutorProfile(userId, req.body);

//     res.status(200).json({
//       success: true,
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const setAvailability = async (req, res, next) => {
//   try {
//     const tutorId = req.user?.id;

//     if (!tutorId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const result = await availabilityService.updateAvailability(
//       tutorId,
//       req.body.slots
//     );

//     res.status(200).json({
//       success: true,
//       message: "Availability updated successfully",
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // 🌍 Public: get tutor availability
// const getTutorAvailability = async (req, res, next) => {
//   try {
//     const tutorId = req.params.id;

//     const result =
//       await availabilityService.getTutorAvailability(tutorId);

//     res.status(200).json({
//       success: true,
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const getAllTutors = async (_req, res, next) => {
//   try {
//     const tutors = await tutorService.getAllTutors();
//     res.json({ success: true, data: tutors });
//   } catch (error) {
//     next(error);
//   }
// };

// const getTutorById = async (req, res, next) => {
//   try {
//     const tutor = await tutorService.getTutorById(req.params.id);
//     res.json({ success: true, data: tutor });
//   } catch (error) {
//     next(error);
//   }
// };

// export const TutorController = {
//   updateTutorProfile,
  
//   getAllTutors,
//   getTutorById,
//   setAvailability,
//   getTutorAvailability,
// };
