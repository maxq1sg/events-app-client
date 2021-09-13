import { Router } from "express";
import { Service } from "typedi";
import Route from "../../middleware/RouteDecorator";
import { RequestPayload } from "../../middleware/types/MetaType";
import initFileRouter from "./file.router";
import FileService from "./file.service";

@Service()
class FileController {
  public router: Router;

  constructor(private readonly fileService: FileService) {
    this.router = Router();
    initFileRouter.call(this, this.router);
  }
  @Route(["body", "file"])
  async addNewFileToStorage(payload: RequestPayload) {
    const data = await this.fileService.addNewFileToStorage(
      payload.file
    );
    return data;
  }
}
export default FileController;
