migration: npx prisma migrate dev
generate: npx prisma generate

>> main server:  npx tsx src/server.ts

>> seedAdmin Running: npx tsx src/scripts/seedAdmin.ts 



prompt: 

test it in postman + then done another+give step by step as beginer friendly + if anything need clarify me i will share you



 

>>  if any need clarify me i 

will share you:

>> why this error + how to solve + explain bangla
>> Admin data:

 email: "muna@gmail.com",
      password: "muna1234",



>> Tutor Step:

1️⃣ Tutor Register
2️⃣ Tutor Login
3️⃣ Tutor Profile Create / Update
4️⃣ Tutor Availability Set
5️⃣ Browse Tutors (Public)
6️⃣ Tutor Details + Availability
7️⃣ Tutor Dashboard (Bookings / Sessions)
8️⃣ Ratings & Reviews দেখা







>>   // Check if user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User not found",
            });
        }









>>  ```
1. Student books    → status: CONFIRMED
                    → BookingCard: কোনো review button নেই

2. Tutor completes  → status: COMPLETED  
                    → BookingCard: "Give Review" button দেখায়

3. Student reviews  → review create হয়
                    → BookingCard: stars + "Edit Review" দেখায়

4. Student edits    → review update হয়
                    → tutor rating recalculate হয়        