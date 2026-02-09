import { Router } from "express";
import auth from "../middlewares/auth";

const authExtraRoutes = Router();

// authExtraRoutes.get("/me", auth(), (req, res) => {
//    console.log("ME HIT ✅", req.user);
//   res.status(200).json({
//     success: true,
//     data: req.user,
//   });
// });



// authExtraRoutes.get("/me",auth(), (req, res) => {
//   console.log("🔥 /api/auth/me ROUTE HIT");
//   res.json({ ok: true });
// });


authExtraRoutes.get("/me", auth(), (req, res) => {
  // req.user middleware থেকে আসবে
  console.log("🔥 /api/auth/me ROUTE HIT", req.user);

  res.status(200).json({
    success: true,
    data: req.user, // এখানে ইউজারের তথ্য
  });
});









export default authExtraRoutes;
