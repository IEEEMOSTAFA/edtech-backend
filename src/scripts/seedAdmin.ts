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

//     const existingUser = await prisma.user.findUnique({
//       where: { email: adminData.email },
//     });

//     if (existingUser) {
//       console.log("⚠️ Admin already exists");
//       return;
//     }

//     const res = await fetch(
//       "http://localhost:5000/api/auth/sign-up/email",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(adminData),
//       }
//     );

//     if (!res.ok) {
//       throw new Error("Admin signup failed");
//     }

//     await prisma.user.update({
//       where: { email: adminData.email },
//       data: { emailVerified: true,
//       role: UserRole.ADMIN, //  Ensure role is ADMIN + used as extra:  
//        },
//     });

//     console.log("✅ Admin created & verified");
//   } catch (error) {
//     console.error(error);
//   }
// }

// seedAdmin();
//Upper Previous Code:


// New Code + api call:

// import { prisma } from "../src/lib/prisma";
// import { UserRole } from "../src/middlewares/auth";
import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";
async function seedAdmin() {
  try {
    console.log("🚀 Admin seeding started...");

    const adminData = {
      name: "Muna",
      email: "muna@gmail.com",
      password: "muna1234",
      role: UserRole.ADMIN,
    };

    // 🔎 Check if already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: adminData.email },
    });

    if (existingUser) {
      console.log("⚠️ Admin already exists");
      return;
    }

    // ✅ Call Better Auth sign-up endpoint
    const response = await fetch(
      "http://localhost:5000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Signup failed: ${errorText}`);
    }

    // ✅ Verify email manually
    await prisma.user.update({
      where: { email: adminData.email },
      data: {
        emailVerified: true,
        role: UserRole.ADMIN, // 🔥 Ensure role is ADMIN
      },
    });

    console.log("✅ Admin created & verified successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
