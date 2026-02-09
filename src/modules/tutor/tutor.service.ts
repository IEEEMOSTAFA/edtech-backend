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
  const baseData = {
    bio: data.bio ?? null,
    hourlyRate: data.hourlyRate,
    experience: data.experience,
  };

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
























