// src/modules/booking/booking.controller.ts
import { Request, Response, NextFunction } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = req.user?.id;
    const role = req.user?.role;

    if (!studentId || role !== "STUDENT") {
      return res.status(403).json({ message: "Only students can book" });
    }

    const result = await bookingService.createBooking(studentId, req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getMyBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;

    if (!userId || !role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await bookingService.getMyBookings(userId, role);

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getBookingById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookingService.getBookingById(req.params.id as string);

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const completeBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tutorId = req.user?.id;
    const role = req.user?.role;
    const bookingId = req.params.id;

    if (!tutorId || role !== "TUTOR") {
      return res.status(403).json({
        success: false,
        message: "Only tutors can complete bookings",
      });
    }

    const result = await bookingService.completeBooking(bookingId as string, tutorId);

    res.json({
      success: true,
      message: "Booking marked as completed",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};






export const BookingController = {
  createBooking,
  getMyBookings,
  getBookingById,
  completeBooking 
};
