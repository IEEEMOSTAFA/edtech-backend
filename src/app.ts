import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import errorHandler from "./middlewares/globalErrorHandler";
import router from "./routes/auth.extra";
import authExtraRoutes from "./routes/auth.extra";
// import { bookingRouter } from "./modules/booking/booking.router";
// import { tutorRouter } from "./modules/tutor/tutor.router";
import { adminRouter } from "./modules/admin/admin.router";
import { categoryRouter } from "./modules/category/category.router";
import { tutorRouter } from "./modules/tutor/tutor.router";
import { bookingRouter } from "./modules/booking/booking.router";
// import { categoryRouter } from "./modules/category/category.router";



const app: Application = express();

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
  })
);

app.use(express.json());

// ================= AUTH ROUTES =================
app.use("/api/auth", authExtraRoutes);
app.all("/api/auth/*splat", toNodeHandler(auth));
// Change Form:
// app.all("/api/auth/:path(*)", toNodeHandler(auth));
// // ✅ Custom route FIRST (exact path)
// app.get("/api/auth", authExtraRoutes);

// // ✅ BetterAuth handles EVERYTHING else
// app.use("/api/auth", toNodeHandler(auth));

// // ✅ Mount custom auth routes
// app.use("/api/auth", authExtraRoutes);

// // ✅ BetterAuth handles built-in auth routes
// app.use("/api/auth", toNodeHandler(auth));

// ✅ Custom auth routes (Express controlled)
// app.use("/api/auth", authExtraRoutes);

// // ✅ BetterAuth ONLY as catch-all
// app.all("/api/auth/*", toNodeHandler(auth));


// ================= AUTH ROUTES =================

// // 🔥 Isolated custom route
// app.get("/api/auth/me", authExtraRoutes);

// // 🔥 BetterAuth only for its own endpoints
// app.all("/api/auth/*", toNodeHandler(auth));


// ✅ Custom auth routes
// app.use("/api/auth", authExtraRoutes);

// // ✅ BetterAuth ONLY as catch-all
// app.all("/api/auth/*", toNodeHandler(auth));





// app.use("/api/bookings", bookingRouter);
app.use("/api/tutors", tutorRouter);
app.use("/api/bookings", bookingRouter);
// app.use("/api/admin", adminRouter);
app.use("/api/categories", categoryRouter);










// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("SkillBridge API is running 🚀");
});

// ================= ERROR HANDLER =================
app.use(errorHandler);

export default app;


























