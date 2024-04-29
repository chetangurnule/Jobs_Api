import express from "express";
const app = express();

// adding middlewares
app.use(express.json({ limit: "16kb" })); // it parses the data coming fron the client and make it available in req.body
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // it parses the url-encoded data coming fron the client and make it available in req.body
app.use(express.static("public")); // it serves the static files from the public folder

app.get("/", function (req, res) {
  res.send("Welcome to the Jobify server");
});
// routes import

import jobsRouter from "./routes/jobs.routes.js";
import usersRouter from "./routes/users.routes.js";
import { auth } from "./middlewares/authentication.middleware.js";

app.use("/api/v1/auth", usersRouter);
app.use("/api/v1/jobs", auth, jobsRouter);

export { app };
