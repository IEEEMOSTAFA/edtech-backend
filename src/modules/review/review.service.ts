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


const updateReview = async (
  reviewId: string,
  studentId: string,
  data: { rating?: number; comment?: string }
) => {
  // প্রথমে review খুঁজি এবং ownership check করি
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });


  if (!review || review.studentId !== studentId) return null;

 
  const updated = await prisma.review.update({
    where: { id: reviewId },
    data,
  });

 
  const allReviews = await prisma.review.findMany({
    where: { tutorId: review.tutorId },
  });

  const avgRating =
    allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

  // tutor profile এ নতুন rating save করি
  await prisma.tutorProfile.update({
    where: { id: review.tutorId },
    data: {
      rating: avgRating,
      totalReviews: allReviews.length,
    },
  });

  return updated;
};

const getReviewById = async (reviewId: string, studentId: string) => {
  return prisma.review.findFirst({
    where: {
      id: reviewId,
      studentId,  // ownership check
    },
  });
};



export const reviewService = {
  findBookingForReview,
  checkExistingReview,
  createReview,
  updateTutorRating,
  updateReview,
  getReviewById
};
