import express from "express";
import {
  createTeam,
  getAllTeams,
  getTeam,
  updateTeam,
  deleteTeam,
} from "../controllers/teamsController.js";

const teamsRouter = express.Router();

teamsRouter.post("/add", createTeam);
teamsRouter.get("/", getAllTeams);
teamsRouter.get("/:id", getTeam);
teamsRouter.put("/:id", updateTeam);
teamsRouter.delete("/:id", deleteTeam);

export default teamsRouter;
