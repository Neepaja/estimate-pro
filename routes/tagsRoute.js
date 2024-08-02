import express from "express";
import {
  createTag,
  getAllTags,
  getTag,
  updateTag,
  deleteTag,
  getTagWithUser,
} from "../controllers/tagsController.js";

const tagsRouter = express.Router();

tagsRouter.post("/add", createTag);
tagsRouter.get("/", getAllTags);
tagsRouter.get("/with-user/:id", getTagWithUser);
tagsRouter.get("/:id", getTag);
tagsRouter.put("/:id", updateTag);
tagsRouter.delete("/:id", deleteTag);

export default tagsRouter;
