/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import jwtService from "../services/jwt.service";
import { msgs, returnRes } from "../utils/messages";

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).send(returnRes(401, msgs.jwt.authMissing)).end();
    return;
  }

  const token = authHeader?.split(' ')[1];
  if (!token) {
    res.status(401).send(returnRes(401, msgs.jwt.tokenMissing)).end();
    return;
  }

  try {
    const decoded = token && jwtService.verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error: any) {
    if (error.message === 'Token expired') {
      res.status(401).send(returnRes(401, msgs.jwt.tokenExpired)).end();
      return;
    }
    res.status(401).send(returnRes(401, msgs.jwt.invalidToken)).end();
    return;
  }
};

export default checkAuth;
