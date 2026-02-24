
// import { prisma } from "../lib/prisma";
// import { UserRole } from "../middlewares/auth";
// async function seedAdmin() {
//   try {
//     console.log("🚀 Admin seeding started...");

//     const adminData = {
//       name: "Muna",
//       email: "muna@gmail.com",
//       password: "muna1234",
//       role: UserRole.ADMIN,
//     };

//     // 🔎 Check if already exists
//     const existingUser = await prisma.user.findUnique({
//       where: { email: adminData.email },
//     });

//     if (existingUser) {
//       console.log("⚠️ Admin already exists");
//       return;
//     }

//     // ✅ Call Better Auth sign-up endpoint
//     const response = await fetch(
//       "http://localhost:5000/api/auth/sign-up/email",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(adminData),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Signup failed: ${errorText}`);
//     }

//     // ✅ Verify email manually
//     await prisma.user.update({
//       where: { email: adminData.email },
//       data: {
//         emailVerified: true,
//         role: UserRole.ADMIN, // 🔥 Ensure role is ADMIN
//       },
//     });

//     console.log("✅ Admin created & verified successfully!");
//   } catch (error) {
//     console.error("❌ Seeding failed:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// seedAdmin();













import "dotenv/config";
import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

async function seedAdmin() {
  try {
    console.log("🚀 Admin seeding started...");

    const email = "muna@gmail.com";

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("⚠️ Admin already exists");
      return;
    }

    const response = await fetch(
      `${process.env.BETTER_AUTH_URL}/api/auth/sign-up/email`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Muna",
          email,
          password: "muna1234",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    await prisma.user.update({
      where: { email },
      data: {
        emailVerified: true,
        role: UserRole.ADMIN,
      },
    });

    console.log("✅ Admin created successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();