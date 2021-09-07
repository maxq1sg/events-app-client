import BaseError from "./BaseError";
import { HttpStatusCode } from "../HttpStatusCodes";

export default class CustomError extends BaseError {
  public readonly message: string;
  public readonly httpCode: HttpStatusCode;
  public readonly isOperational: boolean;
  constructor(httpCode: HttpStatusCode, message: string) {
    super();
    this.message = message;
    this.httpCode = httpCode;
    this.isOperational = true;
  }
}
