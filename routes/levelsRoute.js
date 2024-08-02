import express from "express";
import {
  createLevel,
  getAllLevels,
  getLevel,
  updateLevel,
  deleteLevel,
} from "../controllers/levelsController.js";

const levelsRouter = express.Router();

levelsRouter.post("/add", createLevel);
levelsRouter.get("/", getAllLevels);
levelsRouter.get("/:id", getLevel);
levelsRouter.put("/:id", updateLevel);
levelsRouter.delete("/:id", deleteLevel);

export default levelsRouter;
