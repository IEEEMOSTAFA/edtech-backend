import { prisma } from "../../lib/prisma";

const getAllTutors = async () => {
  return prisma.tutorProfile.findMany({
    include: {
      user: true,
      categories: true,
    },
  });
};


// const getTutorById = async (userId: string) => {
//   return prisma.tutorProfile.findUnique({
//     where: { userId },
//     include: {
//       user: true,
//       categories: true,
//       reviews: true,
//     },
//   });
// };



const getTutorById = async (userId: string) => {
  return prisma.tutorProfile.findUnique({
    where: { userId },
    include: {
      user: true,
      categories: true,
      reviews: {
      
        include: {
          student: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
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
    image?: string | null;
  }
) => {
  const baseData = {
    bio: data.bio ?? null,
    hourlyRate: data.hourlyRate,
    experience: data.experience,
  };



  if (data.image !== undefined) {
    await prisma.user.update({
      where: { id: userId },
      data: { image: data.image },
    });
  }

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




const getTutorDashboard = async (tutorId: string) => {
  return prisma.user.findUnique({
    where: { id: tutorId },
    include: {
      bookingsAsTutor: {
        include: {
          student: true,
          review: true,
        },
        orderBy: {
          sessionDate: "desc",
        },
      },
      tutorProfile: {
        include: {
          reviews: {
            include: {
              student: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
    },
  });
};

export const tutorService = {
  getAllTutors,
  getTutorById,
  upsertTutorProfile,
  getTutorDashboard
};
























