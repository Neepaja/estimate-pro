import express from "express";
import { resetPassword } from "../controllers/resetPasswordController.js";

const resetPasswordRouter = express.Router();

resetPasswordRouter.post("/", resetPassword);

export default resetPasswordRouter;
