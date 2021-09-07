import UnathorizedError from "./../errors/errorTypes/UnauthorizedError";
import { NextFunction, Response, Request } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
//fix
const AuthGuard = asyncHandler(
  (req: any, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header) {
      throw new UnathorizedError();
    }
    const [type, token] = header.split(" ");
    if (type !== "Bearer" || !token) {
      throw new UnathorizedError();
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new UnathorizedError();
    }
    req.user = decoded;
    next();
  }
);
export default AuthGuard;
