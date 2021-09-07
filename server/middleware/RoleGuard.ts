import ForbiddenError from "../errors/errorTypes/ForbiddenError";
import { NextFunction, Request, Response } from "express";
import { ERole } from "../domains/roles/dto";

export default function RoleGuard(requiredRoles: ERole[]) {
  return async function (req: any, res: Response, next: NextFunction) {
    try {
      const { user } = req;
      if (!user) {
        throw new ForbiddenError();
      }
      if (requiredRoles.includes(user.role.name)) {
        next();
      } else {
        throw new ForbiddenError();
      }
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };
}
