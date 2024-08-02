import express from "express";
import {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
  getProjectWithTemplate,
  getProjectWithUser,
} from "../controllers/projectsController.js";

const projectsRouter = express.Router();

projectsRouter.post("/add", createProject);
projectsRouter.get("/with-template/:id", getProjectWithTemplate);
projectsRouter.get("/with-user/:id", getProjectWithUser);
projectsRouter.get("/", getAllProjects);
projectsRouter.get("/:id", getProject);
projectsRouter.put("/:id", updateProject);
projectsRouter.delete("/:id", deleteProject);


export default projectsRouter;
