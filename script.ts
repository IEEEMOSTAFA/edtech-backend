// import { prisma } from './lib/prisma'

// async function main() {
//   // Create a new user with a post
//   const user = await prisma.user.create({
//     data: {
//       name: 'Fahim',
//       email: 'fahim@prisma.io',
//       posts: {
//         create: {
//           title: 'Hello World',
//           content: 'This is my first post!',
//           published: true,
//         },
//       },
//     },
//     include: {
//       posts: true,
//     },
//   })
//   console.log('Created user:', user)

//   // Fetch all users with their posts
//   const allUsers = await prisma.user.findMany({
//     include: {
//       posts: true,
//     },
//   })
//   console.log('All users:', JSON.stringify(allUsers, null, 2))
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

// New Schema::


import { prisma } from "./lib/prisma";

async function main() {

  // ======================
  // 1️⃣ Create STUDENT
  // ======================
  const student = await prisma.user.create({
    data: {
      name: "Rahim Student",
      email: "rahim@student.com",
      password: "hashed_password",
      role: "STUDENT",
    },
  });

  console.log("✅ STUDENT created:", student);


  // ======================
  // 2️⃣ Create TUTOR (User + TutorProfile)
  // ======================
  const tutor = await prisma.user.create({
    data: {
      name: "Karim Tutor",
      email: "karim@tutor.com",
      password: "hashed_password",
      role: "TUTOR",
      tutorProfile: {
        create: {
          bio: "Math & Physics Tutor",
          hourlyRate: 500,
          experience: 5,
        },
      },
    },
    include: {
      tutorProfile: true,
    },
  });

  console.log("✅ TUTOR created:", tutor);


  // ======================
  // 3️⃣ Create ADMIN
  // ======================
  const admin = await prisma.user.create({
    data: {
      name: "Admin Boss",
      email: "admin@system.com",
      password: "hashed_password",
      role: "ADMIN",
    },
  });

  console.log("✅ ADMIN created:", admin);


  // ======================
  // 4️⃣ Create Booking (Student → Tutor)
  // ======================
  const booking = await prisma.booking.create({
    data: {
      studentId: student.id,
      tutorId: tutor.id,
      sessionDate: new Date(),
      duration: 60,
      notes: "First demo class",
    },
  });

  console.log("✅ BOOKING created:", booking);


  // ======================
  // 5️⃣ Fetch all users
  // ======================
  const users = await prisma.user.findMany({
    include: {
      tutorProfile: true,
      bookingsAsStudent: true,
      bookingsAsTutor: true,
    },
  });

  console.log(
    "📦 ALL USERS:",
    JSON.stringify(users, null, 2)
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("❌ Error:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
