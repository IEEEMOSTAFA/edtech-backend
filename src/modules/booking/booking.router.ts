
import { Router } from "express";
import auth from "../../middlewares/auth";
import { BookingController } from "./booking.controller";

const router = Router();

// Student & Tutor
router.post("/", auth(), BookingController.createBooking);

router.get("/", auth(), BookingController.getMyBookings);
router.get("/:id", auth(), BookingController.getBookingById);
// booking.router.ts
router.patch(
  "/:id/complete",
  auth(),
  BookingController.completeBooking
);
router.patch("/:id/cancel", auth(), BookingController.cancelBooking);

export const bookingRouter = router;
