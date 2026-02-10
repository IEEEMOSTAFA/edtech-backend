import { prisma } from "../../lib/prisma";

const findBookingForReview = async (bookingId: string) => {
  return prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      tutor: {
        include: {
          tutorProfile: true,
        },
      },
    },
  });
};

const checkExistingReview = async (bookingId: string) => {
  return prisma.review.findUnique({
    where: { bookingId },
  });
};

const createReview = async (data: {
  bookingId: string;
  tutorId: string;
  studentId: string;
  rating: number;
  comment?: string;
}) => {
  return prisma.review.create({
    data,
  });
};

const updateTutorRating = async (
  tutorProfileId: string,
  rating: number
) => {
  const tutorProfile = await prisma.tutorProfile.findUnique({
    where: { id: tutorProfileId },
  });

  if (!tutorProfile) return null;

  const totalReviews = tutorProfile.totalReviews + 1;
  const newRating =
    (tutorProfile.rating * tutorProfile.totalReviews + rating) /
    totalReviews;

  return prisma.tutorProfile.update({
    where: { id: tutorProfileId },
    data: {
      rating: newRating,
      totalReviews,
    },
  });
};

export const reviewService = {
  findBookingForReview,
  checkExistingReview,
  createReview,
  updateTutorRating,
};
