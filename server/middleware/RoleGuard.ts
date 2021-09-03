import { NextFunction, Request, Response } from "express";
export type RoleType = "ADMIN" | "USER" | "ORGANIZER";

export default function RoleGuard(...roles: RoleType[]) {
  return function (req: any, res: Response, next: NextFunction) {
    const { user } = req;
    if (user && roles?.includes(user.role)) {
      next();
    } else {
      res.status(403).json({ message: "Отказано в доступе" });
    }
  };
}
