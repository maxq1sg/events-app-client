import { EPermission } from "./../domains/permisssions/types/index";
import { NextFunction, Request, Response } from "express";
import RoleService from "../domains/roles/roles.service";
import Permission from "../domains/permisssions/permissions.model";

export default function PermissionGuard(requiredPermission: EPermission) {
  return async function (req: any, res: Response, next: NextFunction) {
    try {
      const { user } = req;
      if (!user) {
        throw new Error("Отказано в доступе");
      }
      const roleService = new RoleService();
      const permissions = await roleService.getPermissionsListToRole(
        user.role?.id
      );
      if (permissions.map((item) => item.name).includes(requiredPermission)) {
        next();
      } else {
        throw new Error("Отказано в доступе");
      }
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  };
}
