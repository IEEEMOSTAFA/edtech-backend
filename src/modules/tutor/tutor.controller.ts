import { Request, Response, NextFunction } from "express";
import { tutorService } from "./tutor.service";

const updateTutorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await tutorService.upsertTutorProfile(userId, req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllTutors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await tutorService.getAllTutors();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getTutorById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await tutorService.getTutorById(req.params.id as string);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const TutorController = {
  updateTutorProfile,
  getAllTutors,
  getTutorById,
};
