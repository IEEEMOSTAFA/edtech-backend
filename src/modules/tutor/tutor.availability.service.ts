import { prisma } from "../../lib/prisma";

//  Tutor availability update
const updateAvailability = async (
  tutorId: string,
  slots: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable?: boolean;
  }[]
) => {
  // 1️⃣ আগের availability মুছে ফেলি
  await prisma.availability.deleteMany({
    where: { tutorId },
  });

  //  availability add: 
  return prisma.availability.createMany({
    data: slots.map((slot) => ({
      tutorId,
      dayOfWeek: slot.dayOfWeek,
      startTime: slot.startTime,
      endTime: slot.endTime,
      isAvailable: slot.isAvailable ?? true,
    })),
  });
};

//  Public: Tutor availability
const getTutorAvailability = async (tutorId: string) => {
  return prisma.availability.findMany({
    where: {
      tutorId,
      isAvailable: true,
    },
    orderBy: {
      dayOfWeek: "asc",
    },
  });
};

export const availabilityService = {
  updateAvailability,
  getTutorAvailability,
};




















