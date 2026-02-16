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












// New correction::



const app: Application = express();

// ================= CORS =================
app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
  })
);

// ================= AUTH ROUTES FIRST =================
// ⚠️ Important: better-auth এর আগে express.json() ব্যবহার করবো না
app.use("/api/auth", authExtraRoutes);
app.all("/api/auth/*splat", toNodeHandler(auth));

// ================= BODY PARSER AFTER AUTH =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= FEATURE ROUTES =================
app.use("/api/admin", adminRouter);
app.use("/api/tutors", tutorRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/dashboard", studentRouter);

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("SkillBridge API is running 🚀");
});

// ================= ERROR HANDLER =================
app.use(errorHandler);

export default app;
























