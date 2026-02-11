// src/modules/booking/booking.service.ts
import { BookingStatus } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";
// import { BookingStatus } from "@prisma/client";

const createBooking = async (
  studentId: string,
  data: {
    tutorId: string;
    sessionDate: string;
    duration: number;
    notes?: string;
  }
) => {
  if (studentId === data.tutorId) {
    throw new Error("You cannot book your own session");
  }

  const tutorProfile = await prisma.tutorProfile.findUnique({
    where: { userId: data.tutorId },
  });

  if (!tutorProfile) {
    throw new Error("Tutor profile not found");
  }

  const sessionDay = new Date(data.sessionDate).getDay();

  const availability = await prisma.availability.findFirst({
    where: {
      tutorId: data.tutorId,
      dayOfWeek: sessionDay,
      isAvailable: true,
    },
  });

  if (!availability) {
    throw new Error("Tutor is not available on this day");
  }

  const hours = data.duration / 60;
  const price = tutorProfile.hourlyRate * hours;

  return prisma.booking.create({
    data: {
      studentId,
      tutorId: data.tutorId,
      sessionDate: new Date(data.sessionDate),
      duration: data.duration,
      price,
      status: BookingStatus.CONFIRMED,
      notes: data.notes ?? null,
    },
  });
};

// ✅ STUDENT / TUTOR bookings
const getMyBookings = async (userId: string, role: string) => {
  if (role === "STUDENT") {
    return prisma.booking.findMany({
      where: { studentId: userId },
      include: { tutor: true },
      orderBy: { createdAt: "desc" },
    });
  }

  if (role === "TUTOR") {
    return prisma.booking.findMany({
      where: { tutorId: userId },
      include: { student: true },
      orderBy: { createdAt: "desc" },
    });
  }

  return [];
};

// ✅ Single booking
const getBookingById = async (id: string) => {
  return prisma.booking.findUnique({
    where: { id },
    include: {
      student: true,
      tutor: true,
    },
  });
};

// booking.service.ts (add this)
const completeBooking = async (bookingId: string, tutorId: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  // 🔐 Tutor ownership check
  if (booking.tutorId !== tutorId) {
    throw new Error("This booking is not yours");
  }

  if (booking.status !== BookingStatus.CONFIRMED) {
    throw new Error("Booking cannot be completed");
  }

  return prisma.booking.update({
    where: { id: bookingId },
    data: { status: BookingStatus.COMPLETED },
  });
};





// 🔥 IMPORTANT EXPORT
export const bookingService = {
  createBooking,
  getMyBookings,
  getBookingById,
  completeBooking
};
