import { prisma } from "../../lib/prisma";

const getAllCategories = async () => {
  return await prisma.category.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const createCategory = async (data: {
  name: string;
  description?: string;
  icon?: string;
}) => {
  return await prisma.category.create({
    data,
  });
};

const updateCategory = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    icon?: string;
    isActive?: boolean;
  }
) => {
  return await prisma.category.update({
    where: { id },
    data,
  });
};

export const categoryService = {
  getAllCategories,
  createCategory,
  updateCategory,
};
