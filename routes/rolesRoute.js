import express from "express";
import {
  createRole,
  getAllRoles,
  getRole,
  updateRole,
  deleteRole,
} from "../controllers/rolesController.js";
import { authenticate } from "../middleware/authenticateUser.js";
import { authorize } from "../middleware/authorizeUser.js";

const levelsRouter = express.Router();

levelsRouter.post("/add", authenticate, createRole); //authorize only for admin?
levelsRouter.get("/", getAllRoles);
levelsRouter.get("/:id", getRole);
levelsRouter.put("/:id", updateRole);
levelsRouter.delete("/:id", deleteRole);

export default levelsRouter;
