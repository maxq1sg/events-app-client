import { FindRoleByNameDto } from "./dto/index";
import RoleService from "./roles.service";
import { Request, Response } from "express";
import {
  AddPermissionsToRoleDto,
  ChangeAllRolesDto,
  NewRoleWithPermissions,
} from "./dto";
import Route from "../../middleware/RouteDecorator";

class UserController {
  private roleService: RoleService;
  constructor() {
    this.roleService = new RoleService();
  }

  @Route()
  async addNewRole(req: Request, res: Response) {
    const { name } = req.body;
    const newRole = await this.roleService.addNewRole(name);
    return newRole;
  }
  @Route()
  async addPermissionsToRole(req: Request, res: Response) {
    const { role_id, permission_ids }: AddPermissionsToRoleDto = req.body;

    const success = await this.roleService.addPermissionsToRole({
      role_id,
      permission_ids,
    });
    return { success };
  }

  @Route()
  async createNewRoleWithPermissions(req: Request, res: Response) {
    const { permission_ids, name }: NewRoleWithPermissions = req.body;
    const newRole = await this.roleService.createNewRoleWithPermissions(
      name,
      permission_ids
    );
    return newRole;
  }

  @Route()
  async changeAllRoles(req: Request, res: Response) {
    const { data }: ChangeAllRolesDto = req.body;
    const success = await this.roleService.changeAllRoles(data);
    return { success };
  }
  @Route()
  async getPermissionsListToRole(req: Request, res: Response) {
    const { id } = req.params;
    const permission = await this.roleService.getPermissionsListToRole(+id);
    return permission;
  }

  @Route()
  async getAllRolesWithPermissions(req: Request, res: Response) {
    const roles = await this.roleService.getAllRolesWithPermissions();
    return roles;
  }

  @Route()
  async seedRoles(req: Request, res: Response) {
    const { identifiers } = await RoleService.seedRoles();
    return identifiers.map((idItem) => idItem.id);
  }

  @Route()
  async clearAllRoles(req: Request, res: Response) {
    await RoleService.clearAllRoles();
    return { message: "succcess" };
  }
  @Route()
  async getRoleByName(req: Request, res: Response) {
    const { name }: FindRoleByNameDto = req.body;

    const role = await this.roleService.getRoleByName(name);
  }
}
export default new UserController();
