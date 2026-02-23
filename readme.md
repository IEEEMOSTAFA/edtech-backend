migration: npx prisma migrate dev
generate: npx prisma generate

>> main server:  npx tsx src/server.ts

>> seedAdmin Running: npx tsx src/scripts/seedAdmin.ts 




 Project Structure: 
edtech-backend/
├── src/
│   ├── app.ts                    # Express app config (middlewares, routes)
│   ├── server.ts                 # Server entry point
│
│   ├── lib/
│   │   ├── prisma.ts             # Prisma client instance
│   │   ├── auth.ts               # Better-auth config
│   │   └── auth-handler.ts       # Auth handlers
│
│   ├── middlewares/
│   │   ├── auth.ts               # Authentication middleware
│   │   ├── globalErrorHandler.ts # Global error handler
│   │   └── notFound.ts           # 404 handler
│
│   ├── modules/
│   │   ├── admin/
│   │   │   ├── admin.controller.ts
│   │   │   ├── admin.service.ts
│   │   │   └── admin.router.ts
│   │   │
│   │   ├── booking/
│   │   ├── category/
│   │   ├── review/
│   │   ├── student/
│   │   └── tutor/
│   │       ├── tutor.controller.ts
│   │       ├── tutor.service.ts
│   │       ├── tutor.availability.service.ts
│   │       └── tutor.router.ts
│
│   ├── routes/
│   │   └── auth.extra.ts         # Extra auth routes
│
│   └── scripts/
│       └── seedAdmin.ts          # Admin seed script
│
├── prisma/
│   └── schema.prisma             # Prisma schema
│
├── .env                          # Environment variables (NOT committed)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md








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