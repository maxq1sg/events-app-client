import { Request, Response } from "express";
import PermissionService from "./permissions.service";

class PermissionController {
  private permService: PermissionService;
  constructor() {
    this.permService = new PermissionService();
  }

  addNewPermission = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const newPermission = await this.permService.addPermission(name);
      res.status(200).json(newPermission);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
}
export default new PermissionController();
