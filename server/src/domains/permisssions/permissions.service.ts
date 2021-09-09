import { EPermission } from "./types/index";
import { getConnection } from "typeorm";
import Permission from "./permissions.model";

class PermissionService {
  addPermission(name: string) {
    const newPermission = Permission.create({ name });
    return newPermission.save();
  }
  getPermissionsByIds(ids: number[]) {
    return Permission.findByIds(ids);
  }
  async changePermissionName(id: number, newName: string) {
    const permission = await Permission.findOne(id);
    permission.name = newName;
    return permission.save();
  }

  static seedPermissions() {
    return getConnection()
      .createQueryBuilder()
      .insert()
      .into(Permission)
      .values(
        Object.keys(EPermission).map((perm: EPermission) => ({ name: perm }))
      )
      .execute();
  }
  static clearAllPermissions() {
    return getConnection()
      .createQueryBuilder()
      .delete()
      .from(Permission)
      .execute();
  }
}
export default PermissionService;
