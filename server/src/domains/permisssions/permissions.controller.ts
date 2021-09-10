import { Request, Response } from "express";
import Route from "../../middleware/RouteDecorator";
import PermissionService from "./permissions.service";

class PermissionController {
  private permService: PermissionService;
  constructor() {
    this.permService = new PermissionService();
  }
  
  @Route()
  async addNewPermission(req: Request, res: Response) {
    const { name } = req.body;
    const newPermission = await this.permService.addPermission(name);
    return newPermission;
  }

  changePermissionName = async (req: Request, res: Response) => {
    // const {}
    // const modifiedPermission = await this.permService.changePermissionName()
  };

  @Route()
  async seedPermissions(req: Request, res: Response) {
    const { identifiers } = await PermissionService.seedPermissions();
    return identifiers;
  }
}
export default new PermissionController();
