import { Router } from "express";
import { ReviewController } from "./review.controller";
import auth from "../../middlewares/auth";

const router = Router();

//  Student only – create review
router.post("/", auth(), ReviewController.createReview);
router.get("/:id",auth(),ReviewController.getReview);
router.patch("/:id", auth(),ReviewController.updateReview);




export const reviewRouter = router;
