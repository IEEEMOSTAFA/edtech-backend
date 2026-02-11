import { Request, Response, NextFunction } from "express";
import { studentService } from "./student.service";

// 📊 GET /api/dashboard
const getDashboard = async (req: any, res: Response, next: NextFunction) => {
  try {
    const result = await studentService.getStudentDashboard(req.user.id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// 📅 GET /api/dashboard/bookings
const getMyBookings = async (req: any, res: Response, next: NextFunction) => {
  try {
    const result = await studentService.getMyBookings(req.user.id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// 👤 GET /api/dashboard/profile
const getProfile = async (req: any, res: Response, next: NextFunction) => {
  try {
    const result = await studentService.getMyProfile(req.user.id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ✏️ PATCH /api/dashboard/profile
const updateProfile = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { name, image } = req.body;

    const result = await studentService.updateMyProfile(req.user.id, {
      name,
      image,
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};




export const StudentController = {
  getDashboard,
  getMyBookings,
  getProfile,
  updateProfile
};
