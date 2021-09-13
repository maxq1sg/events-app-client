import { FindRoleByNameDto } from "./dto/index";
import RoleService from "./roles.service";
import {
  AddPermissionsToRoleDto,
  ChangeAllRolesDto,
  NewRoleWithPermissions,
} from "./dto";
import Route from "../../middleware/RouteDecorator";
import { RequestPayload } from "../../middleware/types/MetaType";
import { Service } from "typedi";
import { Router } from "express";
import initRoleRouter from "./roles.router";

@Service()
class RoleController {
  public router = Router();
  constructor(private readonly roleService: RoleService) {
    this.router = Router();
    initRoleRouter.call(this, this.router);
  }

  @Route(["body"])
  async addNewRole(payload: RequestPayload) {
    const { name } = payload.body;
    const newRole = await this.roleService.addNewRole(name);
    return newRole;
  }
  
  @Route(["body"])
  async addPermissionsToRole(payload: RequestPayload) {
    const { role_id, permission_ids }: AddPermissionsToRoleDto = payload.body;

    const success = await this.roleService.addPermissionsToRole({
      role_id,
      permission_ids,
    });
    return { success };
  }

  @Route(["body"])
  async createNewRoleWithPermissions(payload: RequestPayload) {
    const { permission_ids, name }: NewRoleWithPermissions = payload.body;
    const newRole = await this.roleService.createNewRoleWithPermissions(
      name,
      permission_ids
    );
    return newRole;
  }

  @Route(["body"])
  async changeAllRoles(payload: RequestPayload) {
    const { data }: ChangeAllRolesDto = payload.body;
    const success = await this.roleService.changeAllRoles(data);
    return { success };
  }
  @Route(["params"])
  async getPermissionsListToRole(payload: RequestPayload) {
    const { id } = payload.params;
    const permission = await this.roleService.getPermissionsListToRole(+id);
    return permission;
  }

  @Route([])
  async getAllRolesWithPermissions() {
    const roles = await this.roleService.getAllRolesWithPermissions();
    return roles;
  }

  @Route([])
  async seedRoles() {
    const { identifiers } = await RoleService.seedRoles();
    return identifiers.map((idItem) => idItem.id);
  }

  @Route([])
  async clearAllRoles() {
    await RoleService.clearAllRoles();
    return { message: "succcess" };
  }
  @Route(["body"])
  async getRoleByName(payload: RequestPayload) {
    const { name }: FindRoleByNameDto = payload.body;
    const role = await this.roleService.getRoleByName(name);
    return role;
  }
}
export default RoleController;
