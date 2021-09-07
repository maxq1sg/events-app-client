import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

function AuthGuard(req: any, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    const [type, token] = header.split(" ");
    if (type !== "Bearer" || !token) {
      throw new Error("Войдите в систему!");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Войдите в систему!" });
  }
}
export default AuthGuard;
