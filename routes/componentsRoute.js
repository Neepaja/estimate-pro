import express from "express";
import {
  createComponent,
  getAllComponents,
  getComponent,
  updateComponent,
  deleteComponent,
} from "../controllers/componentsController.js";

const componentRouter = express.Router();

componentRouter.post("/add", createComponent);
componentRouter.get("/", getAllComponents);
componentRouter.get("/:id", getComponent);
componentRouter.get("/:id", getComponent);
componentRouter.put("/:id", updateComponent);
componentRouter.delete("/:id", deleteComponent);

export default componentRouter;
