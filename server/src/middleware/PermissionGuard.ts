import { HttpStatusCode } from "./../errors/HttpStatusCodes";
import { EPermission } from "./../domains/permisssions/types/index";
import { NextFunction, Request, Response } from "express";
import RoleService from "../domains/roles/roles.service";
import ForbiddenError from "../errors/errorTypes/ForbiddenError";
import asyncHandler from "express-async-handler";
import CustomRequest from "../types/CustomRequest";
import CustomError from "../errors/errorTypes/CustomError";

export default function PermissionGuard(requiredPermission: EPermission) {
  return asyncHandler(async function (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    const { user } = req;

    if (!user) {
      throw new CustomError(HttpStatusCode.FORBIDDEN, "Отказано в доступе!");
    }

    const roleService = new RoleService();
    const permissions = await roleService.getPermissionsListToRole(
      user.role?.id
    );

    if (
      permissions.some(
        (singlePermission) => singlePermission.name === requiredPermission
      )
    ) {
      next();
    } else {
      throw new CustomError(HttpStatusCode.FORBIDDEN, "Отказано в доступе!");
    }
  });
}
