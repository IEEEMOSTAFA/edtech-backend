import { Router } from "express";
import { CategoryController } from "./category.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = Router();

// 🌍 Public – anyone can see categories
router.get("/", CategoryController.getCategories);

// 🛡️ Admin only – create category
router.post(
  "/",
  auth(UserRole.ADMIN),
  CategoryController.createCategory
);

// 🛡️ Admin only – update category
router.patch(
  "/:id",
  auth(UserRole.ADMIN),
  CategoryController.updateCategory
);

export const categoryRouter = router;
