// // import { prisma } from "../../lib/prisma";

// import { prisma } from "../../lib/prisma";

// export const createUser = async (data: {
//   name: string;
//   email: string;
//   password: string;
//   role?: "STUDENT" | "TUTOR" | "ADMIN";
// }) => {
//   return prisma.user.create({
//     data,
//   });
// };

// export const getAllUsers = async () => {
//   return prisma.user.findMany();
// };









import { prisma } from "../../lib/prisma";

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

