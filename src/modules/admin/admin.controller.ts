import { Request, Response, NextFunction } from "express";
import { adminService } from "./admin.service";

// 👤 GET /api/admin/users
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminService.getAllUsers();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// 🔒 PATCH /api/admin/users/:id
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await adminService.updateUserStatus(id as string, req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// 📅 GET /api/admin/bookings
const getBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminService.getAllBookings();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// 📚 POST /api/admin/categories
const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, icon } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const result = await adminService.createCategory({
      name,
      description,
      icon,
    });

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


// 📊 GET /api/admin
const getDashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminService.getDashboardStats();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};





export const AdminController = {
  getUsers,
  updateUser,
  getBookings,
  createCategory,
  getDashboard
};
