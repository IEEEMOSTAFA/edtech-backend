import { prisma } from "./lib/prisma";

async function main() {

  // ======================
  // CREATE
  // ======================
  console.log("\n🔹 CREATE USER (STUDENT)");

  const student = await prisma.user.create({
    data: {
      name: "Test Student",
      email: "student@test.com",
      password: "123456",
      role: "STUDENT",
    },
  });

  console.log("✅ Created Student:", student);


  console.log("\n🔹 CREATE USER (TUTOR)");

  const tutor = await prisma.user.create({
    data: {
      name: "Test Tutor",
      email: "tutor@test.com",
      password: "123456",
      role: "TUTOR",
      tutorProfile: {
        create: {
          bio: "Physics Tutor",
          hourlyRate: 800,
          experience: 4,
        },
      },
    },
    include: {
      tutorProfile: true,
    },
  });

  console.log("✅ Created Tutor:", tutor);


  // ======================
  // READ
  // ======================
  console.log("\n🔹 READ ALL USERS");

  const users = await prisma.user.findMany({
    include: {
      tutorProfile: true,
    },
  });

  console.log("📦 Users:", JSON.stringify(users, null, 2));


  // ======================
  // UPDATE
  // ======================
  console.log("\n🔹 UPDATE STUDENT NAME");

  const updatedStudent = await prisma.user.update({
    where: { id: student.id },
    data: {
      name: "Updated Student Name",
    },
  });

  console.log("✏️ Updated Student:", updatedStudent);


  // ======================
  // CREATE BOOKING
  // ======================
  console.log("\n🔹 CREATE BOOKING");

  const booking = await prisma.booking.create({
    data: {
      studentId: student.id,
      tutorId: tutor.id,
      sessionDate: new Date(),
      duration: 90,
      notes: "CRUD test booking",
    },
  });

  console.log("📘 Booking Created:", booking);


  // ======================
  // DELETE
  // ======================
  console.log("\n🔹 DELETE BOOKING");

  const deletedBooking = await prisma.booking.delete({
    where: { id: booking.id },
  });

  console.log("🗑️ Booking Deleted:", deletedBooking);

}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("\n✅ CRUD TEST FINISHED");
  })
  .catch(async (error) => {
    console.error("❌ Error:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
