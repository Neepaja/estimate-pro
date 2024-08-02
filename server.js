import express from "express";
import cors from "cors";
import teamsRouter from "./routes/teamsRoute.js";
import tagsRouter from "./routes/tagsRoute.js";
import templateRouter from "./routes/templatesRoute.js";
import userRouter from "./routes/userRoutes.js";
import componentRouter from "./routes/componentsRoute.js";
import moduleRouter from "./routes/modulesRoute.js";
import levelsRouter from "./routes/levelsRoute.js";
import rolesRouter from "./routes/rolesRoute.js";
import projectsRouter from "./routes/projectsRoute.js";
import authRouter from "./routes/authRoute.js";
import config from "./config.js";

const app = express();

app.use(express.json());
app.use(cors());

// API endpoints
app.use("/teams", teamsRouter);
app.use("/tags", tagsRouter);
app.use("/templates", templateRouter);
app.use("/users", userRouter);
app.use("/components", componentRouter);
app.use("/modules", moduleRouter);
app.use("/levels", levelsRouter);
app.use("/roles", rolesRouter);
app.use("/projects", projectsRouter);
app.use("/auth", authRouter);

app.listen(config.port, () => {
  console.log(`Server started on http://localhost:${config.port}`);
});

export default app;
