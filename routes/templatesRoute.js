import express from "express";
import {
  createTemplate,
  getAllTemplates,
  getTemplate,
  updateTemplate,
  deleteTemplate,
  getTemplateWithUser,
} from "../controllers/templatesController.js";

const templateRouter = express.Router();

templateRouter.post("/add", createTemplate);
templateRouter.get("/with-user/:id", getTemplateWithUser);
templateRouter.get("/", getAllTemplates);
templateRouter.get("/:id", getTemplate);
templateRouter.put("/:id", updateTemplate);
templateRouter.delete("/:id", deleteTemplate);

export default templateRouter;
