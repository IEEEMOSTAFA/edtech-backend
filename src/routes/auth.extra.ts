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




















// import { Router, Request, Response } from "express";
// import auth from "../middlewares/auth";
// import { prisma } from "../lib/prisma";
// import { auth as betterAuth } from "../lib/auth"; // better-auth instance

// const authExtraRoutes = Router();

// // ────────────────────────────────────────────────
// //  1. GET /api/auth/me   →  get current user
// // ────────────────────────────────────────────────
// authExtraRoutes.get("/me", auth(), (req: Request, res: Response) => {
//   console.log("🔥 /api/auth/me ROUTE HIT", req.user);

//   return res.status(200).json({
//     success: true,
//     data: req.user,
//   });
// });

// // ────────────────────────────────────────────────
// //  2. PATCH /api/auth/update-role
// // ────────────────────────────────────────────────
// authExtraRoutes.patch("/update-role", async (req: Request, res: Response) => {
//   try {
//     console.log(" /api/auth/update-role ROUTE HIT");
//     console.log(" Body:", req.body);

//     // Get session via better-auth (works because cookie is sent)
//     const session = await betterAuth.api.getSession({
//       headers: req.headers as any,
//     });

//     if (!session?.user?.id) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized - No active session",
//       });
//     }

//     const { role } = req.body;

//     if (!role || !["STUDENT", "TUTOR"].includes(role)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid role. Must be STUDENT or TUTOR",
//       });
//     }

//     console.log(`Updating user ${session.user.id} → role = ${role}`);

//     const updatedUser = await prisma.user.update({
//       where: { id: session.user.id },
//       data: { role },
//       select: {
//         id: true,
//         email: true,
//         name: true,
//         role: true,
//       },
//     });

//     // If becoming TUTOR → create empty TutorProfile if not exists
//     if (role === "TUTOR") {
//       const existing = await prisma.tutorProfile.findUnique({
//         where: { userId: session.user.id },
//       });

//       if (!existing) {
//         console.log("Creating new TutorProfile...");
//         await prisma.tutorProfile.create({
//           data: {
//             userId: session.user.id,
//             hourlyRate: 0,
//             experience: 0,
//             // add other optional/default fields if needed
//           },
//         });
//         console.log("TutorProfile created");
//       }
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Role updated successfully",
//       data: updatedUser,
//     });
//   } catch (err: any) {
//     console.error("Update role error:", err);
//     return res.status(500).json({
//       success: false,
//       message: err.message || "Internal server error",
//     });
//   }
// });

// // ────────────────────────────────────────────────
// //  3. POST /api/auth/sign-in   →  for Postman / testing
// //     (temporary – remove later if using only SDK)
// // ────────────────────────────────────────────────
// authExtraRoutes.post("/sign-in", async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     console.log(`Login attempt: ${email}`);

//     // ─── Call better-auth sign-in ───────────────────────
//     const signInResult = await betterAuth.api.signInWithEmail({
//       email,
//       password,
//       // You can pass more options if needed, e.g.:
//       // remember: true,
//     });

//     if (!signInResult || !signInResult.session) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // better-auth automatically sets cookie(s) in the response headers
//     // (Set-Cookie header is added by the internal handler)

//     return res.status(200).json({
//       success: true,
//       message: "Logged in successfully",
//       user: {
//         id: signInResult.user.id,
//         email: signInResult.user.email,
//         name: signInResult.user.name,
//         role: signInResult.user.role,
//       },
//       // Optional: you can return session id / expires etc.
//       // session: signInResult.session
//     });
//   } catch (err: any) {
//     console.error("Sign-in error:", err);

//     // better-auth usually throws meaningful errors
//     const message = err.message?.includes("invalid")
//       ? "Invalid credentials"
//       : err.message || "Login failed";

//     return res.status(400).json({
//       success: false,
//       message,
//     });
//   }
// });

// export default authExtraRoutes;







// export default authExtraRoutes;
