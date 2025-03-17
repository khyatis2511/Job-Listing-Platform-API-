import { Request, Response } from "express";
import checkRole from "../../middleware/check-role.middleware";
import job from "./job.service";

const jobController = {
  getJob: [
    checkRole(["Company", "JobSeeker"]),
    (req: Request, res: Response) => {
      job.getJob(req).then((result) => {
        res.status(result.statusCode).send(result).end();
      });
    },
  ],
  createJob: [
    checkRole(["Company"]),
    (req: Request, res: Response) => {
      job.createJob(req).then((result) => {
        res.status(result.statusCode).send(result).end();
      });
    },
  ],
  updateJob: [
    checkRole(["Company"]),
    (req: Request, res: Response) => {
      job.updateJob(req).then((result) => {
        res.status(result.statusCode).send(result).end();
      });
    },
  ],
  removeJob: [
    checkRole(["Company"]),
    (req: Request, res: Response) => {
      job.removeJob(req).then((result) => {
        res.status(result.statusCode).send(result).end();
      });
    },
  ],
  applyForJob: [
    checkRole(["JobSeeker"]),
    (req: Request, res: Response) => {
      job.applyForJob(req).then((result) => {
        res.status(result.statusCode).send(result).end();
      });
    },
  ],
};

export default jobController;
