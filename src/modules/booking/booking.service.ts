
import { BookingStatus } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";


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

  
  const jsDay = new Date(data.sessionDate).getDay(); // 0=Sunday
  const sessionDay = jsDay === 0 ? 6 : jsDay - 1;    // 0=Monday
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

//  STUDENT / TUTOR bookings
const getMyBookings = async (userId: string, role: string) => {
  if (role === "STUDENT") {
    return prisma.booking.findMany({
      where: { studentId: userId },
      include: { tutor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        review: true,
       },
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

// Single booking
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




//  Student Dashboard Overview
const getStudentDashboard = async (userId: string) => {
  const totalBookings = await prisma.booking.count({
    where: { studentId: userId },
  });

  const completedBookings = await prisma.booking.count({
    where: {
      studentId: userId,
      status: "COMPLETED",
    },
  });

  return {
    totalBookings,
    completedBookings,
  };
};



//  Student Profile
const getMyProfile = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

//  Update Student Profile
const updateMyProfile = async (
  userId: string,
  data: { name?: string; image?: string }
) => {
  return await prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      updatedAt: true,
    },
  });
};

const cancelBooking = async (bookingId: string, studentId: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  // 🔐 Student ownership check
  if (booking.studentId !== studentId) {
    throw new Error("This booking is not yours");
  }

  if (booking.status === BookingStatus.CANCELLED) {
    throw new Error("Booking is already cancelled");
  }

  if (booking.status === BookingStatus.COMPLETED) {
    throw new Error("Completed booking cannot be cancelled");
  }

  return prisma.booking.update({
    where: { id: bookingId },
    data: { status: BookingStatus.CANCELLED },
  });
};







//  EXPORT
export const bookingService = {
  createBooking,
  getMyBookings,
  getBookingById,
  completeBooking,
  cancelBooking
};
