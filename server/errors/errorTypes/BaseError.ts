import { HttpStatusCode } from "../httpStatusCodes";

export default abstract class BaseError extends Error {
  abstract readonly message: string;
  abstract readonly httpCode: HttpStatusCode;
  abstract readonly isOperational: boolean;
}
