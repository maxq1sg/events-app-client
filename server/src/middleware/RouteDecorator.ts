import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import CustomError from "../errors/errorTypes/CustomError";
import { HttpStatusCode } from "../errors/HttpStatusCodes";

const RouteDecorator = (fn: Function) => {
  return async function asyncUtilWrap(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new CustomError(
          HttpStatusCode.BAD_REQUEST,
          "ошибка при валидации",
          errors.array()
        );
      }
      const fnReturn = await fn(req, res, next);
      res.status(200).json(fnReturn);
    } catch (err) {
      next(err);
    }
  };
};

export default RouteDecorator;
