import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { getConnection } from "typeorm";
import CustomError from "../errors/errorTypes/CustomError";
import { HttpStatusCode } from "../errors/HttpStatusCodes";

const Route =
  () =>
  (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalRouteHandler = descriptor.value;
    descriptor.value = async function (
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
        const fnReturn = await originalRouteHandler.apply(this, [
          req,
          res,
          next,
        ]);
        res.status(200).json(fnReturn);
      } catch (err) {
        next(err);
      }
    };

    return {
      configurable: true,
      get(this: Function) {
        const bound = descriptor.value!.bind(this);
        Object.defineProperty(this, propertyKey, {
          value: bound,
          configurable: true,
          writable: true,
        });
        return bound;
      },
    };
  };

export default Route;
