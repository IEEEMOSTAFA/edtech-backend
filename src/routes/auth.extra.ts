// Testedd:



import { Router, Request, Response } from "express";
import auth from "../middlewares/auth";
import { prisma } from "../lib/prisma";
import { auth as betterAuth } from "../lib/auth"; //  Import better-auth
// import { prisma } from "../lib/prisma"; //  Import prisma

const authExtraRoutes = Router();

// ================= EXISTING ROUTE (Keep as is) =================
authExtraRoutes.get("/me", auth(), (req, res) => {
  console.log(" /api/auth/me ROUTE HIT", req.user);

  res.status(200).json({
    success: true,
    data: req.user,
  });
});

// =================  NEW ROUTE - UPDATE ROLE =================
authExtraRoutes.patch("/update-role", async (req: Request, res: Response) => {
  try {
    console.log(" /api/auth/update-role ROUTE HIT");
    console.log(" Request body:", req.body);
    console.log(" Request headers:", req.headers.cookie);

    // Get session from better-auth
    const session = await betterAuth.api.getSession({
      headers: req.headers as any,
    });

    console.log("👤 Session:", session);

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No active session",
      });
    }

    const { role } = req.body;

    // Validate role
    if (!role || !["STUDENT", "TUTOR"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be STUDENT or TUTOR",
      });
    }

    console.log(` Updating user ${session.user.id} role to ${role}`);

    // Update user role in database
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    console.log("✅ User updated:", updatedUser);

    // If TUTOR, create empty TutorProfile
    if (role === "TUTOR") {
      const existingProfile = await prisma.tutorProfile.findUnique({
        where: { userId: session.user.id },
      });

      if (!existingProfile) {
        console.log("🆕 Creating TutorProfile for user:", session.user.id);
        
        await prisma.tutorProfile.create({
          data: {
            userId: session.user.id,
            hourlyRate: 0, // Will be set later in profile setup
            experience: 0, // Will be set later
          },
        });

        console.log("✅ TutorProfile created");
      } else {
        console.log("ℹ️ TutorProfile already exists");
      }
    }

    return res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    console.error("❌ Update role error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

export default authExtraRoutes;





















// import { Router } from "express";
// import auth from "../middlewares/auth";

// const authExtraRoutes = Router();




// authExtraRoutes.get("/me", auth(), (req, res) => {
//   // req.user middleware থেকে আসবে
//   console.log("🔥 /api/auth/me ROUTE HIT", req.user);

//   res.status(200).json({
//     success: true,
//     data: req.user, // এখানে ইউজারের তথ্য
//   });
// });









// export default authExtraRoutes;
