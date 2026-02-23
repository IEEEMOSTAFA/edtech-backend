

import { prisma } from "../../lib/prisma";

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

//  Student Booking History
const getMyBookings = async (userId: string) => {
  return await prisma.booking.findMany({
    where: { studentId: userId },
    include: {
      tutor: {
        select: { 
          id: true,
          name: true,
          email: true 
        },
      },
      review:true
    },
    orderBy: { createdAt: "desc" },
  });
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



export const studentService = {
  getStudentDashboard,
  getMyBookings,
  getMyProfile,
  updateMyProfile
};
