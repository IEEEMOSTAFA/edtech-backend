import { Request, Response, NextFunction } from "express";
import { reviewService } from "./review.service";

const createReview = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = req.user;
        const { bookingId, rating, comment } = req.body;

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User not found",
            });
        }

        // ✅ Only STUDENT
        if (user.role !== "STUDENT") {
            return res.status(403).json({
                success: false,
                message: "Only students can create reviews",
            });
        }

        if (!bookingId || !rating) {
            return res.status(400).json({
                success: false,
                message: "bookingId and rating are required",
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5",
            });
        }

        // 🔍 Find booking
        const booking = await reviewService.findBookingForReview(bookingId);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        // 🔐 Ownership check
        if (booking.studentId !== user.id) {
            return res.status(403).json({
                success: false,
                message: "This is not your booking",
            });
        }

        // ⏳ Must be COMPLETED
        if (booking.status !== "COMPLETED") {
            return res.status(400).json({
                success: false,
                message: "Booking is not completed yet",
            });
        }

        // 🚫 One review per booking
        const existingReview =
            await reviewService.checkExistingReview(bookingId);

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "Review already submitted",
            });
        }

        const tutorProfile = booking.tutor.tutorProfile;

        if (!tutorProfile) {
            return res.status(404).json({
                success: false,
                message: "Tutor profile not found",
            });
        }

        // ✍️ Create review
        const result = await reviewService.createReview({
            bookingId,
            tutorId: tutorProfile.id, // ⚠️ TutorProfile.id
            studentId: user.id,
            rating,
            comment,
        });

        // ⭐ Update tutor rating
        await reviewService.updateTutorRating(tutorProfile.id, rating);

        res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const ReviewController = {
    createReview,
};
