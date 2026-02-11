import { prisma } from "../../lib/prisma";

// 👤 Get all users
const getAllUsers = async () => {
  return await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      isBanned: true,
      createdAt: true,
    },
  });
};

// 🔒 Ban / Unban user
const updateUserStatus = async (
  id: string,
  data: { isBanned?: boolean; isActive?: boolean }
) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

// 📅 Get all bookings
const getAllBookings = async () => {
  return await prisma.booking.findMany({
    include: {
      student: {
        select: { id: true, name: true, email: true },
      },
      tutor: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// 📚 Create category (Admin only)
const createCategory = async (data: {
  name: string;
  description?: string;
  icon?: string;
}) => {
  return await prisma.category.create({
    data,
  });
};


// 📊 Admin Dashboard Stats
const getDashboardStats = async () => {
  const totalUsers = await prisma.user.count();

  const totalStudents = await prisma.user.count({
    where: { role: "STUDENT" },
  });

  const totalTutors = await prisma.user.count({
    where: { role: "TUTOR" },
  });

  const totalBookings = await prisma.booking.count();

  const completedRevenue = await prisma.booking.aggregate({
    _sum: {
      price: true,
    },
    where: {
      status: "COMPLETED",
    },
  });

  return {
    totalUsers,
    totalStudents,
    totalTutors,
    totalBookings,
    totalRevenue: completedRevenue._sum.price || 0,
  };
};


export const adminService = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
  createCategory,
  getDashboardStats
};
