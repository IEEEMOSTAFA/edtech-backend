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
    const result = await availabilityService.getTutorAvailability(req.params.id as string);
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
    const result = await tutorService.getTutorById(req.params.id as string);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};





const getTutorDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("User:", req.user);
    const tutorId = req.user?.id;

    if (!tutorId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await tutorService.getTutorDashboard(tutorId);

    res.json({
      success: true,
      data: result,
    });
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
  getTutorDashboard
};
















