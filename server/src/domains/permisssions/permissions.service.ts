import Permission from "./permissions.model";

class PermissionService {
  addPermission(name: string) {
    const newPermission = Permission.create({ name });
    return newPermission.save();
  }
  getPermissionsByIds(ids:number[]){
    return Permission.findByIds(ids)
  }
  async changePermissionName(id:number,newName:string){
    const permission = await Permission.findOne(id)
    permission.name=newName
    return permission.save()
  }
}
export default PermissionService;
