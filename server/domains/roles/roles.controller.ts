import RoleService from "./roles.service";
import { Request, Response } from "express";
import { AddPermissionsToRoleDto, NewRoleWithPermissions } from "./dto";

class UserController {
  private roleService: RoleService;
  constructor() {
    this.roleService = new RoleService();
  }

  addNewRole = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const newRole = await this.roleService.addNewRole(name);
      res.status(200).json(newRole);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  addPermissionsToRole = async (req: Request, res: Response) => {
    try {
      const { role_id, permission_ids }: AddPermissionsToRoleDto = req.body;
      const success = await this.roleService.addPermissionsToRole({
        role_id,
        permission_ids,
      });
      res.status(200).json({ success });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  createNewRoleWithPermissions = async (req: Request, res: Response) => {
    try {
      const { permission_ids, name }:NewRoleWithPermissions = req.body;
      const newRole = await this.roleService.createNewRoleWithPermissions(name,permission_ids);
      res.status(200).json(newRole)
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  getPermissionsListToRole = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const permission = await this.roleService.getPermissionsListToRole(+id);
      res.status(200).json(permission);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
}
export default new UserController();
