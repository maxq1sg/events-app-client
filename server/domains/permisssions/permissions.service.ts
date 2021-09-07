import Permission from "./permissions.model";

class PermissionService {
  addPermission(name: string) {
    const newPermission = Permission.create({ name });
    return newPermission.save();
  }
  getPermissionsByIds(ids:number[]){
    return Permission.findByIds(ids)
  }
}
export default PermissionService;
