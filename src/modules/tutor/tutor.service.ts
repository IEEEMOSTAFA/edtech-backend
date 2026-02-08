import { prisma } from "../../lib/prisma";

const getAllTutors = async () => {
  return prisma.tutorProfile.findMany({
    include: {
      user: true,
      categories: true,
    },
  });
};

const getTutorById = async (id: string) => {
  return prisma.tutorProfile.findUnique({
    where: { id },
    include: {
      user: true,
      categories: true,
      reviews: true,
    },
  });
};

const upsertTutorProfile = async (
  userId: string,
  data: {
    bio?: string;
    hourlyRate: number;
    experience: number;
    categoryIds?: string[];
  }
) => {
  // 🟢 BASE DATA (safe)
  const baseData = {
    hourlyRate: data.hourlyRate,
    experience: data.experience,
    bio: data.bio ?? null,
  };

  // 🟢 WITH CATEGORIES
  if (data.categoryIds && data.categoryIds.length > 0) {
    return prisma.tutorProfile.upsert({
      where: { userId },
      update: {
        ...baseData,
        categories: {
          set: data.categoryIds.map((id) => ({ id })),
        },
      },
      create: {
        userId,
        ...baseData,
        categories: {
          connect: data.categoryIds.map((id) => ({ id })),
        },
      },
    });
  }

  // 🟢 WITHOUT CATEGORIES
  return prisma.tutorProfile.upsert({
    where: { userId },
    update: baseData,
    create: {
      userId,
      ...baseData,
    },
  });
};

export const tutorService = {
  getAllTutors,
  getTutorById,
  upsertTutorProfile,
};
