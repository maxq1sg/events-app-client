import { Router } from "express";
import { Service } from "typedi";
import Route from "../../middleware/RouteDecorator";
import { RequestPayload } from "../../middleware/types/MetaType";
import initCategoryRouter from "./category.router";
import CategoryService from "./category.service";

@Service()
class CategoryController {
  public router: Router;

  constructor(private readonly categoryService: CategoryService) {
    this.router = Router();
    initCategoryRouter.call(this, this.router);
  }

  @Route(["body"])
  async addNewCategory(payload: RequestPayload) {
    const { name } = payload.body;
    const newCategory = await this.categoryService.addNewCategory(name);
    return newCategory;
  }

  @Route([])
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }
  @Route([])
  async seedCategories() {
    return CategoryService.seedCategories();
  }
  @Route(["params"])
  async getEventsPerCategory(payload: RequestPayload) {
    const { id } = payload.params;
    return this.categoryService.getEventsPerCategory(+id);
  }
}
export default CategoryController;
