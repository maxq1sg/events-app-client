import { Request, Response } from "express";
import PermissionService from "./permissions.service";

class PermissionController {
  private permService: PermissionService;
  constructor() {
    this.permService = new PermissionService();
  }

  addNewPermission = async (req: Request, res: Response) => {
      const { name } = req.body;
      const newPermission = await this.permService.addPermission(name);
      res.status(200).json(newPermission);
  };
  changePermissionName= async (req: Request, res: Response) => {
    // const {}
    // const modifiedPermission = await this.permService.changePermissionName()
  }
  seedPermissions= async (req: Request, res: Response) => {
    const {identifiers}=await PermissionService.seedPermissions()
    res.json(identifiers)
  }
}
export default new PermissionController();
