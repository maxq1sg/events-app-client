import { NextFunction, Request, Response } from "express";
import BaseError from "./errorTypes/BaseError";
import { HttpStatusCode } from "./httpStatusCodes";

export default function errorHandler(
  error: BaseError,
  req: Request,
  res: Response,
  next:NextFunction
) {
  console.log("inside hear");
  const statusCode = error.httpCode || HttpStatusCode.INTERNAL_SERVER;
  console.log("Path: ", req.path);
//   console.log("Error: ", error.message);
  console.log("code: ", statusCode);
  res.status(statusCode).json({ message: error.message });
}
