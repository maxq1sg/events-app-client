import { Router } from "express";
import { Service } from "typedi";
import Route from "../../middleware/RouteDecorator";
import { RequestPayload } from "../../middleware/types/MetaType";
import initPermissionsRouter from "./permissions.router";
import PermissionService from "./permissions.service";

@Service()
class PermissionController {
  public router: Router;

  constructor(private readonly permService: PermissionService) {
    this.router = Router();
    initPermissionsRouter.call(this, this.router);
  }

  @Route(["body"])
  async addNewPermission(payload: RequestPayload) {
    const { name } = payload.body;
    const newPermission = await this.permService.addPermission(name);
    return newPermission;
  }

  @Route(["body"])
  async changePermissionName(payload: RequestPayload) {
    const {} = payload.body
    // const modifiedPermission = await this.permService.changePermissionName()
  }

  @Route([])
  async seedPermissions() {
    const { identifiers } = await PermissionService.seedPermissions();
    return identifiers;
  }
}
export default PermissionController;
