import express from "express";
import {
  login,
  verifyEmail,
  resetPassword,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.get("/verify-email", verifyEmail);
authRouter.post("/resetPassword", resetPassword);

export default authRouter;
