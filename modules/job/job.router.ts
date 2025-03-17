import { Router } from "express";
import jobController from "./job.controller";

const applyJobRoutes = (app: Router) => {
  app.get("/", jobController.getJob);
  app.post("/", jobController.createJob);
  app.put("/:jobId", jobController.updateJob);
  app.delete("/:jobId", jobController.removeJob);
  app.post("/apply", jobController.applyForJob);
  return app;
};

export default applyJobRoutes;
