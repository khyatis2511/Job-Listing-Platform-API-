/* eslint-disable @typescript-eslint/no-explicit-any */
import { Role } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { msgs, returnRes } from '../utils/messages';

const checkRole = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    
    if (!user || !allowedRoles.includes(user.role)) {
      res.status(403).send(returnRes(403, msgs.noAccess)).end();
      return;
    }
    next();
  };
};

export default checkRole;
