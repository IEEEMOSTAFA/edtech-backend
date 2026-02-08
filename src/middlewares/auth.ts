import { Request, Response, NextFunction } from "express";
import { auth as betterAuth } from "../lib/auth";

// ================= ROLE ENUM =================
export enum UserRole {
  STUDENT = "STUDENT",
  TUTOR = "TUTOR",
  ADMIN = "ADMIN",
}

// ================= REQUEST TYPE EXTEND =================
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        emailVerified: boolean;
      };
    }
  }
}

// ================= AUTH MIDDLEWARE =================
const auth =
  (...roles: UserRole[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await betterAuth.api.getSession({
        headers: req.headers as any,
      });

      if (!session) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Please verify your email",
        });
      }

      if (session.user.isBanned) {
        return res.status(403).json({
          success: false,
          message: "Your account has been banned",
        });
      }

      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role as UserRole,
        emailVerified: session.user.emailVerified,
      };

      if (roles.length && !roles.includes(req.user.role as UserRole)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden access",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;











