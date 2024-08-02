import express from "express";
import {
  createModule,
  getAllModules,
  getModule,
  updateModule,
  deleteModule,
} from "../controllers/modulesController.js";

const moduleRouter = express.Router();

moduleRouter.post("/add", createModule);
moduleRouter.get("/", getAllModules);
moduleRouter.get("/:id", getModule);
moduleRouter.put("/:id", updateModule);

moduleRouter.delete("/:id", deleteModule);

export default moduleRouter;
