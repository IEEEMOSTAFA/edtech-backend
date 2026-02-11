import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import errorHandler from "./middlewares/globalErrorHandler";

import authExtraRoutes from "./routes/auth.extra";

import { categoryRouter } from "./modules/category/category.router";
import { tutorRouter } from "./modules/tutor/tutor.router";
import { bookingRouter } from "./modules/booking/booking.router";
import { reviewRouter } from "./modules/review/review.router";
import { adminRouter } from "./modules/admin/admin.router";
import { studentRouter } from "./modules/student/student.router";
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



// ================= FEATURE ROUTES =================
app.use("/api/admin", adminRouter);
// app.use("/api/bookings", bookingRouter);
app.use("/api/tutors", tutorRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/reviews", reviewRouter);
// app.use("/api/admin", adminRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/dashboard", studentRouter);



// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("SkillBridge API is running 🚀");
});

// ================= ERROR HANDLER =================
app.use(errorHandler);

export default app;


























