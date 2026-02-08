import { Request, Response } from "express";
import * as UserService from "./user.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "User creation failed",
    });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  res.status(200).json({
    success: true,
    data: users,
  });
};
