import { FindRoleByNameDto } from './dto/index';
import RoleService from "./roles.service";
import { Request, Response } from "express";
import {
  AddPermissionsToRoleDto,
  ChangeAllRolesDto,
  NewRoleWithPermissions,
} from "./dto";

class UserController {
  private roleService: RoleService;
  constructor() {
    this.roleService = new RoleService();
  }

  addNewRole = async (req: Request, res: Response) => {
    const { name } = req.body;
    const newRole = await this.roleService.addNewRole(name);
    res.status(200).json(newRole);
  };
  addPermissionsToRole = async (req: Request, res: Response) => {
    const { role_id, permission_ids }: AddPermissionsToRoleDto = req.body;
    console.log("here");
    const success = await this.roleService.addPermissionsToRole({
      role_id,
      permission_ids,
    });
    res.status(200).json({ success });
  };

  createNewRoleWithPermissions = async (req: Request, res: Response) => {
    const { permission_ids, name }: NewRoleWithPermissions = req.body;
    const newRole = await this.roleService.createNewRoleWithPermissions(
      name,
      permission_ids
    );
    res.status(200).json(newRole);
  };

  changeAllRoles = async (req: Request, res: Response) => {
    const { data }: ChangeAllRolesDto = req.body;
    const success = await this.roleService.changeAllRoles(data);
    res.status(200).json({ success });
  };
  getPermissionsListToRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const permission = await this.roleService.getPermissionsListToRole(+id);
    res.status(200).json(permission);
  };

  getAllRolesWithPermissions = async (req: Request, res: Response) => {
    const roles = await this.roleService.getAllRolesWithPermissions();
    res.status(200).json(roles);
  };

  seedRoles = async (req: Request, res: Response) => {
    const { identifiers } = await RoleService.seedRoles();
    res.json(identifiers.map((idItem) => idItem.id));
  };

  clearAllRoles = async (req: Request, res: Response) => {
    await RoleService.clearAllRoles();
    res.json({ message: "succcess" });
  };
  getRoleByName = async (req: Request, res: Response) => {
    const {name}:FindRoleByNameDto = req.body

    const role = await this.roleService.getRoleByName(name)
  };
}
export default new UserController();
