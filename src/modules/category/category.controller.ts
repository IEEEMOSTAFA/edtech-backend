import { Request, Response, NextFunction } from "express";
import { categoryService } from "./category.service";

const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await categoryService.getAllCategories();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, icon } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const result = await categoryService.createCategory({
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

const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }
    const result = await categoryService.updateCategory(id as string, req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const CategoryController = {
  getCategories,
  createCategory,
  updateCategory,
};
