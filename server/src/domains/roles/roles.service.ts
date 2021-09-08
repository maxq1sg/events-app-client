import Permission from "../permisssions/permissions.model";
import Role from "./roles.model";
import { AddPermissionsToRoleDto, ERole } from "./dto";
import PermissionService from "../permisssions/permissions.service";

class RoleService {
  private permissionService: PermissionService;

  constructor() {
    this.permissionService = new PermissionService();
  }
  addNewRole(name: ERole) {
    const newRole = Role.create({ name });
    return newRole.save();
  }

  async createNewRoleWithPermissions(name: ERole, permIds: number[]) {
    const role = await this.addNewRole(name);
    const permissionsInDb = await this.permissionService.getPermissionsByIds(
      permIds
    );

    role.permissions = permissionsInDb;
    return role.save();
  }

  async addPermissionsToRole(body: AddPermissionsToRoleDto) {
    const role = await Role.findOne(body.role_id);
    const permissions = await Permission.findByIds(body.permission_ids);
    console.log(permissions);
    role.permissions = permissions;
    await role.save();
    return true;
  }
  async getPermissionsListToRole(id: number): Promise<Permission[]> {
    const role = await Role.findOne(id, {
      relations: ["permissions"],
    });
    return role.permissions;
  }
}
export default RoleService;
