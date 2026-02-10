import { Router } from "express";
import { ReviewController } from "./review.controller";
import auth from "../../middlewares/auth";

const router = Router();

// 🛡️ Student only – create review
router.post("/", auth(), ReviewController.createReview);

export const reviewRouter = router;
