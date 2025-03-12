
import { Request, Response } from "express";
import auth from "./auth.service"

const authController = {
    register: [
      // add schema here,
        (req: Request, res: Response) => {
          auth.register(req).then((result) => {
            res.status(result.statusCode).send(result).end();
          });
        },
      ],
}

export default authController;